import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginJest from 'eslint-plugin-jest';

export default [
  { 
    files: ['**/*.{js,mjs,cjs,jsx}'], 
    languageOptions: { 
      sourceType: 'module' 
    },
  },
  { 
    files: ['**/*.js'], 
    languageOptions: { 
      sourceType: 'module' 
    } 
  },
  { 
    languageOptions: { 
      globals: globals.browser 
    } 
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.test.js', '**/*.spec.js', '**/tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      jest: pluginJest,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      indent: ['error', 2],
      'semi': ['error', 'always'],
      'space-before-function-paren': ['error', 'always'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'react/prop-types': 'off',
    },
  },
];