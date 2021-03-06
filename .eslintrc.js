module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
		mocha: true
	},
	extends: 'airbnb-base',
	parserOptions: {
		ecmaVersion: 2015,
		sourceType: 'module'
	},
	parser: 'babel-eslint',
	//  "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
	plugins: [
		'import'
	],
	rules: {
		indent: [
			2,
			'tab',
		],
		'no-tabs': 0,
		'comma-dangle': 0,
		'no-unused-vars': ['off'],
		'no-console': ['off', process.env.NODE_ENV === 'production' ? 2 : 0],
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'linebreak-style': [
			'error',
			'windows'
		],
		quotes: [
			'error',
			'single'
		],
		semi: [
			'error',
			'always'
		],
		camelcase: 'off',
		'prefer-promise-reject-errors': 'off',
	}
};
