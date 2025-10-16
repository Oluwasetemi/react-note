import { defineMonacoSetup } from '@slidev/types'

export default defineMonacoSetup(async (monaco) => {
  // Slidev automatically registers languages from Shiki to Monaco Editor
  // We just need to ensure proper configuration for JSX/TSX languages

  // Register JSX language with proper configuration
  monaco.languages.register({ id: 'jsx' })
  monaco.languages.setLanguageConfiguration('jsx', {
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/']
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
      ['<', '>']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: '`', close: '`' },
      { open: '<', close: '>' }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '<', close: '>' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: '`', close: '`' }
    ]
  })


  // Set up tokenization for JSX (extend JavaScript tokenization)
  monaco.languages.setMonarchTokensProvider('jsx', {
    tokenizer: {
      root: [
        // JSX tags
        [/<[a-zA-Z_$][\w\-$]*/, 'tag'],
        [/<\/[a-zA-Z_$][\w\-$]*>/, 'tag'],
        [/[a-zA-Z_$][\w\-$]*=/, 'attribute.name'],
        [/"[^"]*"/, 'attribute.value'],
        [/'[^']*'/, 'attribute.value'],
        [/\{/, 'delimiter.bracket', '@jsxExpression'],
        [/[{}]/, 'delimiter.bracket']
      ],
      jsxExpression: [
        [/\}/, 'delimiter.bracket', '@pop'],
        [/[{}]/, 'delimiter.bracket'],
        [/[^}]+/, 'string']
      ]
    }
  })
})
