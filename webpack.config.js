"use strict"

const webpack = require('webpack');
const path = require('path');
const WebpackDashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const production = process.env.NODE_ENV === 'production';


const prodPlugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            screw_ie8: true,
            warnings: false,
        }
    })
];


const devPlugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackDashboardPlugin()
];


module.exports = {
    entry: [
        './src/index'
    ],

    devtool: production ? 'source-map' : 'eval',

    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "bundle.js"
    },

    resolve: {
        extensions: ['', '.js', '.scss']
    },

    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.scss$/,
            loader: production ? ExtractTextPlugin.extract("style", "css", "sass") : 'style!css!sass',
            include: path.resolve(__dirname, 'src')
        }]
    },

    plugins: production ? prodPlugins : devPlugins,

    devServer: {
        contentBase: path.resolve(__dirname, "./build"),
        hot: true,
        inline: true
    }
};
