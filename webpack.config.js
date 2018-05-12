const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/app/controllers/index.ts",
        admin: "./src/app/controllers/admin.ts",
        user: "./src/app/controllers/user.ts"
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "./dist")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        open: true,
        port: 9000
    },
    mode: 'development',
    module: {
        rules: [{
                loader: "ts-loader",
                test: /\.tsx?$/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        name: "[name].[ext]",
                        attrs: ['img:src', 'source:src']
                    }
                    // exclude : path.resolve(__dirname, "./src/app/views/pages/index.html")
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|jpeg|gif|mp4)$/,
                use: [
                    "file-loader?name=[hash:6].[ext]&outputPath=images/",
                ]
            }
        ]
    },
    plugins: [
        // new HtmlWebpackExtract({
        //     minify: {
        //         collapseWhitespace: false //bo khoang trong
        //     },
        //     hash: true, //thay doi nhung duong link trong file index 
        //     // excludeChunks : ["admin"],
        //     template: "./src/app/views/pages/index.html"
        // }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/app/views/pages/index.html',
            chunks: ['index'],
            minify: {
                collapseWhitespace: false //bo khoang trong
            },
            hash: true, //thay doi nhung duong link trong file index 
        }),
        new HtmlWebpackPlugin({
            filename: 'admin.html',
            template: './src/app/views/pages/admin.html',
            chunks: ['admin'],
            minify: {
                collapseWhitespace: false //bo khoang trong
            },
            hash: true, //thay doi nhung duong link trong file index 
        }),
        new HtmlWebpackPlugin({
            filename: 'user.html',
            template: './src/app/views/pages/user.html',
            chunks: ['user'],
            minify: {
                collapseWhitespace: false //bo khoang trong
            },
            hash: true, //thay doi nhung duong link trong file index 
        }),
        new ExtractTextPlugin("[name].css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};