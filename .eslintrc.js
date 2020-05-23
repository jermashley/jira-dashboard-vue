module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  extends: [
    '@nuxtjs',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/essential',
    'prettier',
    'prettier/vue',
  ],
  plugins: ['prettier', 'vue'],
  rules: {
    quotes: ['error', 'backtick'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
