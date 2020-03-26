'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/app.ts',
    output: {
        publicPath: '/',
        filename: isDev ? 'bundle.js' : 'bundle.[hash].js',
        path: path.join(__dirname, 'dist')
    },
    devtool: isDev ? 'inline-source-map' : false,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('src', 'index.html')
        }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: true
        }),
    ]
};
