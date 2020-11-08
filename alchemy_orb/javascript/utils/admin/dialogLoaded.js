import { on } from '../listen';

export function dialogLoaded(selector, callback) {
	dialogOpened(({dialog, observer}) => {
		// When dialog opened
		// Check check if has selector
		AlchemyOrb.whenMutated({
			selector: '.alchemy-dialog-body',
			observe: { childList: true },
			withChild: selector,
			disconnect: true // Disconnect inner dialog observer
		}, ({child}) => {
			AlchemyOrb.log('dialogLoaded ' + selector);
			callback({child, dialog, observer})
		})
	})
}

export function dialogOpened(callback) {
	on('turbolinks:load', {
		offOnReload: true // dialogLoaded will be called again for given page
	},  () => {
		AlchemyOrb.whenMutated({
			selector: 'body',
			observe: { childList: true },
			withChild: '.alchemy-dialog',
			reconnectTimeout: 500, // To avoid multiple triggers
			disconnectOnReload: true
		}, ({child, observer}) => {
			callback({dialog: child, observer})
		})
	})
}

