/* eslint-disable */
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const functions = require('postcss-functions');
const precss = require('precss');
const atImport = require("postcss-import");
const easyImport = require('postcss-easy-import');
const postCssModules = require('postcss-modules');

const postCssLoader = [
	'css-loader?modules',
	'&importLoaders=1',
	'&localIdentName=[name]__[local]___[hash:base64:5]',
	'&disableStructuralMinification',
	'!postcss-loader'
];

module.exports = {
    entry: {
        'index': "./src/index.js",
		'default': "./src/default.js",
		'custom': "./src/custom.js"
    },

	output: {
        path: './build',
        filename: "[name].js"
	},

	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false,
	        drop_console: true,
	        unsafe: true
	      }
	    })
	],

	resolve: {
		moduleDirectories: ['node_modules'],
		extensions: ['', '.js', '.jsx']
	},

	resolveLoader: {
		moduleDirectories: ['node_modules'],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js', '.jsx']
	},

	module: {
	  loaders: [
		  {
			  test: /\.jsx$/, loader: "react-hot-loader!babel-loader", exclude: [/node_modules/, /lib/]
		  },
		  {
			  test: /\.js$/, loader: "react-hot-loader!babel-loader", exclude: [/node_modules/, /lib/]
		  },
		  {
			  test: /\.css$/,
			  loader: postCssLoader.join('')
		  }
	  ]
	},
	postcss: function() {
		return [
			atImport({
				plugins: [easyImport],
			}),
			postCssModules({
				scopeBehaviour: 'global',
				generateScopedName: '[name]__[local]___[hash:base64:5]',
			}),
			autoprefixer,
			precss({
				variables: {
					variables: require('./src/styles/vars.css')
				}
			}),
			functions({
				functions: require('./src/styles/funcs.css')
			})
		];
	}
};
