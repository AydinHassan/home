const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PurgecssPlugin = require("purgecss-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const glob = require("glob-all");
const isDev = process.env.NODE_ENV === "development";

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-z0-9-:\/]+/g) || [];
    }
}

function noop() {
    return () => {};
}

const plugins = [
    new ExtractTextPlugin('styles.css', {
        disable: process.env.NODE_ENV === 'development',
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
    }),
];

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        'postcss-loader',
                    ],
                }),
            },
            {
                test: /.*\.(gif|png|jpe?g|svg|pdf)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'link:href']
                    }
                }
            }

        ],
    },
    plugins: [
        isDev ? noop() : new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{ from: 'src/Aydin-Hassan-CV.pdf', to: 'Aydin-Hassan-CV.pdf'}]),
        new ExtractTextPlugin('styles.css', {
            disable: process.env.NODE_ENV === 'development',
        }),
        isDev ? noop() : new PurgecssPlugin({
            paths: glob.sync([path.join(__dirname, "./src/*.html")]),
            extractors: [
                {
                    extractor: TailwindExtractor,
                    extensions: ["html", "js"]
                }
            ],
            whitelist: () => {
                return ['back-to-top--show', 'back-to-top--fade-out']
            }
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
    ],
}