module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true
    },
    extends: 'standard',
    plugins: ['@typescript-eslint'],
    rules: {
        'prefer-const': 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        // "eol-last": "off",
        // "space-in-parens": "off",
        // "operator-linebreak": "off",
        // "no-trailing-spaces": "off",
        // "quote-props": "off",
        // "comma-dangle": "off",
        // "standard/no-callback-literal": "off",
        'no-unused-vars': 'off',
        'promise/param-names': 'off',
        'no-async-promise-executor': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'no-useless-escape': 'off',
        'no-throw-literal': 'off'
    }
}
