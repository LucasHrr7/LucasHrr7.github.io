import { onBeforeUnmount, onMounted, ref } from 'vue'

// Efeito de "máquina de escrever" que alterna entre as frases recebidas.
export function useTypewriter(words: string[], { type = 70, erase = 35, hold = 1800 } = {}) {
  const text = ref(words[0] ?? '')
  let timer: number | undefined

  onMounted(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || words.length < 2) return

    let word = 0
    let chars = text.value.length
    let deleting = true

    const tick = () => {
      const current = words[word]!
      chars += deleting ? -1 : 1
      text.value = current.slice(0, chars)

      let delay = deleting ? erase : type
      if (!deleting && chars === current.length) {
        deleting = true
        delay = hold
      } else if (deleting && chars === 0) {
        deleting = false
        word = (word + 1) % words.length
        delay = 300
      }
      timer = window.setTimeout(tick, delay)
    }
    timer = window.setTimeout(tick, hold)
  })

  onBeforeUnmount(() => clearTimeout(timer))
  return text
}
