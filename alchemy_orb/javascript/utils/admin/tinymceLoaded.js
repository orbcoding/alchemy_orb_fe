// El is .content_editor > .tinymce_container
export function tinymceLoaded(editor, cb) {
	const container = editor.querySelector('.tinymce_container')

	if (container) {
		AlchemyOrb.whenMutated({
			el: container,
			observe: {childList: true},
			withChild: 'iframe',
			disconnect: true,
		}, ({child}) => {
			const tinymce = child.contentWindow.document.querySelector('#tinymce')
			cb(tinymce)
		})

		return true
	}

	return false
}
