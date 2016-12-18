/* eslint-disable */
const webpack = require('webpack');
const RemoveWebpackPlugin = require('remove-webpack-plugin');
const autoprefixer = require('autoprefixer');
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
        'index': "./src/index.jsx"
    },

	output: {
        path: './build',
        filename: "[name].js"
	},

	plugins: [
		new RemoveWebpackPlugin('./build', 'hide'),
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
			  test: /\.jsx$/, loader: "babel-loader", exclude: [/node_modules/, /lib/]
		  },
		  {
			  test: /\.js$/, loader: "babel-loader", exclude: [/node_modules/, /lib/]
		  },
		  {
			  test: /\.css$/,
			  loader: postCssLoader.join('')
		  }, {
			  test: /\.png$/,
			  loader: "file-loader?name=/images/[hash].[ext]"
		  }, {
			  test: /\.jpg$/,
			  loader: "file-loader?name=/images/[hash].[ext]"
		  }, {
			  test: /\.gif$/,
			  loader: "file-loader?name=/images/[hash].[ext]"
		  }, {
			  test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
			  loader: 'file-loader?name=/fonts/[hash].[ext]'
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
			precss()
		];
	}
};
