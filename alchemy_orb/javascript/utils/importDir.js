// req = require.context('./', true, /(?<!archive.*).js$/); // recursive unless preceeded by 'archive'
export function importDir(req, flatModules = true) {
	const modules = {};

	req.keys().forEach(fileName => {
		if (flatModules) {
			const module = req(fileName);
			Object.keys(module).forEach(key => {
				modules[key] = module[key]
			})
		} else {
			const moduleName = fileName.replace(/(\.\/|\.js)/g, "");
			modules[moduleName] = req(fileName)
		}
	})

	return modules
}
