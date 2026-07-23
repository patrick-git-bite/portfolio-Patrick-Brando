import type { LucideIcon } from "lucide-react";
import {
  Bot,
  BarChart3,
  Code,
  Monitor,
  Cloud,
  Zap,
  TrendingUp,
  Globe,
  Settings,
  Users,
  Database,
  Server,
  Calendar,
  Target,
  GitBranch,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: "home", label: "Início" },
  { id: "about", label: "Sobre" },
  { id: "education", label: "Formação" },
  { id: "experience", label: "Experiência" },
  { id: "timeline", label: "Jornada" },
  { id: "projects", label: "Projetos" },
  { id: "process", label: "Como funciona" },
  { id: "services", label: "Serviços" },
  { id: "contact", label: "Contato" },
];

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    icon: Bot,
    title: "Automação de Tarefas",
    description:
      "Scripts em Python para automatizar planilhas, organização de arquivos e processos repetitivos do dia a dia.",
    features: ["Scripts Python", "Automação de Excel", "Organização de Dados", "Processos Simples"],
  },
  {
    icon: BarChart3,
    title: "Dashboards Básicos",
    description:
      "Relatórios visuais simples para ajudar a entender vendas, estoque ou métricas do negócio.",
    features: ["Gráficos Simples", "Relatórios Visuais", "Controle Básico", "Análise Inicial"],
  },
  {
    icon: Code,
    title: "Sites Simples",
    description:
      "Sites institucionais e landing pages funcionais, com design limpo e responsivo para pequenos negócios.",
    features: ["Sites Institucionais", "Landing Pages", "Design Responsivo", "Manutenção Básica"],
  },
  {
    icon: Server,
    title: "Suporte em TI",
    description:
      "Configuração de redes, backup e soluções básicas de infraestrutura para escritórios e comércios.",
    features: ["Configuração de Rede", "Backup Básico", "Suporte Técnico", "Otimização"],
  },
  {
    icon: Cloud,
    title: "Soluções em Nuvem",
    description:
      "Google Workspace, organização de arquivos na nuvem e ferramentas digitais para modernizar o negócio.",
    features: ["Google Workspace", "Organização Cloud", "Ferramentas Digitais", "Migração"],
  },
  {
    icon: Users,
    title: "Parceria em Projetos",
    description:
      "Projetos menores onde aplico meus conhecimentos e evoluo junto com cada desafio.",
    features: ["Projetos Pequenos", "Aprendizado Conjunto", "Dedicação Total", "Transparência"],
  },
];

export interface Skill {
  name: string;
  level: "Básico" | "Intermediário" | "Avançado";
  width: string;
  icon: LucideIcon;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "Next.js", level: "Intermediário", width: "70%", icon: Globe },
      { name: "React", level: "Intermediário", width: "65%", icon: Code },
      { name: "TypeScript", level: "Intermediário", width: "65%", icon: Code },
      { name: "JavaScript", level: "Intermediário", width: "65%", icon: Code },
      { name: "TailwindCSS", level: "Intermediário", width: "60%", icon: Code },
      { name: "HTML & CSS", level: "Intermediário", width: "65%", icon: Code },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "NestJS", level: "Intermediário", width: "65%", icon: Server },
      { name: "Node.js", level: "Intermediário", width: "65%", icon: Server },
      { name: "Python", level: "Intermediário", width: "65%", icon: Code },
      { name: "REST APIs", level: "Intermediário", width: "65%", icon: Globe },
      { name: "CQRS & Microsserviços", level: "Básico", width: "45%", icon: Zap },
    ],
  },
  {
    id: "database",
    label: "Dados",
    skills: [
      { name: "PostgreSQL", level: "Intermediário", width: "60%", icon: Database },
      { name: "MongoDB", level: "Básico", width: "45%", icon: Database },
      { name: "Redis", level: "Básico", width: "45%", icon: Database },
      { name: "Apache Kafka", level: "Básico", width: "40%", icon: Zap },
      { name: "Prisma", level: "Básico", width: "45%", icon: Database },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    skills: [
      { name: "Docker", level: "Intermediário", width: "65%", icon: Server },
      { name: "PM2", level: "Básico", width: "45%", icon: Settings },
      { name: "Ubuntu Linux", level: "Intermediário", width: "60%", icon: Monitor },
      { name: "Git & GitHub", level: "Intermediário", width: "65%", icon: GitBranch },
    ],
  },
  {
    id: "extras",
    label: "Extras",
    skills: [
      { name: "Google Cloud", level: "Intermediário", width: "60%", icon: Cloud },
      { name: "VS Code", level: "Avançado", width: "80%", icon: Code },
      { name: "Lógica de Programação", level: "Intermediário", width: "70%", icon: GitBranch },
      { name: "Scrum & Kanban", level: "Intermediário", width: "65%", icon: Users },
    ],
  },
];

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  achievements: string[];
  status: "Concluído" | "Em andamento" | "Previsto";
}

export const timelineData: TimelineItem[] = [
  {
    year: "2024",
    title: "Início da Graduação",
    description: "Análise e Desenvolvimento de Sistemas na Uniftec",
    icon: Calendar,
    achievements: ["Primeiros contatos com programação", "Fundamentos de algoritmos"],
    status: "Em andamento",
  },
  {
    year: "2025",
    title: "Primeira Experiência Profissional",
    description: "Analista/Suporte de TI na Detella Restaurantes",
    icon: Target,
    achievements: ["Automação de processos", "Desenvolvimento full-stack", "Gestão de infraestrutura"],
    status: "Concluído",
  },
  {
    year: "2026",
    title: "Desenvolvedor Full-Stack @ DataCrazy",
    description: "Desenvolvedor CRM na DataCrazy",
    icon: Code,
    achievements: ["NestJS & Next.js", "Kafka, Redis & Docker", "PostgreSQL & microsserviços"],
    status: "Em andamento",
  },
  {
    year: "2025",
    title: "Google Cloud Computing Foundations",
    description: "Certificação concluída pela Google Cloud",
    icon: Cloud,
    achievements: ["Fundamentos de cloud computing", "Infraestrutura Google Cloud", "14+ habilidades técnicas"],
    status: "Concluído",
  },
  {
    year: "2025",
    title: "Google Cloud Data Analytics Certificate",
    description: "Certificação concluída pela Google Cloud",
    icon: BarChart3,
    achievements: ["BigQuery & processamento de dados", "Visualização com Looker Studio", "Reconhecimento ACE (10 créditos)"],
    status: "Concluído",
  },
  {
    year: "2025",
    title: "Especialização Google Cloud",
    description: "15+ certificações concluídas",
    icon: TrendingUp,
    achievements: ["Infraestrutura & rede", "Dados & machine learning", "Certificações técnicas avançadas"],
    status: "Concluído",
  },
  {
    year: "2027",
    title: "Conclusão da Graduação",
    description: "Formação em Análise e Desenvolvimento de Sistemas",
    icon: GraduationCap,
    achievements: ["Projeto de conclusão", "Preparação para o mercado", "Portfólio consolidado"],
    status: "Previsto",
  },
];

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  icon: LucideIcon;
  description: string;
  skillGroups: { label: string; items: string[] }[];
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  {
    title: "Google Cloud Data Analytics Certificate",
    issuer: "Google Cloud",
    date: "Nov 2025",
    icon: BarChart3,
    description:
      "Prepara para funções de Cloud Data Analyst, Cloud Data Technician e Cloud Operations Analyst, com SQL, limpeza de dados, análise, visualização e BI na nuvem.",
    skillGroups: [
      { label: "Análise & Processamento", items: ["BigQuery", "Data Analytics", "Data Transformation"] },
      { label: "Visualização & BI", items: ["Looker Studio", "Data Visualization", "Business Intelligence"] },
      { label: "Modelagem & Gestão", items: ["Data Modeling", "Project Management", "SQL"] },
    ],
    credentialUrl: "https://www.credly.com/earner/earned/badge/d28809ac-7497-485e-9b04-d3f7041dd6b6",
  },
  {
    title: "Google Cloud Computing Foundations Certificate",
    issuer: "Google Cloud",
    date: "Nov 2025",
    icon: Cloud,
    description:
      "Proficiência técnica em cloud computing, base para carreiras em infraestrutura de TI, engenharia cloud e aplicações cloud-native.",
    skillGroups: [
      { label: "Infraestrutura", items: ["Compute Engine", "Cloud Storage"] },
      { label: "Segurança", items: ["IAM", "Network Security"] },
      { label: "Dados & ML", items: ["BigQuery", "Dataproc"] },
      { label: "APIs & Dev", items: ["Cloud Functions", "REST APIs"] },
    ],
    credentialUrl: "https://www.credly.com/earner/earned/badge/8b817251-061c-4faa-870b-5d64a28a2884",
  },
  {
    title: "Especialização Google Cloud",
    issuer: "Google Cloud",
    date: "2025",
    icon: TrendingUp,
    description:
      "15+ certificações técnicas Google Cloud, de fundamentos a especializações em infraestrutura, dados, machine learning e segurança.",
    skillGroups: [
      { label: "Infraestrutura", items: ["Compute Engine", "Load Balancing", "VPC & Network"] },
      { label: "Dados & ML", items: ["BigQuery", "Data Pipelines", "ML APIs"] },
      { label: "Segurança & Ops", items: ["IAM", "Network Security", "Cloud Operations"] },
    ],
    credentialUrl: "https://www.credly.com/users/patrick-brando",
  },
  {
    title: "Fortinet Fast Track Workshop: Network Security",
    issuer: "Fortinet",
    date: "Out 2025",
    icon: ShieldCheck,
    description:
      "Novidades do FortiOS r06 com laboratório prático e Security Fabric.",
    skillGroups: [{ label: "Cibersegurança", items: ["FortiGate", "Firewalls", "VPN SSL"] }],
  },
];

export interface ExperienceSkillGroup {
  label: string;
  icon: LucideIcon;
  items: string[];
}

export interface ExperienceBullet {
  label: string;
  icon: LucideIcon;
  items: string[];
}

export const experience = {
  role: "Desenvolvedor Full-Stack",
  company: "DataCrazy CRM",
  period: "2026 – Atual",
  summary:
    "No dia a dia trabalho tanto em features novas quanto em chamados de sustentação e comentários de review, tento sempre confirmar a causa raiz antes de sair aplicando um patch.",
  tags: ["Desenvolvedor Full-Stack", "Backend NestJS", "Microsserviços & Kafka", "DevOps & Docker"],
  bullets: [
    {
      label: "Frontend (Next.js)",
      icon: Code,
      items: [
        "Interfaces com Next.js (App Router), React e TypeScript",
        "Estado e cache de dados com TanStack Query e Zustand",
        "Componentes com shadcn/ui e Radix UI, estilizados com TailwindCSS",
        "Automação de fluxos visuais com React Flow",
      ],
    },
    {
      label: "Backend (NestJS)",
      icon: Server,
      items: [
        "APIs e microsserviços com NestJS",
        "Comunicação assíncrona entre serviços com Kafka",
        "Persistência com PostgreSQL e MongoDB",
        "Processamento em background com filas (BullMQ + Redis)",
      ],
    },
    {
      label: "Infra & DevOps",
      icon: Settings,
      items: [
        "Containers com Docker e Docker Compose",
        "Gerenciamento de processos com PM2",
        "Observabilidade com Sentry e Prometheus",
        "Ambiente de desenvolvimento em Ubuntu",
      ],
    },
    {
      label: "Metodologias & Qualidade",
      icon: GitBranch,
      items: [
        "Git Flow, com PRs detalhadas e revisão de código",
        "Testes unitários com Jest e end-to-end com Playwright",
        "Prefiro entender a causa raiz de um bug antes de corrigir",
        "Atendo tanto chamados de sustentação quanto features novas",
      ],
    },
  ] satisfies ExperienceBullet[],
  architecture: [
    {
      label: "Mensageria & Eventos",
      icon: Zap,
      items: [
        "Kafka para comunicação assíncrona entre microsserviços",
        "Filas com BullMQ e Redis para processamento em background",
      ],
    },
    {
      label: "Dados & Persistência",
      icon: Database,
      items: [
        "PostgreSQL e MongoDB, dependendo do serviço",
        "Redis para cache e sessões distribuídas",
      ],
    },
  ] satisfies ExperienceSkillGroup[],
  stack: [
    { label: "Frontend", items: ["Next.js", "React", "TypeScript", "TailwindCSS", "TanStack Query"] },
    { label: "Backend", items: ["NestJS", "Node.js", "REST APIs", "CQRS"] },
    { label: "Dados & Mensageria", items: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "Prisma"] },
    { label: "Infra & DevOps", items: ["Docker", "PM2", "Ubuntu", "Git"] },
  ],
};

export interface ProjectSection {
  title: string;
  image?: string;
  points: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  featured?: boolean;
  github?: string;
  private?: boolean;
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    id: "assetwise",
    title: "AssetWise",
    tagline: "Projeto destaque",
    description:
      "Sistema completo de gestão de ativos de TI desenvolvido para empresa real, com diagnóstico por IA e relatórios automáticos.",
    tags: ["Next.js", "TypeScript", "Firebase", "Google AI"],
    featured: true,
    private: true,
    sections: [
      {
        title: "Dashboard Principal",
        image: "/projects/assetwise/dashboard.jpg",
        points: [
          "Server-side rendering com Next.js 14",
          "Zustand para gerenciamento de estado",
          "React Query para cache em tempo real",
          "Recharts com dados do Firestore",
        ],
      },
      {
        title: "Diagnóstico por IA",
        image: "/projects/assetwise/diagnostico-ia.jpg",
        points: [
          "Gemini Pro 1.5 com 128K de contexto",
          "Prompt engineering para diagnósticos",
          "Content filtering nativo",
        ],
      },
    ],
  },
  {
    id: "fluxfinance",
    title: "Flux Finance",
    tagline: "Plataforma financeira",
    description: "Plataforma multi-usuário para gestão financeira pessoal com insights inteligentes.",
    tags: ["Next.js", "Firebase", "TypeScript", "Multi-usuário"],
    github: "https://github.com/patrick-git-bite/Flux-Finance",
    sections: [
      {
        title: "Dashboard Financeiro",
        image: "/projects/fluxfinance/painel.jpg",
        points: [
          "Firebase Authentication",
          "Firestore com regras de segurança",
          "Isolamento de dados por usuário",
        ],
      },
      {
        title: "Gestão de Transações",
        image: "/projects/fluxfinance/transacoes.jpg",
        points: ["Validação com Zod", "CRUD otimizado", "Filtros em tempo real", "Categorização automática"],
      },
      {
        title: "Insights Inteligentes",
        image: "/projects/fluxfinance/insights.jpg",
        points: ["Gráficos interativos", "Tendências de gastos", "Metas financeiras"],
      },
    ],
  },
  {
    id: "rpa",
    title: "Automação RPA",
    tagline: "Robótica de processos",
    description: "Automatiza baixa de documentos via e-mail com Python e UiPath, integrando com ERP corporativo.",
    tags: ["Python", "UiPath", "Automação", "Outlook"],
    github: "https://github.com/patrick-git-bite/RPA",
    sections: [
      {
        title: "Stack técnica",
        points: [
          "win32com para integração nativa com Outlook",
          "Pandas para processamento de dados extraídos",
          "UiPath Studio + Orchestrator para automação de UI no ERP Teknisa",
          "Regex para extração inteligente de dados",
        ],
      },
      {
        title: "Fluxo de processamento",
        points: [
          "Monitoramento contínuo da caixa de e-mail",
          "Extração e validação de dados via regex",
          "Execução do robot UiPath no ERP",
          "Confirmação automática por e-mail e log de auditoria",
        ],
      },
      {
        title: "Resultados",
        points: [
          "45s de tempo médio de processamento",
          "50–70 processos por dia",
          "98% de redução de erros manuais",
          "6h/dia de economia de tempo",
        ],
      },
    ],
  },
  {
    id: "analise",
    title: "Análise Financeira",
    tagline: "Data analysis",
    description: "Ferramenta para análise comparativa de dados financeiros entre períodos, com relatórios automáticos.",
    tags: ["Python", "Pandas", "Matplotlib", "Data Analysis"],
    github: "https://github.com/patrick-git-bite/Analise-financeiro",
    sections: [
      {
        title: "Arquitetura modular",
        points: [
          "data_processor.py: limpeza e validação de dados",
          "chart_generator.py: geração de visualizações",
          "report_builder.py: relatórios Excel/PDF",
          "statistical_analysis.py: análises estatísticas",
        ],
      },
      {
        title: "Pipeline",
        points: [
          "Extração e validação de arquivos Excel",
          "Análise comparativa com variações absolutas e percentuais",
          "Geração de gráficos, heatmaps e correlações",
          "Exportação em Excel multi-aba e PDF",
        ],
      },
      {
        title: "Performance",
        points: ["2.3s de processamento", "15+ tipos de gráficos", "99.8% de precisão", "3 formatos de exportação"],
      },
    ],
  },
];
