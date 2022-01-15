module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-empty-function': [
			'error',
			{ allow: ['arrowFunctions'] },
		],
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'react/prop-types': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'no-console': ['error', { allow: ['warn', 'error'] }],
	},
};
