var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const clientLocation = '/client'

var config = {
    entry: {
        app: './client/app/index',
        vendor: ['react', 'react-dom']
    },
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname ,'/dist/'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new ExtractTextPlugin("styles.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            '$': "jquery",
            'jQuery': "jquery",
            'window.jQuery': "jquery",
            'window.$': 'jquery'

        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js'}),
        new webpack.DefinePlugin({
            "require.specified": "require.resolve"
        })
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel-loader'],
              exclude:[path.join(__dirname,'node_modules')]//,
              //include: [path.join(__dirname, clientLocation, 'app'),path.join(__dirname, 'constants')]
            },
            {   
                test: /\.css$/,
                  use: [
                    'style-loader',
                    'css-loader'
                  ]

            },
            {
                test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(eot|com|json|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    resolve: {
        alias: {
            core: path.resolve(__dirname, 'client', 'app', 'Core'),
            components: path.resolve(__dirname, 'client', 'app', 'components'),
            utils: path.resolve(__dirname, 'client', 'app', 'utils')
        },
        extensions: ['.json', '.js', '.jsx', '.css'],
    }
};


module.exports = config;
