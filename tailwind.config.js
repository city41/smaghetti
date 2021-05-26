module.exports = {
	purge: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			cursor: {
				crosshair: 'crosshair',
			},
		},
	},
	variants: {
		extend: {
			display: ['group-hover'],
			borderWidth: ['last'],
		},
	},
	plugins: [],
};
