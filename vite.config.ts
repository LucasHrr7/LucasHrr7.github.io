import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Repositório LucasHrr7.github.io: o site fica na raiz (https://lucashrr7.github.io/),
// por isso `base` é '/'. Em um repositório com outro nome, use base: '/nome-do-repo/'.
export default defineConfig({
  base: '/',
  plugins: [vue()],
})
