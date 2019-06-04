const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const path = require('path')
const WebpackPwaManifest = require('webpack-pwa-manifest')

const PUBLIC_PATH = process.env.PUBLIC_URL

module.exports = env = {
	entry: './src/index.tsx',

	output: {
		publicPath: PUBLIC_PATH,
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: __dirname + '/dist',
	},

	// Enable sourcemaps for debugging webpack's output.

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.ts', '.tsx', '.js', '.json'],
		alias: {
			modules: __dirname + '/node_modules',
			components: __dirname + '/src/components',
			src: __dirname + '/src',
		},
	},
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
			},

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},

			{
				test: /\.svg/,
				use: 'raw-loader',
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'url-loader?name=public/images/[name].[ext]',
			},
			// "file" loader makes sure assets end up in the `build` folder.
			// When you `import` an asset, you get its filename.
			{
				test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: './font/[hash].[ext]',
							mimetype: 'application/font-woff',
						},
					},
				],
			},
			{
				test: /\.(c|d|t)sv$/, // load all .csv, .dsv, .tsv files with dsv-loader
				use: ['dsv-loader'], // or dsv-loader?delimiter=,
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new Dotenv(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new HtmlWebpackPlugin({
			appMountId: 'root',
			title: 'MyApp Title',
			template: './public/index.html',
		}),
		new SWPrecacheWebpackPlugin({
			cacheId: 'MyAppCache',
			dontCacheBustUrlsMatching: /\.\w{8}\./,
			filename: 'service-worker.js',
			minify: true,
			navigateFallback: PUBLIC_PATH + 'index.html',
			staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/],
		}),
		new FaviconsWebpackPlugin({
			logo: `./public/assets/images/app_icon.png`,
			prefix: 'icons-[hash]/',
			persistentCache: true,
			inject: true,
			icons: {
				favicons: true,
				android: true,
				appleIcon: true,
				appleStartup: false,
				coast: false,
				firefox: false,
				opengraph: false,
				twitter: false,
				yandex: false,
				windows: false,
			},
		}),
		new WebpackPwaManifest({
			name: 'MyApp',
			short_name: 'MyApp',
			description: 'MyApp',
			background_color: '#000000',
			theme_color: '#000000',
			start_url: '/',
			icons: [
				{
					src: path.resolve(`./public/assets/images/app_icon.png`),
					sizes: [96, 128, 192, 256, 384, 512],
					destination: path.join('assets', 'icons'),
				},
			],
		}),
	],
}
