// Todo o conteúdo do site fica aqui. Para atualizar o portfólio,
// normalmente basta editar este arquivo.

export interface Experience {
  role: string
  company: string
  period: string
  start: string // AAAA-MM, usado para calcular o tempo de casa
  location: string
  current?: boolean
  logo?: string // arquivo dentro de /public, ex.: 'benenutri.png'
  url?: string // site da empresa
  summary: string
  highlights: string[]
  stack: string[]
}

export interface Education {
  course: string
  institution: string
  status: string
  description: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export const profile = {
  name: 'Lucas Henrique Rabelo',
  shortName: 'Lucas Henrique',
  initials: 'LH',
  photo: 'lucas.webp',
  roles: ['Engenheiro de Software', 'Desenvolvedor Back-end', 'Integrações & APIs REST', 'Automação com IA'],
  location: 'Brasília – DF',
  github: 'LucasHrr7',
  linkedin: 'https://www.linkedin.com/in/lucashrabelo/',
  email: '', // opcional: preencha para exibir o botão de e-mail
  tagline:
    'Transformo regras de negócio em sistemas que funcionam: APIs, integrações de dados e automações que tiram trabalho manual da rotina das empresas.',
  about: [
    'Sou Engenheiro de Software no Grupo Benenutri e estudante de Engenharia de Software na UNICEPLAC. Tenho 18 anos, sou de Brasília e gosto de entender o problema de verdade antes de escrever a primeira linha de código.',
    'No dia a dia trabalho com APIs RESTful, integrações com ERP e otimização de consultas SQL em grandes volumes de dados. Fora do trabalho, estudo Java e Spring Boot construindo projetos práticos, que você encontra mais abaixo.',
  ],
}

// Repositórios em destaque, na ordem em que aparecem no site.
// Os dados (linguagem, estrelas, data) vêm ao vivo da API do GitHub.
// `description` aqui substitui a do GitHub (útil quando o repositório não tem descrição).
export const featuredRepos: { name: string; description?: string }[] = [
  { name: 'V2peladaHUb', description: 'Nova versão do PeladaHub em TypeScript, para organizar partidas de futebol, com front-end publicado online.' },
  { name: 'SmartShoppingJava' },
  { name: 'peladahub-final' },
  { name: 'Simulador-luta-java', description: 'Simulador de lutas estilo UFC em Java: cadastro de lutadores, lutas por categoria e resultado aleatório, aplicando POO.' },
  { name: 'Sistema-banco-Java-', description: 'Sistema bancário simples em Java, aplicando os princípios de Programação Orientada a Objetos.' },
  { name: 'interface-java-swing', description: 'Programa em Java com interface gráfica em Swing que realiza cálculos a partir dos dados inseridos.' },
]

export const experiences: Experience[] = [
  {
    role: 'Engenheiro de Software',
    company: 'Grupo Benenutri',
    period: 'set. 2026 – o momento',
    start: '2026-09',
    location: 'Brasília, DF · Presencial',
    current: true,
    logo: 'benenutri.png',
    url: 'https://www.benenutri.com',
    summary:
      'Desenvolvimento, manutenção e evolução de sistemas internos na plataforma Mitra, traduzindo requisitos das áreas em aplicações que automatizam a rotina da empresa.',
    highlights: [
      'Construção e consumo de APIs RESTful para comunicação segura entre diferentes sistemas.',
      'Integrações de dados com o ERP WinThor e otimização de consultas SQL sobre grandes volumes.',
      'Mapeamento de processos de distribuição e implantação de automações com IA / LLMs.',
      'Alinhamento constante com os setores para propor melhorias contínuas.',
    ],
    stack: ['APIs REST', 'SQL', 'WinThor', 'Mitra', 'IA / LLMs'],
  },
]

export const education: Education[] = [
  {
    course: 'Engenharia de Software',
    institution: 'UNICEPLAC',
    status: 'Em andamento',
    description:
      'Lógica de programação, algoritmos, estruturas de dados, banco de dados, análise de sistemas e desenvolvimento ágil.',
  },
]

export const skills: SkillGroup[] = [
  { title: 'Back-end', items: ['Java', 'Spring Boot', 'APIs REST', 'C'] },
  { title: 'Dados & Integrações', items: ['SQL', 'Otimização de queries', 'ERP WinThor', 'Plataforma Mitra'] },
  { title: 'Front-end', items: ['Vue 3', 'TypeScript', 'Vite', 'HTML & CSS'] },
  { title: 'Práticas', items: ['Git & GitHub', 'Scrum', 'Automação de processos', 'IA / LLMs'] },
]
