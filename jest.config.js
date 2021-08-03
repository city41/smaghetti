module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__jestMocks__/fileMock.js',
		'\\.(css|less)$': 'identity-obj-proxy',
	},
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.jest.json',
		},
	},
};
