module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['alloy', 'alloy/react'],
  globals: {},
  parserOptions: {},
  plugins: ['react'],
  rules: {
    'no-unused-vars': 1,
    'no-implicit-coercion': 0,
  },
}
