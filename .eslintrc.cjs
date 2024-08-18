module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'standard-with-typescript',
    'plugin:vue/vue3-essential'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script',
        parser: '@typescript-eslint/parser',
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.vue'],
      },
    },

  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.vue'],
  },
  'plugins': [
    'vue'
  ],
  'rules': {
    "@typescript-eslint/consistent-type-definition": "off",
    "@typescript-eslint/explicit-function-return-type": "off",

  }
}
