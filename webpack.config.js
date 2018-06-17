const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        index: "./src/app/controllers/index.ts",
        admin: "./src/app/controllers/admin.ts",
        user: "./src/app/controllers/user.ts",
        khoahoc: "./src/app/controllers/khoahoc.ts"
    },
    output: {
        filename: "js/[name]-[hash].js",
        path: path.resolve(__dirname, "./dist")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],

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
                test: /\.(png|svg|jpg|jpeg|gif|mp4)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: '[name]-[sha512:hash:base64:7].[ext]',
                        outputPath: "./images/",
                        // limit: 2000000,
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: '[name]-[sha512:hash:base64:7].[ext]',
                        outputPath: "./fonts/",
                        // limit: 2000000,
                    }
                }]
            }
            // {
            //     test: 'exports-loader?file!./ckeditor',
            //     loader: 'exports?this.CKEDITOR'
            //  }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/app/views/pages/index.html',
            title: 'Project Quản Lý Trung Tâm - Cybersoft',
            favicon: './src/assets/images/logo.png',
            chunks: ['index'],
            minify: {
                collapseWhitespace: false //bo khoang trong
            },
            hash: false, //thay doi nhung duong link trong file index 
        }),
        new HtmlWebpackPlugin({
            filename: 'admin.html',
            template: './src/app/views/pages/admin.html',
            title: 'Admin - Cybersoft',
            favicon: './src/assets/images/logo.png',
            chunks: ['admin'],
            minify: {
                collapseWhitespace: false //bo khoang trong
            },
            hash: false, //thay doi nhung duong link trong file index 
        }),
        new HtmlWebpackPlugin({
            filename: 'user.html',
            template: './src/app/views/pages/user.html',
            title: 'User - Cybersoft',
            favicon: './src/assets/images/logo.png',
            chunks: ['user'],
            minify: {
                collapseWhitespace: false //bo khoang trong
            },
            hash: false, //thay doi nhung duong link trong file index 
        }),
        new HtmlWebpackPlugin({
            filename: 'khoahoc.html',
            template: './src/app/views/pages/khoahoc.html',
            title: 'Khoá Học - Cybersoft',
            favicon: './src/assets/images/logo.png',
            chunks: ['khoahoc'],
            minify: {
                collapseWhitespace: false //bo khoang trong
            },
            hash: false, //thay doi nhung duong link trong file index 
        }),
        new ExtractTextPlugin("[name].css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            CKEDITOR: 'ckeditor',
            'window.CKEDITOR': 'ckeditor'
        })
    ]
};