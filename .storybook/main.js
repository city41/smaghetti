const path = require('path');

module.exports = {
	stories: ['../src/**/__stories__/*.stories.@(ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
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
			include: path.resolve(__dirname, '../'),
		});
		return config;
	},
};
