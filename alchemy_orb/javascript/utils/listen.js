const listenerRegistry = [];
let offOnReloadListeners = [];

// off all offOnReloadListeners before turbolinks load again
on('turbolinks:visit', {}, () => {
	if (!offOnReloadListeners.length) return

	offOnReloadListeners.forEach(listener => {off(listener)});

	// AlchemyOrb.log('OffOnReloadListeners', offOnReloadListeners.map(listener => listenerDescription(listener)))
	AlchemyOrb.log('offOnReloadListeners', offOnReloadListeners.length)

	offOnReloadListeners = []
})

// Type eg: click/turbolinks:load
export function on(type, inputOps, // {
		// el = document, 		// Element to listen on
		// selector,					// Specify target for click/change
		// options, 					// Listener options
		// name, 							// Name of listener, if want to off({name}) without supplying listener
		// runOnceFirst				// Use eg with resize if callback should run on load too
		// addOnce, 					// Dont add event twice, use together with name if listener not same variable
		// offOnReload, 			// Off on next turbolinks visit
		// offOnTrigger				// Off when event triggered
	//}
	callback) {

	const listener = Object.assign(inputOps, {
		type,
		callback,
		el: inputOps.el || document,
	})

	handleEventTypes(listener)

	listener.callback = extendCallback(listener)

	if (listener.runOnceFirst) {
		listener.callback(Object.assign(listener, listener.callbackParams()))
	}

	// Dont add new listener if add once and exists
	if (listener.addOnce && listenerIndex(listener) != -1) {
		return false
	}

	if (listener.offOnReload) {
		offOnReloadListeners.push(listener)
	}

	listener.el.addEventListener(listener.type, listener.callback, listener.options)
	listenerRegistry.push(listener)

	return listener;
}

// Can off based on name or listener function
export function off(listener) {
	const i = listenerIndex(listener)

	if (i == -1) return false

	listener.el.removeEventListener(listenerRegistry[i].type, listener.callback)
	listenerRegistry.splice(i, 1)

	return true
}


// Helper functions

function handleEventTypes(listener) {
	const callback = listener.callback;
	const defaultParams = e => ({el: e.target, event: e, listener})

	if (listener.type == 'resize') {
		listener.el = window
		listener.callbackParams = () => ({
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
		})

		listener.callback = e => {
			callback(Object.assign(defaultParams(e), listener.callbackParams()))
		}
	} else if (listener.type == 'click-outside' && listener.selector) {
		listener.type = 'click'
		listener.callback = e => {
			if (!e.target.closest(listener.selector)) {
				callback(defaultParams(e));
			}
		}
	} else if (listener.selector) { // Eg click/change events
		listener.callback = e => {
			if (e.target.matches(listener.selector)) {
				AlchemyOrb.log('event triggered', listenerDescription(listener))
				callback(defaultParams(e))
			}
		}
	} else {
		listener.callback = e => {
			callback(defaultParams(e))
		}
	}
}

function extendCallback(listener) {
	const baseCallback = listener.callback;
	return e => {
		baseCallback(e)
		if (listener.offOnTrigger) {
			off(listener)
		}
	}
}

function listenerIndex({name, callback}) {
	return AlchemyOrb.findIndex(listenerRegistry, l =>
		name ? l.name == name :
			l.callback == callback
	);
}

function listenerDescription(listener) {
	return `${listener.name ? `${listener.name},` : ''}${listener.type}${listener.selector ? `,${listener.selector}` : ''}`
}
