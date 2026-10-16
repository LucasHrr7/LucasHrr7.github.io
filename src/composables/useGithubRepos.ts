import { onMounted, ref } from 'vue'
import snapshot from '../data/repos-snapshot.json'

export interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
  fork: boolean
}

export interface Featured {
  name: string
  description?: string
}

const CACHE_KEY = 'gh-repos'
const CACHE_TTL = 1000 * 60 * 30 // 30 minutos (a API pública permite 60 req/hora)

// Monta a lista final: primeiro os destaques, na ordem escolhida;
// se não houver destaques, os mais recentes.
function pick(all: Repo[], user: string, featured: Featured[], limit: number): Repo[] {
  const own = all.filter((r) => !r.fork && r.name.toLowerCase() !== user.toLowerCase())
  if (!featured.length) {
    return own.sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at)).slice(0, limit)
  }
  return featured
    .map((f) => {
      const repo = own.find((r) => r.name.toLowerCase() === f.name.toLowerCase())
      return repo && { ...repo, description: f.description ?? repo.description }
    })
    .filter((r): r is Repo => Boolean(r))
    .slice(0, limit)
}

// Busca os repositórios públicos na API do GitHub. Se a API falhar
// (sem internet, limite de requisições), usa a cópia salva em repos-snapshot.json.
export function useGithubRepos(user: string, featured: Featured[] = [], limit = 6) {
  const repos = ref<Repo[]>([])
  const loading = ref(true)
  const offline = ref(false)

  onMounted(async () => {
    let all: Repo[] | undefined

    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        const { at, data } = JSON.parse(cached) as { at: number; data: Repo[] }
        if (Date.now() - at < CACHE_TTL) all = data
      }
    } catch {
      /* cache indisponível: segue para a API */
    }

    if (!all) {
      try {
        const res = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=100`)
        if (!res.ok) throw new Error(String(res.status))
        all = (await res.json()) as Repo[]
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data: all }))
        } catch {
          /* ignora */
        }
      } catch {
        all = snapshot as Repo[]
        offline.value = true
      }
    }

    repos.value = pick(all, user, featured, limit)
    loading.value = false
  })

  return { repos, loading, offline }
}
