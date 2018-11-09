
const path = require('path')
// 启用热更新的第二部
const webpack = require('webpack')
//导入在内存中生成 HTML 页面的 插件
// 只要是插件，都一定要放到plugins节点中
/**
 * html-webpack-plugin的作用：
 * 1. 自动根据指定路径生成一个内存的页面
 * 2. 自动，把打包好的bundle.js追加到页面中
 */
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//这个配置文件就是一个JS文件，通过Node中的模块操作，向外暴露一个配置对象
module.exports = {
    //手动指定 入口 出口
    entry:path.join(__dirname, './src/main.js'),  //入口，表示 要使用webpack 打包哪一个文件
    output:{  // 输出文件
        path:path.join(__dirname, './dist'),  // 指定打包好的文件，输出到那个目录中
        filename: 'bundle.js' //这是指定输出的文件名称

    },
    //mode:'development', //设置mode
    // devServer:{
    //     //这是配置 dev-server 命令参数的第二种方式，相对来说，这种方式麻烦一点
    //     // 
    //     open:true, // 自动打开浏览器
    //     port:300, // 设置启动时的运行端口
    //     contentBase:'src', //指定托管的根目录
    //     hot:true, // 启动热更新 的第一步
    //     mode:'development' 
    // },
    plugins:[
        //配置插件的节点
        //new webpack.HotModuleReplacementPlugin() // new 一个热更新的模块对象，这是启用热更新的第三步
        new htmlWebpackPlugin({
            //创建一个在内存中生成html页面的插件
            //指定模板页面，将来会根据指定的页面路径，生成内存中的 页面
            template:path.join(__dirname, './src/index.html'),
            filename:'index.html', // 指定生成的页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module:{
        //这个节点用于配置所有第三方模块加载器
        rules:[ //所有第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader','css-loader'] }, //配置处理.css文件的第三方loader
            { test: /\.less$/, use: ['style-loader','css-loader','less-loader']}, //因为less文件也是样式需要先调用样式处理loader
            { test: /\.scss$/, use:['style-loader','css-loader','sass-loader']},
            { test: /\.(jpg|png|gif|jpeg)$/, use:'url-loader?limit=84592&name=[hash:8]-[name].[ext]'},
            //limit给定的值是图片的大小，单位：byte,若我们引用的图片>=limit值，则不会转为base64格式的字符串，
            //若图片的大小<limit的值，则会被转为base64的字符串
            //name=[name].[ext] 设置了该参数不会修改文件的名字和类型
            //[hash:8]-[name].[ext] 取前8位的哈希值-文件名.文件类型

            { test: /\.(ttf|eot|woff|woff2|svg)$/, use:'url-loader'}, //处理字体文件的loader配置项
            { test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            { test:/\.vue$/, use: 'vue-loader' }, //处理.vue的loader
            { test: /vue-preview.src.*?js$/, loader: 'babel' } //插件编写中使用了es6的语法，需要进行代码编译
            
        ]
    },
    resolve:{
        alias:{ //设置vue被导入包的路径
            "vue$":"vue/dist/vue.js"
        }
    }
}


// 在控制台 执行webpack命令时，webpack做了哪些任务
// 1. webpack 发现没有指定入口和出口
// 2. webpack 就会去项目的根目录中找webpack.config.js配置文件
// 3. 解析执行这个配置文件，解析执行完成，就得到了配置文件中的导出对象
// 4. 当webpack拿到配置对象后，根据指定的入口、出口，进行打包构建