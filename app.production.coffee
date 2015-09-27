i18n = require 'roots-i18n'
browserify = require 'roots-browserify'
css_pipeline = require 'css-pipeline'
config = require 'roots-config'

module.exports =
	ignores: ['*.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf', 'translations/*']

	extensions: [
		i18n(translations: 'translations/*', viewExtensions: 'jade'),
		browserify(files: 'assets/js/main.js', out: 'js/build.js', minify: true),
		css_pipeline(files: 'assets/css/main.css', out: 'css/build.css', minify: true, hash: true),
		config()
	]

	postcss:
		use: [
			require('postcss-import')({ path: 'assets/css' }),
			require('postcss-nested'),
			require('postcss-custom-properties'),
			require('cssnano')({ autoprefixer: ['> 2% in AU'] })
		]