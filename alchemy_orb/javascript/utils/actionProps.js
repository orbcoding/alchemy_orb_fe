import { set } from './set';

export function actionProps(inputProps
	// reactiveProp: {
	// 	selector, 			// selector
	// 	selectors, 			// selectors
	// 	el, 						// el
	// 	els, 						// els
	// 	attribute,			// eg. style.minHeight (accepts dot notation)
	// 	data 						// sets data attributes
	//  default 				// default value which triggers reactiveProp
	// 	localStorage, 	// connect to localstorage prop
	// 	toggleClass, 		// toggles class on truthy
	// 	callback 				// ({obj, el, newVal}) => {} run on value update
	//  callbackBefore  // callback before other handlers are set
	// }
) {
	const actionProps = {}

	Object.keys(inputProps).forEach(prop => {
		const valueKey = `${prop}__value`;
		const props = inputProps[prop];

		// Get init value
		const initValue = props.localStorage ?
			JSON.parse(window.localStorage.getItem(props.localStorage)) :
			props.default

		Object.defineProperty(actionProps, prop, {
			// Getter
			get: function() {
				return actionProps[valueKey];
			},

			// Setter
			set: function(newVal) {
				this[valueKey] = newVal

				// Localstorage
				if (props.localStorage) {
					if (newVal) {
						window.localStorage.setItem(props.localStorage, JSON.stringify(newVal));
					} else {
						window.localStorage.removeItem(props.localStorage);
					}
				}

				// Get element
				const els = []
				if (props.selector) els.push(document.querySelector(props.selector))
				if (props.selectors) els.push(...document.querySelectorAll(props.selectors))
				if (props.el) els.push(props.el)
				if (props.els) els.push(props.els)

				if (props.callbackBefore) {
					props.callbackBefore({obj: actionProps, el: props.el, els: props.els, newVal})
				}

				els.forEach(el => {
					if (el) handleEl(el, props, newVal)
				})

				if (props.callback) {
					props.callback({obj: actionProps, el: props.el, els: props.els, newVal})
				}
			},
		});

		// Set init value
		if (initValue != undefined) actionProps[prop] = initValue
	})

	return actionProps;
}

function handleEl(el, props, newVal) {
	// Set el props
	if (props.attribute) {
		set(el, props.attribute, newVal);
	}

	// Set data
	if (props.data) {
		el.setAttribute(`data-${props.data}`, newVal);
	}

	// Toggle el class
	if (props.toggleClass) {
		newVal ?
			el.classList.add(props.toggleClass) :
			el.classList.remove(props.toggleClass)
	}
}
