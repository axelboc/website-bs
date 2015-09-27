browserify = require 'roots-browserify'
css_pipeline = require 'css-pipeline'
config = require 'roots-config'

module.exports =
	ignores: ['*.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

	extensions: [
		browserify(files: 'assets/js/main.js', out: 'js/build.js', minify: true),
		css_pipeline(files: 'assets/css/main.css', out: 'css/build.css', minify: true, hash: true),
		config()
	]

	postcss:
		use: []