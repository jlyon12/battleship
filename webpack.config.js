const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: path.resolve(__dirname, 'src/index.js'),
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		open: {
			app: {
				name: 'Firefox Developer Edition',
			},
		},
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.(css|scss)$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(?:js|mjs|cjs|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,

				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,

				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'PROJECT TITLE',
			filename: 'index.html',
			template: './src/template.html',
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			'node_modules',
			'bower_components',
			'shared',
			'/shared/vendor/modules',
		],
	},
};
