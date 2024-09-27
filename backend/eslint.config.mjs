import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


export default [
  {files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  {ignores: ['dist/']},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {rules: {
    'semi': ['error', 'always'],
    'no-trailing-spaces': ['error'],
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
  }}
];