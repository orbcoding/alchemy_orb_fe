// Used in admin_pages_edit to hook when contents are loaded
const callbacks = [];

document.addEventListener('turbolinks:load', () => {
	const elArea = document.querySelector('#element_area')

	if (!elArea) return

	AlchemyOrb.whenMutated({
		el: elArea,
		withChild: '#main-content-elements',
		disconnect: true,
		observe: {childList: true}
		}, () => {

		AlchemyOrb.log('loaded content editors');
		callbacks.forEach(cb => cb({ editors: Array.from(document.querySelectorAll('.element-editor')), onlyListeners: false }))

		elArea.querySelectorAll('.ui-sortable').forEach(el => {
			$(el).sortable({
				deactivate: function(e, ui) {
					callbacks.forEach(cb => cb({ editors: [ui.item[0]], onlyListeners: true }))
				}
			})
		});
	})

	// Another jquery event
	$('#element_area').on('FocusElementEditor.Alchemy', '.element-editor', e => {
		AlchemyOrb.log('focusing content editor');
		callbacks.forEach(cb => cb({ editors: [e.target], onlyListeners: false }))
	})
})

export function contentEditorsLoaded(callback) {
	callbacks.push(callback)
}
