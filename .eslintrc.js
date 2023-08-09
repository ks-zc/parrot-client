module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript', 'plugin:prettier/recommended', 'prettier/react'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        __DEV__: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'global-require': 0,
        'react/no-unknown-property': ['error', { ignore: ['styleName'] }],
        'import/no-dynamic-require': 0,
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/no-unused-expressions': 0,
        'no-underscore-dangle': 0,
        'object-curly-newline': ['error', { consistent: true }],
        'arrow-parens': 2, // 要求箭头函数的参数使用圆括号  (a) => {}
        'generator-star-spacing': 2, // 允许方法之间加星号 function * generator() {}
        semi: [
            // 要求在语句末尾使用封号
            'error', // 提示级别
            'always', // 要求在语句末尾使用分号
        ],
        'padded-blocks': ['error', { blocks: 'never' }], // 要求或禁止块内填充,要求块语句和类的开始或末尾有空行
        'no-return-assign': 2, // 禁止在返回语句中赋值,除非赋值语句是在圆括号中  return (foo = bar + 2);
        'comma-dangle': ['error', 'always-multiline'],
        'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
        'react/prop-types': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/no-array-index-key': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/media-has-caption': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/alt-text': 'off',
        'import/prefer-default-export': 'off',
        'no-case-declarations': 'off',
        'react/jsx-uses-react': 'error', // jsx 文件中需要引入 react
        'react/jsx-uses-vars': 'error', // jsx 文件中不允许使用 var
        'react/no-danger': 'off',
        'react/state-in-constructor': 'off',
        'react/no-string-refs': 'error', // 当使用字符串格式的 ref 方式时会报错
        'react/display-name': 'off',
        'react/require-default-props': 'off',
        'react/destructuring-assignment': 0,
        '@typescript-eslint/restrict-plus-operands': 0,
        '@typescript-eslint/member-ordering': 2,
        '@typescript-eslint/no-console': 0,
        '@typescript-eslint/object-literal-sort-keys': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/interface-name': 0,
        '@typescript-eslint/no-shadowed-variable': 0,
        '@typescript-eslint/no-eval': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: true }],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/indent': 0,
        'no-bitwise': 0,
        'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
        'no-console': 0,
    },
};
