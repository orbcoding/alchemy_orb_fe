export function filterObj(obj, filter) {
	const newObj = {}
	obj.keys.forEach(key => {
		if (filter({key, value: obj[value]})) {
			newObj[key] = obj[key]
		}
	})

  return newObj;
}
