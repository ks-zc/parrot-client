const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const genericNames = require('generic-names');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const __DEV__ = process.env.NODE_ENV === 'dev';

const entry = {
    content: ['./src/content/index.tsx'],
};
if (!__DEV__) {
    entry.background = ['./src/background/index.ts'];
}

const happyThreadPool = HappyPack.ThreadPool({
    id: 'thread',
    size: os.cpus().length,
});

const config = {
    entry,
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].min.js',
        clean: true,
        publicPath: '',
        chunkLoadingGlobal: 'webpackJsonp',
    },
    mode: __DEV__ ? 'development' : 'production',
    devServer: {
        hot: true, // 热更新
        open: true, // 编译完自动打开浏览器
        compress: false, // 开启gzip压缩
        port: 'auto', // 开启端口号
        // history路由必须
        historyApiFallback: true,
        client: {
            // webpack日志等级
            logging: 'error',
            overlay: false,
        },
        // host: 'local-ipv4',
        // 禁用关闭时的二次确认
        setupExitSignals: false,
    },
    // 修改node_modules可触发更新
    snapshot: {
        managedPaths: [],
        immutablePaths: [],
    },
    devtool: __DEV__ ? 'cheap-module-source-map' : 'nosources-source-map',
    module: {
        rules: [
            {
                test: /(\.js|\.ts)x?$/,
                use: [{ loader: 'happypack/loader', options: { id: 'babel' } }],
                include: [
                    /(\.esm)|(\/es)|(\.modular.js)|(\.module.js)/,
                    /(\.ts)x?$/,
                    path.resolve(process.cwd(), 'src'),
                ],
            },
            getCssRules(true),
            getCssRules(false),
        ],
    },
    plugins: [
        // 全局变量
        new webpack.DefinePlugin({
            __DEV__,
        }),
        new HappyPack({
            id: 'babel',
            threadPool: happyThreadPool,
            loaders: ['babel-loader'],
            verbose: false,
        }),
    ],
    resolve: {
        extensions: ['.js', '.tsx', '.ts', '.scss', '.css', '.png', '.json', '.jsx'],
    },
    optimization: {
        splitChunks: {
            maxSize: 1024 * 1024 * 1024,
            minSize: 1024 * 1024 * 1024,
        },
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
        ],
    },
};

if (__DEV__) {
    config.plugins.push(
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), 'index.html'),
        }),
    );
} else {
    config.plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/icon',
                    to: path.join(__dirname, 'build'),
                    force: true,
                },
                {
                    from: 'src/manifest.json',
                    to: path.join(__dirname, 'build'),
                    force: true,
                },
            ],
        }),
    );
}
const generateScope = genericNames('[local][hash:base64:5]', { context: process.cwd() });

function getCssRules(isModule) {
    return {
        test: isModule ? /.module\.((c|sa|sc)ss)$/i : /\.((c|sa|sc)ss)$/i,
        exclude: isModule ? [] : /.module\.((c|sa|sc)ss)$/i,
        use: [
            // MiniCssExtractPlugin.loader,
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: isModule
                        ? {
                              getLocalIdent({ resourcePath }, localIdentName, localName) {
                                  return generateScope(localName, resourcePath);
                              },
                          }
                        : false,
                    url: false,
                    sourceMap: false,
                },
            },
            'sass-loader',
        ],
    };
}

module.exports = config;
