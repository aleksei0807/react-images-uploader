/* eslint-disable */
const PORT = process.env.PORT || '8181';
console.log("Listening on", PORT);
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const atImport = require("postcss-import");
const easyImport = require('postcss-easy-import');
const postCssModules = require('postcss-modules');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postCssLoader = [
	'style-loader',
	'!css-loader',
	'!postcss-loader'
];

module.exports = {
	devtool: 'cheap-eval-source-map',
	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:' + PORT,
		'webpack/hot/only-dev-server',
		'./index.jsx'
	],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: '/js/index.js'
	},

	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
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
			  test: /\.jsx$/, loader: "react-hot-loader/webpack!babel-loader", exclude: [/node_modules/, /lib/]
		  },
		  {
			  test: /\.js$/, loader: "react-hot-loader/webpack!babel-loader", exclude: [/node_modules/, /lib/]
		  },
		  {
			  test: /\.html$/,
			  loader: 'raw-loader'
		  },
		  {
			  test: /\.css$/,
			  loader: postCssLoader.join(''),
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
			autoprefixer,
			precss()
		];
	},
	devServer: {
		contentBase: './dist',
		hot: true,
		host: '0.0.0.0',
		port: PORT
	}
};
