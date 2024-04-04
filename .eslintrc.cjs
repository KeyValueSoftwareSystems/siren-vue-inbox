module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript', '@vue/eslint-config-prettier/skip-formatting', '@vue/airbnb', 'plugin:storybook/recommended'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ],
  rules: {
    'no-plusplus': 'off',
    'comma-dangle': ['error', 'never'],
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        vars: 'local'
      }
    ],
    'no-shadow': 'off',
    'implicit-arrow-linebreak': 'off',
    'space-before-blocks': 'error',
    'function-paren-newline': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return'
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*'
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      }
    ],
    'object-curly-newline': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/comma-dangle': 'off',
    'vue/no-setup-props-destructure': 'off',
    'func-call-spacing': 'off',
    'operator-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'vue/html-indent': 'off',
    'vue/max-attributes-per-line': 'off',
    'no-spaced-func': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'vue/first-attribute-linebreak': 'off',
    indent: ['off'],
    curly: ['error', 'multi', 'consistent'],
    'no-confusing-arrow': 'off',
    'nonblock-statement-body-position': 'off',
    'vue/operator-linebreak': 'off'
  }
};
