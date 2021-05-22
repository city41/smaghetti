export const isMac =
	typeof navigator !== 'undefined' &&
	navigator.platform.toLowerCase().indexOf('mac') > -1;
