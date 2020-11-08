AlchemyOrb.contentEditorsLoaded(({editors, onlyListeners}) => {
	editors.forEach(editor => {
		const els = editor.querySelectorAll('[data-max-length],[data-min-length]')

		els.forEach(el => {
			const input = el.querySelector('input,textarea');
			const label = el.querySelector('label');

			// Need split in case added twice when "onlyListeners" reapply
			const defaultLabelHTML = label.innerHTML.split(', &nbsp;&nbsp;')[0]
			const maxLength = el.dataset.maxLength
			const minLength = el.dataset.minLength

			// Link length to label counter
			const links = AlchemyOrb.actionProps({
				length: {
					default: AlchemyOrb.trimHTML(input.value).length,
					callback: ({newVal}) => {
						let newHTML = `${defaultLabelHTML}, &nbsp;&nbsp; ${newVal}`
						// newHTML += `${newVal}`
						if (maxLength != undefined) {
							newHTML += ` of ${maxLength}`
						}
						if (minLength != undefined) {
							newHTML += `, min ${minLength}`
						}
						label.innerHTML = `${newHTML} chars`
				}}
			})

			if (!AlchemyOrb.tinymceLoaded(el, tinymceEl => {	// if loaded
				tinymceEl.addEventListener('input', e => {
					links.length = AlchemyOrb.trimHTML(e.target.innerHTML).length
				})
			})) { // else
				input.addEventListener('input', e => {
					links.length = AlchemyOrb.trimHTML(e.target.value).length
				})
			}
		})
	})
})
