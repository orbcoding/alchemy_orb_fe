// Used eg. in link.js
export function set(obj, prop, value) {
	const propSplit = prop.split('.');
	let setObj = obj
	propSplit.forEach((p, index) => {
		if (index == propSplit.length - 1) {
			setObj[p] = value
		} else {
			setObj = setObj[p]
		}
	})
}
