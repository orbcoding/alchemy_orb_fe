export function replaceEl({ el, selector, html }) {
	if (selector) el = document.querySelector(selector);
	el.insertAdjacentHTML("afterend", html);
	el.remove();
}
