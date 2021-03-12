const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.@(ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'storybook-css-modules-preset',
	],
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.css$/,
			use: [
				{
					loader: 'postcss-loader',
					options: {
						ident: 'postcss',
						plugins: [require('tailwindcss'), require('autoprefixer')],
					},
				},
			],
			include: path.resolve(__dirname, '../src'),
		});

		return config;
	},
};
