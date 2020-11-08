function preventKeys(e, el) {
	const disabled = el.dataset.disableKeys || [];

	// https://www.tiny.cloud/docs/advanced/keyboard-shortcuts/
	if (e.ctrlKey && (
		(e.keyCode == 66 && disabled.includes('bold')) ||
		(e.keyCode == 73 && disabled.includes('italic')) ||
		(e.keyCode == 85 && disabled.includes('underline')) ||
		(e.keyCode == 75 && disabled.includes('alchemy_link'))
	) ||
		(e.keyCode == 13 && disabled.includes('enter'))
	 ||
		(e.shiftKey && e.altKey && (
			e.keyCode == 49 || // h1 Alt+Shift+1
			e.keyCode == 50 || //
			e.keyCode == 51 || //
			e.keyCode == 52 || //
			e.keyCode == 53 || //
			e.keyCode == 54 || // h6
			e.keyCode == 55 || // p
			e.keyCode == 56 || // div
			e.keyCode == 57 // address
		))
		||
		(e.ctrlKey && e.shiftKey && (
			e.keyCode == 70 && disabled.includes('fullscreen')
		))
	)
	{
		AlchemyOrb.log('prevented key ' + e.keyCode)

		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
	}
}

AlchemyOrb.contentEditorsLoaded(({editors}) => {
	editors.forEach(editor => {
		const richtexts = editor.querySelectorAll('.essence_richtext')

		richtexts.forEach(el => {
			if (!AlchemyOrb.tinymceLoaded(el, tinymceEl => {
				tinymceEl.addEventListener('keydown', e => {
					preventKeys(e, el)
				})
			})) {
				const input = el.querySelector('input,textarea');
				input.addEventListener('keydown', e => {
					preventKeys(e, el)
				})
			}
		})
	})
})


