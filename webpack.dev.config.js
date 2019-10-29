const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var config={
	entry:{
		index:'./src/index.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: '../dist',
		host:"0.0.0.0",   //填写你自己的IP地址
		port: 8080,
		hot: true,
		inline: true,
		disableHostCheck:true,
		openPage:'/',
		progress:true,
		 // proxy:{
			// "/": {
			// 	target: "http://192.168.2.115:8002/",
			// 	changeOrigin:true,
			// }
		 // }
    },
	mode:'development',
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:[
					{loader:'babel-loader'}
				]
			},
		]
	},
	plugins:[
		new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title:`index`,
			template:`./src/index.html`,
			filename:`index.html`,
			chunks:['index']
		}),
	],
	output:{
		filename:'index.js',
		path:path.join(__dirname,'dist'),
		publicPath:'/'
	},
}
module.exports = config;
