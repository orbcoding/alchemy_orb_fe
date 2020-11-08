import { whenMutated } from "./whenMutated";

/**
 * wait until an object property or element (selector) exists
 * @examples

 whenExists({selector: '#myElementID'}).then(el => {console.log('el found')};)

 whenExists({obj: myObj, prop: objProp}).then(prop => {console.log('prop found')};)

 */
export function whenExists({ obj, prop, selector, timeout = 2000, interval = 100 }, callback) {
	let timer = 0

	// First check
	checkExistance()
	// Then check in interval until timeout
	const checkInterval = setInterval(checkExistance, interval);

	function checkExistance() {
		const el = selector ? document.querySelector(selector) : null;
		if (el || (obj && obj[prop])) {
			clearInterval(checkInterval)
			callback({el, value: obj ? obj[prop] : null})
			AlchemyOrb.log('found after', timer)
		} else if (timer >= timeout) {
			clearInterval(checkInterval)
			console.warn('timout')
		}

		timer += interval
	}
}
