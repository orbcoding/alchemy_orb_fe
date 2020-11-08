import { on } from './listen';
import { actionProps } from './actionProps';

export const client = actionProps({
	canHover: {
		el: document.documentElement,
		data: 'alchemy_orb-client-can-hover',
	},
})

on('turbolinks:load', { offOnTrigger: true }, () => {
	client.canHover = !window.matchMedia("(hover: none)").matches
})
