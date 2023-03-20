module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  overrides: [],
  rules: {
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'never']
  }
}
