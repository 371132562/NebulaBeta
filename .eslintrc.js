module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: ['vue', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  rules: {
    indent: ['off', 2],
    semi: ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    'vue/script-indent': 'off'
  }
}
