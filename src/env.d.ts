/// <reference types="vite/client" />

import type { vReveal } from './composables/reveal'

// Faz o TypeScript reconhecer a diretiva global v-reveal nos templates
declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
  }
}
