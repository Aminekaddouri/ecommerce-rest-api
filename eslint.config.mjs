import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Ignore patterns (replaces .eslintignore)
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**'],
  },

  // Base recommended config
  js.configs.recommended,

  // Global settings for all files
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node.js globals
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        console: 'readonly',
        exports: 'writable',
        global: 'readonly',
        module: 'readonly',
        process: 'readonly',
        require: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // General rules
      'no-console': 'warn',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: 'req|res|next|val|err',
          varsIgnorePattern: '_',
        },
      ],

      // Node.js/API specific
      'no-underscore-dangle': 'off',
      'no-param-reassign': ['error', { props: false }],
      'no-process-exit': 'off',
      'class-methods-use-this': 'off',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // Prettier config (must be last to override other configs)
  prettierConfig,
];