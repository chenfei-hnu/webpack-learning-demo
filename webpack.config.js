var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 打包html的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin"); // 打包css的插件
var CleanWebpackPlugin = require('clean-webpack-plugin');
var SpritesmithPlugin = require('webpack-spritesmith');

var pages = [{
		name: 'js/module1',
		htmlname: 'module1'
	},
	{
		name: 'js/module2',
		htmlname: 'module2'
	},
	{
		name: 'js/module3',
		htmlname: 'module3'
	}
];
var plugins = [
	new webpack.BannerPlugin('版权所有，翻版必究'),
	// 引入的文件中首行加注释
	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery"
	}),
	new webpack.NamedModulesPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new SpritesmithPlugin({
		//目标小图标
		src: {
			cwd: path.resolve(__dirname, './img/icon'),
			glob: '*.png'
		},
		// 输出雪碧图文件及样式文件
		target: {
			image: path.resolve(__dirname, 'dist/img/sprites.png'),
			css: path.resolve(__dirname, 'dist/css/_sprites.css')
		},
		// css根据该指引找到sprite图
		apiOptions: {
			cssImageRef: '../img/sprites.png'
		},
		spritesmithOptions: {
			algorithm: 'top-down'
		}
	}),
	new CleanWebpackPlugin(['dist/*'], {
		root: __dirname,
		verbose: true,
		dry: false
	}),
	//npm install clean-webpack-plugin --save-dev
	new ExtractTextPlugin({
		// npm install extract-text-webpack-plugin --save-dev
		// npm install extract-text-webpack-plugin@next
		// 每个入口相关的css文件都分入口单独合并成一个css,不支持多入口合的所有css合并成一个
		filename: (getPath) => {
			return getPath('[name].[chunkhash:8].css')
		}
	})
];
for (var i = 0; i < pages.length; i++) {
	plugins.push(new HtmlWebpackPlugin({
		// npm i --save-dev html-webpack-plugin
		// 通过 html-webpack-plugin 为我们生成的html，并自动添加js引用
		chunks: [pages[i].name],
		inject: 'body', // true | 'head' | 'body' | false
		favicon: 'img/ico.png', // 指定页面图标
		hash: true, // 是否生成hash添加在引入文件地址的末尾
		showErrors: true, // 是否将编译出现错误的信息写在页面里，默认true，出现错误信息则会包裹在一个pre标签内添加到页面上
		//cache:true,// 是否需要缓存，如果填写true，则文件只有在改变时才会重新生成
		title: pages[i].htmlname, // <%= htmlWebpackPlugin.options.title%>
		minify: { // 文件压缩配置
			caseSensitive: false, // 是否大小写敏感
			removeComments: true, // 去除注释
			removeEmptyAttributes: true, // 去除空属性
			collapseWhitespace: true // 是否去除空格
		},
		filename: pages[i].htmlname + '.html',
		template: pages[i].htmlname + '.html',
	}));
}
module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: {
		// module1: __dirname + "/src/module1.js",

		// 支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
		// module2: __dirname + "/src/module2.js",
		'js/module1': __dirname + "/js/module1/module1.js",
		'js/module2': __dirname + "/js/module2.js",
		'js/module3': __dirname + "/js/module3.js"
	},
	/* entry : __dirname + "/src/index.js",//已多次提及的唯一入口文件 */
	output: {
		path: __dirname + "/dist", // 打包后的文件存放的地方
		//publicPath: "./",//网站运行时的访问路径
		filename: "[name].[hash:8].js" // 打包后输出文件的文件名
		// [hash]。hash值是特定于整个构建过程的。
		// [chunkhash]。hash值是特定于每一个文件的内容的。
	},
	plugins: plugins,
	devServer: { // npm install --save-dev webpack-dev-server
		contentBase: __dirname + '/dist', // 本地服务器所加载的页面所在的目录
		//inline: true,// 实时刷新 整个入口页面刷新
		//compress:true,
		hot: true,
		//historyApiFallback: true //不跳转
		//hot:true// 实时刷新 重新加载组件改变的部分
		/*--quiet 控制台中不输出打包的信息
		--compress 开启gzip压缩
		--progress 显示打包的进度*/
	},
	module: {
		// 加载器配置
		rules: [
			// npm install --save-dev babel-core babel-loader
			// npm i babel-preset-react react react-dom babel-preset-env--save-dev
			//后编译：指的是应用依赖的 NPM 包并不需要在发布前编译，而是随着应用编译打包的时候一块编译。
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"env", "react"
						]
					}
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				// npm install --save-dev style-loader css-loader
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader!postcss-loader"
				})
			}
			/*,
			{  
				test: /\.(png|jpeg$)/,  
				use: [  
					{  
						loader: 'url-loader', 
						// npm install --save-dev url-loader
						// npm install file-loader --save-dev
						options: {  
							name:'img/[hash:8].[name].[ext]',
							publicPath:'../',
							limit: '1024'  
						}  
					} 
				]  
			}*/
		]
	}
}