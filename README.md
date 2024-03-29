

### 示例说明

> 按下面的 准备Webpack的运行环境 中说明的步骤配置好webpack环境后
> 执行 npm run ji 及 npm run server即可预览 localhost:8080/module1/2/3.hmtl

```ruby
module3 文件引用依赖

module4 雪碧图

module5 DOM操作及热替换(修改module5.js后，通过npm run server 开启的页面会自动更新代码并执行)
```

———————————————————————

### 了解Webpack

```ruby
WebPack 是一个模块打包工具，你可以使用WebPack管理你的模块依赖，并编绎输出模块们所需的静态文件

它能够很好地管理、打包Web开发中所用到的HTML、Javascript、CSS以及各种静态文件（图片、字体等），让开发过程更加高效

对于不同类型的资源，webpack有对应的模块加载器

webpack模块打包器会分析模块间的依赖关系，最后 生成了优化且合并后的静态资源
```
前端工程化的问题：`模块化`，`模块依赖`，`静态资源优化`，`模块打包`，`文件摘要处理`等



- 优点

```ruby
1.由配置文件分析项目结构，通过找到JavaScript模块及其引用的模块，进行代码拆分打包，实现按需加载，减少HTTP请求次数

2.通过Loader，任何资源都可以成为Webpack可以处理的模块,将Scss，如TypeScript等浏览器不能直接运行的拓展语言，
打包为合适的格式以供浏览器使用

3.具有强大的Plugin接口，大多是内部插件，使用起来比较灵活，便于拓展，如雪碧图，混淆压缩，热加载等

4.持久化缓存，让用户下载有真正改动的chunk，而不是所有依赖这个新模块的chunk都重新更新（chunk，打包后的单个文件）

5.智能解析 用require加载依赖模块,几乎可以处理任何第三方库

6.使用异步 I/O 和多级缓存提高运行效率，进行快速增量编译

```

- 缺点：

配置过于复杂，官网文档混乱

对比Grunt和Gulp：

```ruby
在配置文件中指明对某些文件进行类似编译，组合，压缩等任务，工具可以自动完成这些任务，但不能处理不同模块之间的依赖。

Webpack的处理速度更快更直接，能打包更多不同类型的文件，上面的有点也是相较于其它打包工具的优势
```

———————————————————————

### 准备Webpack的运行环境

1.安装nodejs 到 [https://nodejs.org/en/download/](https://nodejs.org/en/download/ "https://nodejs.org/en/download/") 下载对应的msi文件，安装后将自动配置好nodejs的环境变量，
到cmd输入`node-v `显示出版本号即可

2.cmd进入项目目录并通过 `npm init` 创建项目，全都回车跳过，最后输入yes创建出package.json文件即可

3.然后安装Webpack  选择本地安装,避免项目中依赖包与全局版本不一致及依赖包不能打包到项目等问题
  -使用`npm config set registry https://registry.npm.taobao.org` 配置国内淘宝镜像，避免安装webpack出错
  -通过`npm install --save-dev webpack` 安装Webpack

4.在webpack.config.js中配置基础的出入口

5.在package.json中加命令"start": "webpack --mode development"，然后在cmd中执行`npm start`打包项目
  -期间会看到提示是否下载webpack cli,以支持自定义执行命令，输入yes即可

6.支持成功后，本地打开index.html即可

———————————————————————

### package.json中的自定义命令

执行某个服务或文件,该文件中不能添加注释

将命令在scripts中简化 `./node_modules/.bin/webpack --config webpack.config.js --mode development`

```ruby
"scripts": {

    "start": "webpack --mode development",
    //以开发模式进行打包，打包出来的文件在dist目录

    "build": "webpack --mode production",
    //以生产模式进行打包

    "server": "webpack-dev-server --inline --open"
    //开启本地服务器
}
```

- 打包默认以webpack.config.js作为配置文件，如需修改在命令中配置--config webpack_other.config.js参数

- development 模式包含浏览器调试相关工具，极快的增量编译，丰富全面的报错信息

- production 模式则包含大量发版优化，如代码压缩混淆，开发相关代码的排除等

- webpack将创建所有应用程序 依赖关系图表。图表的起点被称之为 入口起点。

- 入口起点告诉webpack从哪里开始，并遵循着依赖关系图表将各个模块进行打包

———————————————————————

### devtool映射调试

> devtool选项控制是否生成，以及如何生成 source map

[devtool配置详细说明](https://doc.webpack-china.org/configuration/devtool/#src/components/Sidebar/Sidebar.jsx "devtool配置详细说明")

```ruby
加快编译效率

添加映射以便于调试

仅映射客户端上的堆栈跟踪，而无须暴露所有的源代码

根据官方文档推荐，开发环境使用cheap-eval-source-map 

生产环境nosources-source-map
```

———————————————————————


##### 打开环境用映射后的源文件调试

```ruby
Webpack 使用有 source-map 的打包方式打包

chrome浏览器中访问 chrome://inspect/#devices

打开 Open dedicated DevTools for Node
```

———————————————————————

### devServer 本地服务器 自动刷新 热替换

`npm install --save-dev webpack-dev-server`

- “inline”选项会为入口页面添加“自动刷新”功能

- “hot”选项则开启“热替换（HMR）”，即尝试重新加载组件改变的部分，在运行时更新各种模块，而无需进行完全刷新。

———————————————————————

### 持久缓存

- chunkhash会根据每个chunk的内容区别生成hash（chunk可以理解为每个entry），而hash则是所有打包出来的文件都是一样的，所以一旦你的打包输出有多个文件，你势必需要使用chunkhash，使只有被修改了的文件的文件名hash值变化

- 不要在开发环境使用 [chunkhash]/[hash]/[contenthash]，因为不需要在开发环境做持久缓存，而且这样会增加编译时间，开发环境用 [name] 就可以了。

- 可以 CleanWebpackPlugin 清理输出目录再进行编译

———————————————————————


### 加载器Loader

> 用于对模块的源代码进行转换

Webpack 把每个文件（.css, .html, .scss, .jpg, .etc）都作为模块处理，然而Webpack只了解JavaScript，所有需要加载器来处理其它类型的文件

```ruby
通过Loader，任何资源都可以成为Webpack可以处理的模块,将Scss，如TypeScript等浏览器不能直接运行的拓展语言，打包为合适的格式以供浏览器使用

Babel其实是一个编译JavaScript的平台，它可以编译代码帮你达到以下目的：

让你能使用最新的JavaScript代码（ES6，ES7...），而不用管新标准是否被当前使用的浏览器完全支持；

让你能使用基于JavaScript进行了拓展的语言，比如React的JSX；
```

———————————————————————

### 部分常用插件

> 插件（Plugins）是用来拓展webpack功能,大多数的功能都可以通过这个插件系统运行，来满足各式各样的需求。
> 为了使用插件，需要require它们，并且把它们添加到plugins数组

webpack有很多内置插件，同时也有很多第三方插件

```ruby
UglifyJsPlugin 解析/压缩/美化所有的js chunk

DedupePlugin 打包时遍历依赖树并删除重复的依赖

CommonsChunkPlugin 提取代码中的公共模块

BannerPlugin 版权信息

ProvidePlugin 全局引入外部库

NamedModulesPlugin 热加载时直接返回更新文件名

HotModuleReplacementPlugin 模块热替换插件

```

