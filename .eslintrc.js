module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: ['vue', 'prettier'],
  // extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  // overrides: [
  //   {
  //     files: ['*.js'],
  //     plugins: ['prettier'],
  //     extends: ['eslint:recommended', 'plugin:prettier/recommended']
  //   }
  // ],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'never']
  }
}
