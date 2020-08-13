const path = require('path')

var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, './static/main.js'),
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	mode: 'development',
	plugins:[ 
        new htmlWebpackPlugin({
            template:path.resolve(__dirname, 'static/index.html'),
            filename:'index.html',
            minify: {
		        removeRedundantAttributes: false
		    } 
        })
    ],
	module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{test:/\.(jpg|png|gif|jpeg)$/,use:'url-loader?limit=43960'}
		]
	}
}