const withPlugins = require('next-compose-plugins');
const withOptimizedClassnames = require('next-optimized-classnames');

module.exports = withPlugins([withOptimizedClassnames], {
	redirects() {
		return [
			{
				source: '/e-coins',
				destination: '/e-coins/popular',
				permanent: true,
			},
			{
				source: '/e-coins/',
				destination: '/e-coins/popular',
				permanent: true,
			},
			{
				source: '/levels2',
				destination: '/levels/all/popular',
				permanent: true,
			},
			{
				source: '/levels2/',
				destination: '/levels/all/popular',
				permanent: true,
			},
			{
				source: '/levels',
				destination: '/levels/all/popular',
				permanent: true,
			},
			{
				source: '/levels/',
				destination: '/levels/all/popular',
				permanent: true,
			},
			{
				source: '/levels/by-tag',
				destination: '/levels/by-tag/popular',
				permanent: true,
			},
			{
				source: '/levels/by-tag/',
				destination: '/levels/by-tag/popular',
				permanent: true,
			},
			{
				source: '/levels/coins',
				destination: '/levels/coins/popular',
				permanent: true,
			},
			{
				source: '/levels/coins/',
				destination: '/levels/coins/popular',
				permanent: true,
			},
			/*  */ {
				source: '/levels/dev-favs',
				destination: '/levels/dev-favs/popular',
				permanent: true,
			},
			{
				source: '/levels/dev-favs/',
				destination: '/levels/dev-favs/popular',
				permanent: true,
			},
			{
				source: '/make',
				destination: '/editor',
				permanent: true,
			},
			{
				source: '/make/:id',
				destination: '/editor/:id',
				permanent: true,
			},
			{
				source: '/make/:id/:slug',
				destination: '/editor/:id/:slug',
				permanent: true,
			},
			{
				source: '/make/',
				destination: '/editor',
				permanent: true,
			},
			{
				source: '/make/:id/',
				destination: '/editor/:id',
				permanent: true,
			},
			{
				source: '/make/:id/:slug/',
				destination: '/editor/:id/:slug',
				permanent: true,
			},
		];
	},
	pageExtensions: ['tsx'],
	trailingSlash: true,
	publicRuntimeConfig: {
		PROJECT_ROOT: __dirname,
		ROOT_DOMAIN: 'smaghetti.com',
	},
	webpack(config, options) {
		const { isServer } = options;
		config.module.rules.push({
			test: /\.(ogg|mp3|wav|mpe?g)$/i,
			exclude: config.exclude,
			use: [
				{
					loader: require.resolve('url-loader'),
					options: {
						limit: config.inlineImageLimit,
						fallback: require.resolve('file-loader'),
						publicPath: `${config.assetPrefix}/_next/static/`,
						outputPath: `${isServer ? '../' : ''}static/`,
						name: '[name]-[hash].[ext]',
						esModule: config.esModule || false,
					},
				},
			],
		});

		return config;
	},
});
