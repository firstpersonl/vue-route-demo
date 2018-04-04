var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports ={
    entry:{
        app:path.resolve(__dirname,'./src/main.js'),
        //将一些第三方的js单独打包在vendors.js
        vendors:['jquery']
    },
    plugins: [
        // //压缩代码
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: false,
        //     mangle: false
        // }),
        // //把入口文件vendors数组指定的第三方包打包成verdors.js
        // new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js'),
        //用于生成html文件，可定义多个
        new HtmlWebpackPlugin({
            title:"客栈帮商户后台",
            filename:'dist/index.html',
            template:'index.html'      //Load a custom template 可以套用你自定义的模版
        }),
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify('production')
            }
        })
    ],
    output:{
        path: path.resolve(__dirname,'./dist'),  //指定打包到dist文件
        filename: 'bundle.js'
    }

}
