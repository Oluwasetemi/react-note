import { defineMonacoSetup } from '@slidev/types'

export default defineMonacoSetup(async (monaco) => {
  monaco.languages.register({ id: 'jsx' })
  monaco.languages.register({ id: 'tsx' })
})
