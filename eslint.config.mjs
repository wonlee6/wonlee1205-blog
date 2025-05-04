import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactX from 'eslint-plugin-react-x'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tailwindcssPlugin from 'eslint-plugin-tailwindcss'
import globals from 'globals'

export default [
  // 기본 설정
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },

  // Next.js 설정
  {
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules
    }
  },

  // React 설정
  {
    plugins: {
      react: reactPlugin,
      'react-x': reactX
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactX.configs['recommended-typescript'].rules,
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-children-prop': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }]
    }
  },

  // React Hooks 설정
  {
    plugins: {
      'react-hooks': reactHooksPlugin
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'warn'
    }
  },

  // TypeScript 설정
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin
    },
    languageOptions: {
      parser: typescriptEslintParser
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...typescriptEslintPlugin.configs.strict.rules,
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },

  // JSX 접근성 설정
  {
    plugins: {
      'jsx-a11y': jsxA11yPlugin
    },
    rules: {
      ...jsxA11yPlugin.configs.recommended.rules,
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/interactive-supports-focus': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'off'
    }
  },

  // Import 설정
  {
    plugins: {
      import: importPlugin,
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error'
    }
  },

  // Tailwind CSS 설정
  {
    plugins: {
      tailwindcss: tailwindcssPlugin
    },
    rules: {
      'tailwindcss/no-custom-classname': 'off'
    }
  },

  // Prettier 설정
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto'
        }
      ]
    }
  },

  // 기타 규칙
  {
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',
      'no-shadow': 'off',
      'no-undef': 'off',
      'no-empty': 'warn',
      'jsx-quotes': ['error', 'prefer-single']
    }
  }
]
