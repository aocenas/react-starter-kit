module.exports = {
    parser: 'babel-eslint', // for some reason not picked up need to set it as arg to eslint
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        node: true
    },
    plugins: [
        'flowtype',
        'react'
    ],
    rules: {
        semi: 'error',
        indent: ['error', 4],
        'comma-dangle': [2, 'always-multiline'],
        // TODO maybe makes sense for client code, maybe different eslint conf for that
        'no-console': 0,
        'flowtype/define-flow-type': 1,
        'flowtype/use-flow-type': 1,
        'jsx-quotes': [1, 'prefer-double'],
        quotes: [2, 'single', {'avoidEscape': true, 'allowTemplateLiterals': true}],
        indent: ['error', 4, {SwitchCase: 1}],
        'define-flow-type': 0
    },
    settings: {
        flowtype: {
            'onlyFilesWithFlowAnnotation': false
        }
    }
};