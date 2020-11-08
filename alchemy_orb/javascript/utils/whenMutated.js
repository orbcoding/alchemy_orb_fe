import { on } from './listen';

let disconnectOnReloadObs = []

// Disconnect all unique listeners before turbolinks load again
on('turbolinks:visit', {}, () => {
	if (!disconnectOnReloadObs.length) return

	disconnectOnReloadObs.forEach(obs => {
		obs.disconnect();
	});

	AlchemyOrb.log('disconnectedOnReloadObservers', disconnectOnReloadObs.length)

	disconnectOnReloadObs = []
})

export function whenMutated({el, selector, observe, withChild, disconnect, reconnectTimeout, disconnectOnReload}, callback) {
	const defaultObs = {
		// attributes: false,
		// characterData: false,
		// childList: false,
		// subtree: false,
		// attributeOldValue: false,
		// characterDataOldValue: false,
	}

	const element = el || document.querySelector(selector)

	const obs = Object.assign(defaultObs, observe);

	const observer = new MutationObserver(function(mutations) {
		if (withChild) {
			const child = element.querySelector(withChild)

			if (child) {
				disc()
				callback({element, child, observer, mutations})
			}
		} else {
			disc()
			callback({element, mutations, observer});
		}
	});

	connect()

	if (disconnectOnReload) {
		disconnectOnReloadObs.push(observer)
	}

	return observer
	// END


	function connect() {
		observer.observe(element, obs);
	}

	function disc() {
		if (disconnect || reconnectTimeout) observer.disconnect()
		if (reconnectTimeout) {
			setTimeout(() => {
				connect()
			}, reconnectTimeout);
		}
	}
}

