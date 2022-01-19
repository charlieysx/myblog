module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'prefer-const': 'off',
        'no-unused-vars': 'off',
        'promise/param-names': 'off',
        'no-async-promise-executor': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'no-useless-escape': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'vue/html-indent': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/valid-template-root': 'off',
        'vue/html-self-closing': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'vue/no-unused-components': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-extra-semi': 'off',
        'vue/no-v-html': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        'vue/multi-word-component-names': 'off'
    }
}
