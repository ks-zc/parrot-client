const genericNames = require('generic-names');

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: 'auto',
                targets: '> 50%, not dead',
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import', // 支持 dynamic-import
        ['@babel/plugin-proposal-decorators', { legacy: true }], // 支持 decorators
        ['@babel/plugin-proposal-class-properties', { loose: true }], // 支持 class 中的属性
        '@babel/plugin-proposal-optional-chaining', // 解析对象可选属性链
        '@babel/plugin-proposal-nullish-coalescing-operator', // 支持 ?? 符号
        ['@babel/plugin-transform-runtime', { version: require('@babel/helpers/package.json').version }],
        [
            'babel-plugin-react-css-modules',
            {
                generateScopedName: genericNames('[local][hash:base64:5]', { context: process.cwd() }),
                filetypes: {
                    '.scss': { syntax: 'postcss-scss' },
                },
                autoResolveMultipleImports: true,
                handleMissingStyleName: process.env.KS_ENV === 'production' ? 'throw' : 'ignore',
            },
        ],
    ],
    comments: false,
};
