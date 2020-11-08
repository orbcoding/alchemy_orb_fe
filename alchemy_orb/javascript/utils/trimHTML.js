export function trimHTML(string) {
	return string
	.replace(/<[^>]*>?/gm, '')
	.replace(/&nbsp;/g, ' ')
}
