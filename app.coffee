browserify = require 'roots-browserify'
css_pipeline = require 'css-pipeline'
config = require 'roots-config'

module.exports =
	ignores: ['*.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']
	extensions: [
		browserify(files: 'assets/js/main.js', out: 'js/build.js', sourceMap: true),
		css_pipeline(files: 'assets/css/main.css', out: 'css/build.css'),
		config()
	]
	server:
		clean_urls: true
	postcss:
		use: []
		map: true
	jade:
		pretty: true