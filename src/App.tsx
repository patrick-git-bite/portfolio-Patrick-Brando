import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { 
  Mail, Phone, Github, Linkedin, Menu, X, Calendar, MapPin, 
  Bot, BarChart3, Code, Monitor, Cloud, Gamepad2, Zap, 
  TrendingUp, Globe, Settings, Sparkles, Heart, Users, 
  Coffee, Database, Server, Target, Clock, FileText, GitBranch, Eye, Lock, GraduationCap, Award, CheckCircle, XCircle, Send   
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { toast } from "sonner";
import patrickImage from "./assets/foto.jpg";
import { Analytics } from "@vercel/analytics/next"
import assetwiseDashboard from "./assets/assetwise-dashboard.jpg";
import assetwiseIA from "./assets/assetwise-ia.jpg";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeSkillTab, setActiveSkillTab] = useState('frontend');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

 const openProjectModal = (project: string) => {
  setSelectedProject(project);
};

const closeProjectModal = () => {
  setSelectedProject(null);
};
  // INÍCIO DA LÓGICA DO FORMULÁRIO
  // Estados para guardar os dados do formulário e o status de envio.
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Função para atualizar o estado conforme o usuário digita.
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função que envia os dados para a API quando o formulário é submetido.
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormStatus('idle');
    toast.info('Enviando sua mensagem...');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch("/api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (res.ok) {
        toast.success('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        setFormData({ name: '', email: '', message: '' });
        setFormStatus('success');
      } else {
        const data = await res.json();
        toast.error(`Erro ao enviar: ${data.message || 'Tente novamente.'}`);
        setFormStatus('error');
      }
    } catch (err: any) {
      clearTimeout(timeout);
      if (err?.name === 'AbortError') {
        toast.error('Tempo esgotado. Tente novamente.');
      } else {
        toast.error("Ocorreu um erro de conexão. Verifique sua internet.");
      }
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  
  // --- FIM DA LÓGICA DO FORMULÁRIO ---

   useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'experience', 'timeline', 'projects', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const services = [
  {
    icon: Bot,
    title: "Automação de Tarefas",
    description: "Desenvolvo scripts em Python para automatizar planilhas, organização de arquivos e processos repetitivos do seu dia a dia.",
    features: ["Scripts Python", "Automação Excel", "Organização de Dados", "Processos Simples"],
    gradient: "from-blue-600/20 to-cyan-600/20",
    borderColor: "border-blue-500/30"
  },
  {
    icon: BarChart3,
    title: "Dashboards Básicos",
    description: "Crio relatórios visuais simples para ajudar você a entender melhor vendas, estoque ou métricas do seu negócio.",
    features: ["Gráficos Simples", "Relatórios Visuais", "Controle Básico", "Análise Inicial"],
    gradient: "from-purple-600/20 to-pink-600/20",
    borderColor: "border-purple-500/30"
  },
  {
    icon: Code,
    title: "Sites Simples",
    description: "Desenvolvo sites institucionais e landing pages funcionais, com design limpo e responsivo para pequenos negócios.",
    features: ["Sites Institucionais", "Landing Pages", "Design Responsivo", "Manutenção Básica"],
    gradient: "from-green-600/20 to-teal-600/20",
    borderColor: "border-green-500/30"
  },
  {
    icon: Server,
    title: "Suporte em TI",
    description: "Ajudo na configuração de redes, backup, e soluções básicas de infraestrutura para pequenos escritórios e comércios.",
    features: ["Configuração Rede", "Backup Básico", "Suporte TI", "Otimização"],
    gradient: "from-orange-600/20 to-red-600/20",
    borderColor: "border-orange-500/30"
  },
  {
    icon: Cloud,
    title: "Soluções em Nuvem",
    description: "Implemento Google Workspace, organização de arquivos na nuvem e ferramentas digitais para modernizar seu negócio.",
    features: ["Google Workspace", "Organização Cloud", "Ferramentas Digitais", "Migração"],
    gradient: "from-indigo-600/20 to-blue-600/20",
    borderColor: "border-indigo-500/30"
  },
  {
    icon: Users,
    title: "Parceria em Projetos",
    description: "Aprendo junto com você! Projetos menores onde posso aplicar meus conhecimentos e evoluir com cada desafio.",
    features: ["Projetos Pequenos", "Aprendizado Conjunto", "Dedicação Total", "Transparência"],
    gradient: "from-violet-600/20 to-purple-600/20",
    borderColor: "border-violet-500/30"
  }
];

const skillCategories = [
  {
    id: 'frontend',
    label: '🌐 Frontend',
    skills: [
      { name: 'Next.js', level: 'Intermediário', color: 'from-slate-300 to-white', width: '70%', icon: Globe },
      { name: 'React', level: 'Intermediário', color: 'from-cyan-500 to-blue-500', width: '65%', icon: Code },
      { name: 'TypeScript', level: 'Intermediário', color: 'from-blue-400 to-cyan-500', width: '65%', icon: Code },
      { name: 'JavaScript', level: 'Intermediário', color: 'from-yellow-400 to-orange-500', width: '65%', icon: Code },
      { name: 'TailwindCSS', level: 'Intermediário', color: 'from-teal-400 to-cyan-500', width: '60%', icon: Code },
      { name: 'HTML & CSS', level: 'Básico', color: 'from-orange-500 to-red-500', width: '55%', icon: Code },
    ]
  },
  {
    id: 'backend',
    label: '⚙️ Backend',
    skills: [
      { name: 'NestJS', level: 'Intermediário', color: 'from-red-500 to-pink-500', width: '65%', icon: Server },
      { name: 'Node.js', level: 'Intermediário', color: 'from-green-400 to-green-600', width: '65%', icon: Server },
      { name: 'Python', level: 'Intermediário', color: 'from-yellow-500 to-green-500', width: '65%', icon: Code },
      { name: 'REST APIs', level: 'Intermediário', color: 'from-blue-500 to-purple-500', width: '65%', icon: Globe },
      { name: 'Swagger / OpenAPI', level: 'Básico', color: 'from-green-500 to-teal-500', width: '40%', icon: FileText },
    ]
  },
  {
    id: 'database',
    label: '🗄️ Dados',
    skills: [
      { name: 'PostgreSQL', level: 'Intermediário', color: 'from-blue-500 to-indigo-500', width: '60%', icon: Database },
      { name: 'SQL', level: 'Intermediário', color: 'from-purple-500 to-pink-500', width: '60%', icon: Database },
      { name: 'Redis', level: 'Básico', color: 'from-red-500 to-orange-500', width: '45%', icon: Database },
      { name: 'Apache Kafka', level: 'Básico', color: 'from-slate-500 to-gray-400', width: '40%', icon: Zap },
      { name: 'TypeORM', level: 'Básico', color: 'from-orange-400 to-yellow-500', width: '40%', icon: Database },
    ]
  },
  {
    id: 'devops',
    label: '🐳 DevOps',
    skills: [
      { name: 'Docker', level: 'Básico', color: 'from-blue-500 to-cyan-500', width: '50%', icon: Server },
      { name: 'Ubuntu Linux', level: 'Intermediário', color: 'from-orange-500 to-red-500', width: '60%', icon: Monitor },
      { name: 'Git & GitHub', level: 'Intermediário', color: 'from-gray-500 to-purple-500', width: '65%', icon: GitBranch },
    ]
  },
  {
    id: 'extras',
    label: '☁️ Extras',
    skills: [
      { name: 'Google Cloud', level: 'Intermediário', color: 'from-blue-400 to-yellow-400', width: '60%', icon: Cloud },
      { name: 'VS Code', level: 'Avançado', color: 'from-blue-500 to-cyan-500', width: '80%', icon: Code },
      { name: 'Lógica de Programação', level: 'Intermediário', color: 'from-purple-500 to-pink-500', width: '70%', icon: GitBranch },
      { name: 'Scrum & Kanban', level: 'Intermediário', color: 'from-green-500 to-teal-500', width: '65%', icon: Users },
    ]
  },
];

const timelineData = [
  { 
    year: "2024", 
    title: "Início da Graduação", 
    description: "Análise e Desenvolvimento de Sistemas - Uniftec",
    icon: Calendar,
    color: "from-blue-500 to-cyan-500",
    achievements: ["Primeiros contatos com programação", "Fundamentos de algoritmos"],
    status: "Em andamento"  // Nova propriedade
  },
  { 
    year: "2025", 
    title: "Primeira Experiência Profissional", 
    description: "Analista/Suporte de TI - Detella Restaurantes",
    icon: Target,
    color: "from-green-500 to-teal-500",
    achievements: ["Automação de processos", "Desenvolvimento full-stack", "Gestão de infraestrutura"],
    status: "Concluído"
  },
  { 
    year: "2026", 
    title: "Desenvolvedor Full-Stack @ DataCrazy", 
    description: "Desenvolvedor CRM - DataCrazy",
    icon: Code,
    color: "from-cyan-500 to-blue-500",
    achievements: ["NestJS & Next.js", "Kafka & Redis & Docker", "PostgreSQL & microsserviços"],
    status: "Em andamento"
  },
  { 
    year: "2025", 
    title: "Google Cloud Computing Foundations", 
    description: "Certificação Concluída • Google Cloud",
    icon: Cloud,
    color: "from-purple-500 to-pink-500",
    achievements: ["Fundamentos de cloud computing", "Infraestrutura Google Cloud", "14+ Habilidades técnicas"],
    status: "Concluído"
  },
  { 
    year: "2025", 
    title: "Google Cloud Data Analytics Certificate", 
    description: "Certificação Concluída • Google Cloud",
    icon: BarChart3,
    color: "from-yellow-500 to-green-500",
    achievements: ["BigQuery & Data Processing", "Data Visualization (Looker Studio)", "Data Modeling & BI", "Reconhecimento ACE (10 créditos)"],
    status: "Concluído"
  },
  { 
    year: "2025", 
    title: "Especialização Google Cloud", 
    description: "15+ Certificações Google Cloud Concluídas",
    icon: TrendingUp,
    color: "from-orange-500 to-red-500",
    achievements: ["Infraestrutura & Rede", "Dados & Machine Learning", "Certificações técnicas avançadas"],
    status: "Concluído"
  },
  { 
    year: "2027", 
    title: "Conclusão da Graduação", 
    description: "Formação em Análise e Desenvolvimento de Sistemas",
    icon: GraduationCap,
    color: "from-indigo-500 to-blue-500",
    achievements: ["Projeto de conclusão", "Preparação para mercado", "Portfólio consolidado"],
    status: "Previsto"
  }
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-blue-950 to-slate-900">
       <div 
      className="fixed w-6 h-6 bg-blue-500/20 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
      style={{ 
        left: cursorPosition.x - 12, 
        top: cursorPosition.y - 12,
        transform: 'scale(1)'
      }}
    />
    <div 
      className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-50"
      style={{ 
        left: cursorPosition.x - 4, 
        top: cursorPosition.y - 4 
      }}
    />
      {/* Fixed Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-950/80 border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Patrick Brando
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Início' },
                { id: 'about', label: 'Sobre' },
                { id: 'education', label: 'Formação' },
                { id: 'experience', label: 'Experiência' },
                { id: 'timeline', label: 'Jornada' },
                { id: 'projects', label: 'Projetos' },
                { id: 'services', label: 'Serviços' },
                { id: 'contact', label: 'Contato' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors hover:text-blue-400 ${
                    activeSection === item.id ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 space-y-2"
            >
              {[
                { id: 'home', label: 'Início' },
                { id: 'about', label: 'Sobre' },
                { id: 'education', label: 'Formação' },
                { id: 'experience', label: 'Experiência' },
                { id: 'timeline', label: 'Jornada' },
                { id: 'projects', label: 'Projetos' },
                { id: 'services', label: 'Serviços' },
                { id: 'contact', label: 'Contato' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 hover:bg-purple-800/20 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
<section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 md:pt-0">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
    
    {/* Texto - ORDEM 2 no mobile, 1 no desktop */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center md:text-left relative order-2 md:order-1"
    >
      <div className="mb-6 md:mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Patrick Brando
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 md:mb-6"
        >
          Desenvolvedor Full-Stack @ DataCrazy CRM
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-base sm:text-lg text-gray-400 mb-6 md:mb-8 leading-relaxed"
        >
            Construindo o CRM do futuro com NestJS, Next.js, PostgreSQL, Redis e Kafka.
  Apaixonado por microsserviços, arquitetura escalável e por transformar
  código em produto real de alto impacto.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
      >
        <Button 
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25 text-sm sm:text-base"
          onClick={() => scrollToSection('services')}
        >
          <Heart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Como Posso Ajudar
        </Button>
        <Button 
          size="lg"
          variant="outline"
          className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 text-sm sm:text-base"
          onClick={() => scrollToSection('contact')}
        >
          <Coffee className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Vamos Conversar
        </Button>
      </motion.div>
    </motion.div>

    {/* Imagem - ORDEM 1 no mobile, 2 no desktop */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex justify-center order-1 md:order-2 mb-8 md:mb-0"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-20 scale-110"></div>
        <img
          src={patrickImage}
          alt="Patrick Brando"
          className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-gradient-to-r from-blue-400 to-purple-400 shadow-2xl shadow-blue-500/20"
        />
      </div>
    </motion.div>
    
  </div>
</section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sobre Mim
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-to-br from-slate-800/50 to-purple-900/20 border-purple-500/20 backdrop-blur-sm">
  <p className="text-lg text-gray-300 leading-relaxed mb-6">
    Desenvolvedor Full-Stack no <strong>DataCrazy CRM</strong>, construindo soluções de alto desempenho
    com <strong>NestJS</strong>, <strong>Next.js</strong>, <strong>PostgreSQL</strong>, <strong>Redis</strong> e <strong>Kafka</strong>.
    Apaixonado por microsserviços, arquitetura escalável e pelo poder do <strong>Docker</strong> no dia a dia.
  </p>

  <p className="text-lg text-gray-300 leading-relaxed mb-6">
    Certificado em <strong>Google Cloud</strong> com foco em dados e infraestrutura, cursando
    <strong> Análise e Desenvolvimento de Sistemas</strong> na Uniftec. Movido pela curiosidade
    e pela busca constante de código limpo e soluções que escalam.
  </p>

  <p className="text-lg text-gray-300 leading-relaxed">
    Acredito que boa tecnologia nasce da combinação entre <strong>código bem escrito</strong>,
    <strong> arquitetura pensada</strong> e entrega contínua. Sempre em busca do próximo desafio.
  </p>
</Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl mb-4 text-gray-200">Stack Atual & Competências:</h3>

              <div className="flex flex-wrap gap-2 mb-5">
                {skillCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveSkillTab(cat.id)}
                    className={'px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ' + (activeSkillTab === cat.id ? 'bg-blue-600/40 border-blue-400 text-blue-300 shadow-sm shadow-blue-500/20' : 'border-slate-600 text-gray-400 hover:border-blue-500/50 hover:text-gray-300 bg-slate-800/30')}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-3">
                {(skillCategories.find(c => c.id === activeSkillTab)?.skills ?? []).map((skill, index) => (
                  <motion.div
                    key={activeSkillTab + skill.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-transform group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                          <skill.icon className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-blue-300 font-medium text-sm">{skill.name}</span>
                      </div>
                      <span className="text-xs text-gray-400 bg-slate-800/50 px-2 py-1 rounded-full">
                        {skill.level}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        key={activeSkillTab + skill.name + '-bar'}
                        initial={{ width: 0 }}
                        animate={{ width: skill.width }}
                        transition={{ delay: index * 0.05 + 0.2, duration: 0.6 }}
                        className={'h-full bg-gradient-to-r ' + skill.color + ' rounded-full'}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-6 p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-500/30"
              >
                <p className="text-sm text-yellow-300 font-medium mb-2">💡 Minha Filosofia:</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "Valorizo a transparência sobre capacidades técnicas e entrego com excelência operacional. 
Cada desafio é abordado com precisão estratégica, garantindo soluções robustas que 
superam expectativas e estabelecem bases para crescimento sustentável.""
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
            {/* Education Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Minha Jornada de Aprendizado
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </motion.div>

          <div className="space-y-8">
            {/* Formação Acadêmica */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 backdrop-blur-sm">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl text-blue-300 mb-3">Graduação em Análise e Desenvolvimento de Sistemas</h3>
                    <p className="text-gray-300 mb-2 text-lg">Uniftec • Analista/Desenvolvedor</p>
                    <span className="text-sm text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
                      Out 2024 - Mar 2027 • Em andamento
                    </span>
                    <p className="text-gray-400 mt-4 leading-relaxed">
                      Tecnologia da informação, Habilidades analíticas, Desenvolvimento de sistemas, 
                      Gestão de projetos e Análise de requisitos.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Certificações */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-to-l from-cyan-900/20 to-purple-900/20 border-cyan-500/30 backdrop-blur-sm">
                <h3 className="text-2xl text-cyan-300 mb-6">Licenças e Certificados</h3>
                <div className="space-y-4">

                  {/* Google Cloud Data Analytics Certificate*/}
<div className="p-6 bg-gradient-to-r from-yellow-600/20 to-green-600/20 rounded-xl border border-yellow-500/30">
  <div className="flex items-start justify-between mb-4">
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-green-500 rounded-lg flex items-center justify-center">
        <BarChart3 className="w-6 h-6 text-white" />
      </div>
      <div>
        <h4 className="text-xl font-bold text-yellow-300">Google Cloud Data Analytics Certificate</h4>
        <p className="text-sm text-green-400">Google Cloud • Especialização Concluída</p>
      </div>
    </div>
    <span className="text-sm text-green-400 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
      ✅ Concluído • Nov 2025
    </span>
  </div>
  
  <p className="text-gray-300 mb-4 leading-relaxed">
    Certificação avançada que prepara para funções de <strong>Cloud Data Analyst</strong>, 
    <strong> Cloud Data Technician</strong> e <strong>Cloud Operations Analyst</strong>. 
    Habilidades em SQL, limpeza de dados, análise, visualização e business intelligence na nuvem.
  </p>
  
  <div className="space-y-4">
    <div>
      <h5 className="text-yellow-300 font-medium mb-2">📊 Stack Técnica Completa:</h5>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <div className="space-y-1">
          <p className="text-xs text-green-300 font-medium">📈 Análise & Processamento</p>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded-full">BigQuery</span>
            <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded-full">Data Analytics</span>
            <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded-full">Data Transformation</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-blue-300 font-medium">🎨 Visualização & BI</p>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">Looker Studio</span>
            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">Data Visualization</span>
            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">Business Intelligence</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-purple-300 font-medium">🏗️ Modelagem & Gestão</p>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">Data Modeling</span>
            <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">Project Management</span>
            <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">SQL</span>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <h5 className="text-green-300 font-medium mb-2">🎯 Carreiras Preparadas:</h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-slate-800/30 rounded-lg border border-yellow-500/20">
          <div className="flex items-center space-x-2 mb-1">
            <BarChart3 className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-300">Cloud Data Analyst</span>
          </div>
          <p className="text-xs text-gray-300">
            Análise de dados na nuvem para tomada de decisões estratégicas
          </p>
        </div>
        <div className="p-3 bg-slate-800/30 rounded-lg border border-green-500/20">
          <div className="flex items-center space-x-2 mb-1">
            <Settings className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-300">Cloud Data Technician</span>
          </div>
          <p className="text-xs text-gray-300">
            Processamento e preparação de dados em ambientes cloud
          </p>
        </div>
        <div className="p-3 bg-slate-800/30 rounded-lg border border-blue-500/20">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Cloud Operations Analyst</span>
          </div>
          <p className="text-xs text-gray-300">
            Otimização de operações e processos de dados na nuvem
          </p>
        </div>
        <div className="p-3 bg-slate-800/30 rounded-lg border border-purple-500/20">
          <div className="flex items-center space-x-2 mb-1">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Business Intelligence</span>
          </div>
          <p className="text-xs text-gray-300">
            Desenvolvimento de dashboards e relatórios estratégicos
          </p>
        </div>
      </div>
    </div>
    
    <div className="pt-4 border-t border-yellow-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400">Reconhecimento Acadêmico:</span>
        </div>
        <div className="flex space-x-2">
          <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded border border-green-500/30">
            ACE - 10 créditos
          </span>
          <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
            5 Cursos
          </span>
          <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
            Google Cloud
          </span>
        </div>
      </div>
    </div>
    
    <div className="flex justify-center pt-2">
      <a 
        href="https://www.credly.com/earner/earned/badge/d28809ac-7497-485e-9b04-d3f7041dd6b6" 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-green-600 text-white text-sm rounded-lg hover:opacity-90 transition"
      >
        Ver Credencial
      </a>
    </div>
  </div>
</div>
                  
                 {/* Google Cloud Computing Foundations Certificate*/}
<div className="p-6 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl border border-blue-500/30">
  <div className="flex items-start justify-between mb-4">
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
        <Cloud className="w-6 h-6 text-white" />
      </div>
      <div>
        <h4 className="text-xl font-bold text-blue-300">Google Cloud Computing Foundations Certificate</h4>
        <p className="text-sm text-cyan-400">Google Cloud • Fundamentos Técnicos Concluídos</p>
      </div>
    </div>
    <span className="text-sm text-cyan-400 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-500/30">
      ✅ Concluído • Nov 2025
    </span>
  </div>
  
  <p className="text-gray-300 mb-4 leading-relaxed">
    Programa que desenvolve <strong>proficiência técnica em cloud computing</strong>, 
    formando base ideal para carreiras em infraestrutura de TI, engenharia cloud e 
    desenvolvimento de aplicações cloud-native.
  </p>
  
  <div className="space-y-4">
    <div>
      <h5 className="text-blue-300 font-medium mb-2">⚙️ Stack Técnica Completa:</h5>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="space-y-1">
          <p className="text-xs text-cyan-300 font-medium">🏗️ Infraestrutura</p>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">Compute Engine</span>
            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">Cloud Storage</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-green-300 font-medium">🔐 Segurança</p>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full">IAM</span>
            <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full">Network Security</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-purple-300 font-medium">📊 Dados & ML</p>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">BigQuery</span>
            <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">Dataproc</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-orange-300 font-medium">🔗 APIs & Dev</p>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-1 text-xs bg-orange-500/20 text-orange-300 rounded-full">APIs</span>
            <span className="px-2 py-1 text-xs bg-orange-500/20 text-orange-300 rounded-full">Cloud Functions</span>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <h5 className="text-cyan-300 font-medium mb-2">🎯 Preparação para Carreiras:</h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-slate-800/30 rounded-lg border border-blue-500/20">
          <div className="flex items-center space-x-2 mb-1">
            <Server className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Cloud Engineer</span>
          </div>
          <p className="text-xs text-gray-300">
            Migração de infraestrutura física para ambientes virtuais
          </p>
        </div>
        <div className="p-3 bg-slate-800/30 rounded-lg border border-green-500/20">
          <div className="flex items-center space-x-2 mb-1">
            <Code className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-300">Software Developer</span>
          </div>
          <p className="text-xs text-gray-300">
            Desenvolvimento de aplicações e otimização de operações
          </p>
        </div>
        <div className="p-3 bg-slate-800/30 rounded-lg border border-purple-500/20">
          <div className="flex items-center space-x-2 mb-1">
            <Settings className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">IT Infrastructure Analyst</span>
          </div>
          <p className="text-xs text-gray-300">
            Gestão de serviços de infraestrutura de TI na nuvem
          </p>
        </div>
        <div className="p-3 bg-slate-800/30 rounded-lg border border-orange-500/20">
          <div className="flex items-center space-x-2 mb-1">
            <Users className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-300">ICT Consultant</span>
          </div>
          <p className="text-xs text-gray-300">
            Consultoria em otimização e implementação de soluções cloud
          </p>
        </div>
      </div>
    </div>
    
    <div className="pt-4 border-t border-cyan-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-400">Pré-requisito para certificações:</span>
        </div>
        <div className="flex space-x-2">
          <span className="px-2 py-1 text-xs bg-gray-500/30 text-gray-300 rounded border border-gray-600">Associate Cloud Engineer</span>
          <span className="px-2 py-1 text-xs bg-gray-500/30 text-gray-300 rounded border border-gray-600">Cloud Cybersecurity</span>
        </div>
      </div>
    </div>
    
    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
      <a 
        href="https://www.credly.com/earner/earned/badge/8b817251-061c-4faa-870b-5d64a28a2884" 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm rounded-lg hover:opacity-90 transition text-center"
      >
        Ver Credencial
      </a>
    </div>
  </div>
</div>
                  
                 {/* Especialização Google Cloud - COMPLETA E PADRONIZADA */}
<div className="p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30">
  <div className="flex items-start justify-between mb-4">
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
        <TrendingUp className="w-6 h-6 text-white" />
      </div>
      <div>
        <h4 className="text-xl font-bold text-purple-300">Especialização Google Cloud</h4>
        <p className="text-sm text-blue-400">Google Cloud • 15+ Certificações Concluídas</p>
      </div>
    </div>
    <span className="text-sm text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
      ✅ Concluído • 2025
    </span>
  </div>
  
  <p className="text-gray-300 mb-4 leading-relaxed">
    Coleção abrangente de <strong>15+ certificações técnicas Google Cloud</strong>, cobrindo desde 
    fundamentos até especializações avançadas em infraestrutura, dados, machine learning e segurança.
  </p>
  
  <div className="space-y-4">
    <div>
      <h5 className="text-purple-300 font-medium mb-2">🏆 Domínios Técnicos Abordados:</h5>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <div className="space-y-1">
          <p className="text-xs text-blue-300 font-medium">🏗️ Infraestrutura</p>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">Compute Engine</span>
            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">Load Balancing</span>
            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">VPC & Network</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-green-300 font-medium">📊 Dados & ML</p>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full">BigQuery</span>
            <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full">Data Pipelines</span>
            <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full">ML APIs</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-cyan-300 font-medium">🔐 Segurança & Ops</p>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full">IAM</span>
            <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full">Network Security</span>
            <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full">Cloud Operations</span>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <h5 className="text-blue-300 font-medium mb-2">🎯 Trilhas de Especialização:</h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-slate-800/30 rounded-lg border border-purple-500/20">
          <div className="flex items-center space-x-2 mb-1">
            <Server className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Infraestrutura Cloud</span>
          </div>
          <p className="text-xs text-gray-300">
            Arquitetura, rede, segurança e otimização de infraestrutura GCP
          </p>
        </div>
        <div className="p-3 bg-slate-800/30 rounded-lg border border-blue-500/20">
          <div className="flex items-center space-x-2 mb-1">
            <Database className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Dados & Analytics</span>
          </div>
          <p className="text-xs text-gray-300">
            Processamento, análise e visualização de dados em escala
          </p>
        </div>
        <div className="p-3 bg-slate-800/30 rounded-lg border border-green-500/20">
          <div className="flex items-center space-x-2 mb-1">
            <Bot className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-300">Machine Learning</span>
          </div>
          <p className="text-xs text-gray-300">
            Modelos de ML, APIs e pipelines de aprendizado automatizado
          </p>
        </div>
        <div className="p-3 bg-slate-800/30 rounded-lg border border-cyan-500/20">
          <div className="flex items-center space-x-2 mb-1">
            <Cloud className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">DevOps & Ops</span>
          </div>
          <p className="text-xs text-gray-300">
            Operações, monitoramento e entrega contínua na nuvem
          </p>
        </div>
      </div>
    </div>
    
    <div className="pt-4 border-t border-purple-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-400">Certificações Incluem:</span>
        </div>
        <div className="flex space-x-2">
          <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">Fundamentos</span>
          <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">Associate</span>
          <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded border border-green-500/30">Professional</span>
        </div>
      </div>
    </div>
    
    <div className="flex justify-center pt-2">
      <Button
        onClick={() => window.open('https://www.credly.com/users/patrick-brando', '_blank')}
        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-lg hover:opacity-90 transition border-0"
      >
        <Eye className="w-4 h-4 mr-2" />
        Ver todas as 15+ certificações no Credly
      </Button>
    </div>
  </div>
</div>
                  
                  {/* Fortinet */}
                  <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg border border-orange-500/20">
                    <div className="w-3 h-3 bg-orange-400 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="text-gray-300 font-medium">Fortinet Fast Track Workshop: Network Security</span>
                      <p className="text-sm text-gray-400 mt-1">Novidades do FortiOS r06 com laboratório prático e Security Fabric</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded-full">Cibersegurança</span>
                        <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded-full">FortiGate</span>
                        <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded-full">Firewalls</span>
                        <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded-full">VPN SSL</span>
                      </div>
                    </div>
                    <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded-full">Out 2025</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

            {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Experiência Profissional
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Card className="p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-colors duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-2xl text-purple-300 mb-2">Desenvolvedor Full-Stack</h3>
                    <p className="text-xl text-gray-300 mb-2">DataCrazy CRM</p>
                    <p className="text-sm text-gray-400 mb-4 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      2026 – Atual • Desenvolvimento de CRM
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                        Desenvolvedor Full-Stack
                      </span>
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">
                        Backend NestJS
                      </span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                        Microsserviços & Kafka
                      </span>
                      <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30">
                        DevOps & Docker
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Atuo como Desenvolvedor Full-Stack no <strong>DataCrazy CRM</strong>, construindo
                      funcionalidades e integrações de alto impacto com <strong>NestJS</strong>, <strong>Next.js</strong>,
                      <strong>PostgreSQL</strong>, <strong>Redis</strong> e <strong>Kafka</strong> em ambiente
                      containerizado com <strong>Docker</strong> no <strong>Ubuntu</strong>.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-lg text-blue-300 font-medium mb-3 flex items-center">
                          <Code className="w-5 h-5 mr-2" />
                          Frontend — Next.js
                        </h4>
                        <div className="space-y-3">
                          {[
                            "Desenvolvimento de interfaces do CRM com Next.js e TypeScript",
                            "Componentização reutilizável com React",
                            "Estilização com TailwindCSS",
                            "Integração com APIs REST do backend NestJS"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span className="text-gray-300 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg text-green-300 font-medium mb-3 flex items-center">
                          <Server className="w-5 h-5 mr-2" />
                          Backend — NestJS
                        </h4>
                        <div className="space-y-3">
                          {[
                            "Construção de APIs RESTful com NestJS e TypeScript",
                            "Modelagem e queries avançadas com PostgreSQL",
                            "Cache e sessões distribuídas com Redis",
                            "Eventos assíncronos e filas com Apache Kafka"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span className="text-gray-300 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-4">
                        <h4 className="text-lg text-orange-300 font-medium mb-3 flex items-center">
                          <Settings className="w-5 h-5 mr-2" />
                          Infra & DevOps
                        </h4>
                        <div className="space-y-3">
                          {[
                            "Containerização de serviços com Docker e Docker Compose",
                            "Ambiente de desenvolvimento em Ubuntu Linux",
                            "Gerenciamento de variáveis de ambiente e secrets",
                            "Monitoramento e troubleshooting de containers"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                              <span className="text-gray-300 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg text-purple-300 font-medium mb-3 flex items-center">
                          <GitBranch className="w-5 h-5 mr-2" />
                          Metodologias & Qualidade
                        </h4>
                        <div className="space-y-3">
                          {[
                            "Git Flow e code review colaborativo",
                            "Scrum e sprints com entregas contínuas",
                            "Documentação de APIs com Swagger/OpenAPI",
                            "Testes e validação de integrações"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                              <span className="text-gray-300 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Arquitetura de Microsserviços */}
                    <div className="mt-6 p-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg border border-indigo-500/30">
                      <h4 className="text-lg text-indigo-300 font-medium mb-4 flex items-center">
                        <Database className="w-5 h-5 mr-2" />
                        Arquitetura & Integrações
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h5 className="text-sm text-indigo-200 font-medium mb-2">⚡ Mensageria & Eventos</h5>
                          <div className="space-y-2">
                            {[
                              "Arquitetura orientada a eventos com Apache Kafka",
                              "Producers e Consumers para comunicação assíncrona",
                              "Cache distribuído e pub/sub com Redis",
                              "Filas de processamento e retry policies",
                              "Integração entre microsserviços desacoplados"
                            ].map((item, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                                <span className="text-gray-300 text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h5 className="text-sm text-indigo-200 font-medium mb-2">🗄️ Dados & Persistência</h5>
                          <div className="space-y-2">
                            {[
                              "Modelagem relacional e queries otimizadas em PostgreSQL",
                              "Migrations e versionamento de schema",
                              "ORM com TypeORM / Prisma no NestJS",
                              "Estratégias de indexação para alta performance",
                              "Backup e consistência de dados em produção"
                            ].map((item, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                                <span className="text-gray-300 text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stack Tecnológica & Competências */}
                    <div className="mt-6 p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30">
                      <h4 className="text-lg text-purple-300 font-medium mb-4 flex items-center">
                        <Settings className="w-5 h-5 mr-2" />
                        Stack Tecnológica & Competências
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h5 className="text-sm text-blue-300 font-medium mb-2">🌐 Frontend</h5>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Next.js", "React", "TypeScript", "JavaScript",
                              "Tailwind CSS", "HTML/CSS"
                            ].map((skill, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h5 className="text-sm text-green-300 font-medium mb-2">⚙️ Backend</h5>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "NestJS", "Node.js", "TypeScript", "REST APIs",
                              "Swagger / OpenAPI", "Python"
                            ].map((skill, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mt-4">
                        <div className="space-y-4">
                          <h5 className="text-sm text-orange-300 font-medium mb-2">🗄️ Dados & Mensageria</h5>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "PostgreSQL", "Redis", "Apache Kafka",
                              "TypeORM", "SQL"
                            ].map((skill, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h5 className="text-sm text-cyan-300 font-medium mb-2">🐧 Infra & DevOps</h5>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Docker", "Docker Compose", "Ubuntu Linux",
                              "Git", "GitHub", "Scrum / Kanban"
                            ].map((skill, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Experience jornada */}
<section id="timeline" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/50 to-blue-950/30">
  <div className="max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-8 sm:mb-12 lg:mb-16"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        Minha Jornada
      </h2>
      <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
        Da descoberta da tecnologia às conquistas profissionais
      </p>
      <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 sm:mt-6"></div>
    </motion.div>

    {/* Timeline para mobile */}
    <div className="md:hidden">
      <div className="relative pl-8">
        {/* Linha vertical para mobile */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/20 via-blue-500/40 to-purple-500/20"></div>
        
        <div className="space-y-6">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Ponto na linha */}
              <div className="absolute left-[-28px] top-6">
                <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white bg-gradient-to-r ${item.color} shadow-lg`}></div>
              </div>

              {/* Card */}
              <Card className={`p-4 sm:p-5 bg-gradient-to-br ${item.color}/20 border-l-4 border-${item.color.split('-')[1]}-500/50 backdrop-blur-sm`}>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xl sm:text-2xl font-bold text-gray-200">{item.year}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${
                        item.status === "Concluído" 
                          ? "bg-green-500/20 text-green-400 border-green-500/30" 
                          : item.status === "Em andamento" 
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl text-gray-100 mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300 mb-3">{item.description}</p>
                    <div className="space-y-1">
                      {item.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5"></div>
                          <span className="text-xs sm:text-sm text-gray-400 flex-1">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Timeline para desktop */}
    <div className="hidden md:block relative">
      {/* Linha central */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-500/20 via-blue-500/40 to-purple-500/20"></div>
      
      <div className="space-y-8 lg:space-y-12">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            {/* Conteúdo */}
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-6 lg:pr-12' : 'pl-6 lg:pl-12'}`}>
              <Card className={`p-5 lg:p-6 bg-gradient-to-br ${item.color}/20 border-${item.color.split('-')[1]}-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-xl lg:text-2xl font-bold text-gray-200">{item.year}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${
  item.status === "Concluído" 
    ? "bg-green-500/20 text-green-400 border-green-500/30" 
    : item.status === "Em andamento" 
    ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
    : "bg-purple-500/20 text-purple-400 border-purple-500/30"
}`}>
  {item.status}
</span>
                    </div>
                    <h3 className="text-lg lg:text-xl text-gray-100 mb-2">{item.title}</h3>
                    <p className="text-sm lg:text-base text-gray-300 mb-3 lg:mb-4">{item.description}</p>
                    <div className="space-y-1 lg:space-y-2">
                      {item.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                          <span className="text-xs lg:text-sm text-gray-400">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Ponto na linha */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className={`w-4 h-4 lg:w-6 lg:h-6 rounded-full border-2 lg:border-4 border-white bg-gradient-to-r ${item.color} shadow-lg`}></div>
            </div>

            {/* Espaço vazio */}
            <div className="w-1/2"></div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Call to Action no final */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mt-8 sm:mt-12 lg:mt-16"
    >
      <Card className="p-6 sm:p-8 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-500/20 backdrop-blur-sm max-w-2xl mx-auto">
        <h3 className="text-xl sm:text-2xl text-cyan-300 mb-3 sm:mb-4">Próxima Parada: Sua Empresa?</h3>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
          Estou pronto para minha próxima oportunidade profissional. Vamos construir algo incrível juntos?
        </p>
        <Button
          size="sm"
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 border-0 text-sm sm:text-base"
          onClick={() => scrollToSection('contact')}
        >
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Vamos Conversar
        </Button>
      </Card>
    </motion.div>
  </div>
</section>

      {/* Projects Section */}
<section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/50 to-blue-900/20">
  <div className="max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-8 sm:mb-12 lg:mb-16"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
        Projetos em Destaque
      </h2>
      <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto px-4">
        Do conceito à implementação: soluções reais para desafios reais
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
      
      {/* AssetWise - Projeto Destaque */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="md:col-span-2"
      >
        <Card className="bg-gradient-to-br from-blue-600/20 to-green-600/20 border-blue-500/30 backdrop-blur-sm overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300">
          <div className="flex flex-col lg:flex-row">
            {/* Conteúdo */}
            <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-xs sm:text-sm font-medium">PROJETO DESTAQUE</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl text-blue-300 mb-3 sm:mb-4">AssetWise</h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                  Sistema completo de gestão de ativos de TI desenvolvido para empresa real.
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                  <span className="px-2 py-1 text-xs sm:text-sm bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">Next.js</span>
                  <span className="px-2 py-1 text-xs sm:text-sm bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">TypeScript</span>
                  <span className="px-2 py-1 text-xs sm:text-sm bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">Firebase</span>
                  <span className="px-2 py-1 text-xs sm:text-sm bg-green-500/20 text-green-300 rounded-full border border-green-500/30">Google AI</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button 
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 border-0 text-xs sm:text-sm"
                  onClick={() => openProjectModal('assetwise')}
                >
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Ver Detalhes
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 text-xs sm:text-sm"
                  onClick={() => toast.info('Projeto desenvolvido para empresa específica')}
                >
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Código Privado
                </Button>
              </div>
            </div>
            
            {/* Imagem/Ícone */}
            <div className="lg:w-1/2 bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center p-4 sm:p-6 lg:p-8 order-first lg:order-last">
              <div className="text-center">
                <Server className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white mb-2 sm:mb-4 mx-auto" />
                <p className="text-white/80 text-xs sm:text-sm">Dashboard de Gestão</p>
                <p className="text-white/60 text-xs mt-1">Sistema empresarial</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Projetos menores - Grid 2x2 */}
      {[
        {
          id: 'fluxfinance',
          title: 'Flux Finance',
          description: 'Plataforma multi-usuário para gestão financeira pessoal com insights inteligentes.',
          icon: TrendingUp,
          color: 'from-green-500 to-teal-500',
          bgColor: 'from-green-600/20 to-teal-600/20',
          borderColor: 'border-green-500/30',
          tags: ['Next.js', 'Firebase', 'TypeScript', 'Multi-usuário'],
          github: 'https://github.com/patrick-git-bite/Flux-Finance'
        },
        {
          id: 'rpa',
          title: 'Automação RPA',
          description: 'Sistema que automatiza baixa de documentos via e-mail com Python e UiPath.',
          icon: Bot,
          color: 'from-blue-500 to-cyan-500',
          bgColor: 'from-blue-600/20 to-cyan-600/20',
          borderColor: 'border-blue-500/30',
          tags: ['Python', 'UiPath', 'Automação', 'Outlook'],
          github: 'https://github.com/patrick-git-bite/RPA'
        },
        {
          id: 'analise',
          title: 'Análise Financeira',
          description: 'Ferramenta para análise comparativa de dados financeiros entre períodos.',
          icon: BarChart3,
          color: 'from-orange-500 to-red-500',
          bgColor: 'from-orange-600/20 to-red-600/20',
          borderColor: 'border-orange-500/30',
          tags: ['Python', 'Pandas', 'Matplotlib', 'Data Analysis'],
          github: 'https://github.com/patrick-git-bite/Analise-financeiro'
        }
      ].map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + (index * 0.1) }}
        >
          <Card className={`bg-gradient-to-br ${project.bgColor} ${project.borderColor} backdrop-blur-sm overflow-hidden group cursor-pointer h-full flex flex-col hover:scale-105 transition-transform duration-300`}>
            {/* Cabeçalho com cor */}
            <div className={`h-32 sm:h-40 bg-gradient-to-r ${project.color} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <project.icon className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
            </div>
            
            {/* Conteúdo */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              <h3 className="text-lg sm:text-xl text-white mb-2 sm:mb-3">{project.title}</h3>
              <p className="text-sm text-gray-300 mb-3 sm:mb-4 flex-1">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs bg-black/20 text-white/80 rounded-full border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2 mt-auto">
                <Button 
                  size="sm"
                  className="flex-1 bg-white/10 hover:bg-white/20 border-0 text-xs sm:text-sm"
                  onClick={() => openProjectModal(project.id)}
                >
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Detalhes
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="flex-1 border-white/30 text-white hover:bg-white/10 text-xs sm:text-sm"
                  onClick={() => window.open(project.github, '_blank')}
                >
                  <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Código
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* Project Modals - Refatorado para Responsividade */}
{selectedProject && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    // Fundo fixo e com efeito, ocupa toda a tela
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    onClick={closeProjectModal}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      // Tamanho Responsivo: max-w-xl (mobile) -> max-w-6xl (desktop)
      className="bg-slate-900 rounded-2xl border border-blue-500/30 max-w-xl lg:max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Padding Responsivo: p-4 (mobile) -> md:p-8 (desktop) */}
      <div className="p-4 md:p-8">
        
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-start mb-6">
          {/* Título - Text-xl (mobile) -> text-2xl (desktop) */}
          <h3 className="text-xl md:text-2xl text-blue-300 pr-4"> 
            {/* O PR-4 é para evitar que o título encoste no botão de fechar no mobile */}
            {selectedProject === 'assetwise' && 'AssetWise - Sistema de Gestão de Ativos de TI'}
            {selectedProject === 'fluxfinance' && 'Flux Finance - Plataforma Financeira Multi-usuário'}
            {selectedProject === 'rpa' && 'Automação RPA - Sistema de Processos Automatizados'}
            {selectedProject === 'analise' && 'Sistema de Análise Financeira Comparativa'}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={closeProjectModal}
            className="text-gray-400 hover:text-white flex-shrink-0" // flex-shrink-0 evita que o botão diminua
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
        
        {/* Conteúdo do Projeto */}
        <div className="space-y-8"> 
        {/* Aumentei o espaçamento entre as seções para mobile (space-y-8) */}

          {/* === AssetWise === */}
          {selectedProject === 'assetwise' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl md:text-2xl text-green-300 mb-3">AssetWise - Sistema de Gestão de Ativos de TI</h4>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base">
                  Sistema completo desenvolvido para gestão de ativos de TI em empresa real. 
                  Inclui dashboard intuitivo, controle de ativos, histórico de movimentações, 
                  diagnóstico por IA integrada e relatórios automáticos.
                </p>
              </div>

              {/* Dashboard */}
              <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <h5 className="text-lg text-blue-300">Dashboard Principal</h5>
                </div>
                
                {/* GRID RESPONSIVO: Padrão 1 coluna (mobile), 2 colunas (desktop/lg) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  
                  {/* Imagem em cima no Mobile */}
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <img 
                      src="/projects/assetwise/dashboard.jpg" 
                      alt="Dashboard Principal do AssetWise"
                      className="w-full h-48 md:h-64 object-cover rounded-lg" // Altura ajustada para mobile (h-48)
                    />
                  </div>
                  
                  {/* Descrição em baixo no Mobile */}
                  <div className="space-y-4">
                    <div>
                      <h6 className="text-green-300 font-medium mb-2">📊 Arquitetura</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Server-side rendering com Next.js 14</li>
                        <li>• Zustand para gerenciamento de estado</li>
                        <li>• React Query para cache em tempo real</li>
                        <li>• Recharts com dados do Firestore</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* IA Integration */}
              <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 border border-green-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <h5 className="text-lg text-green-300">Diagnóstico por IA</h5>
                </div>
                
                {/* GRID RESPONSIVO: Padrão 1 coluna (mobile), 2 colunas (desktop/lg) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  
                  {/* Imagem em cima no Mobile */}
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <img 
                      src="/projects/assetwise/diagnostico-ia.jpg" 
                      alt="Diagnóstico IA AssetWise"
                      className="w-full h-48 md:h-64 object-cover rounded-lg" // Altura ajustada para mobile (h-48)
                    />
                  </div>
                  
                  {/* Descrição em baixo no Mobile */}
                  <div className="space-y-4">
                    <div>
                      <h6 className="text-green-300 font-medium mb-2">🤖 Google AI Gemini</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Gemini Pro 1.5 com 128K context</li>
                        <li>• Prompt engineering para diagnósticos</li>
                        <li>• Content filtering nativo</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* === Flux Finance === */}
          {selectedProject === 'fluxfinance' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl md:text-2xl text-green-300 mb-3">Flux Finance - Plataforma Financeira Multi-usuário</h4>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base">
                  Plataforma completa para gestão financeira pessoal com autenticação multi-usuário, 
                  categorização automática de transações, análise de investimentos e insights de mercado.
                </p>
              </div>

              {/* Dashboard */}
              <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 border border-green-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <h5 className="text-lg text-green-300">Dashboard Financeiro</h5>
                </div>
                
                {/* GRID RESPONSIVO: Padrão 1 coluna (mobile), 2 colunas (desktop/lg) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <img 
                      src="/projects/fluxfinance/painel.jpg"
                      alt="Dashboard Flux Finance"
                      className="w-full h-48 md:h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h6 className="text-green-300 font-medium mb-2">💾 Multi-usuário</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Firebase Authentication</li>
                        <li>• Firestore com regras de segurança</li>
                        <li>• Isolamento de dados por usuário</li>
                        <li>• Dashboard personalizado</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transações */}
              <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <h5 className="text-lg text-blue-300">Gestão de Transações</h5>
                </div>
                
                {/* GRID RESPONSIVO: Padrão 1 coluna (mobile), 2 colunas (desktop/lg) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <img 
                      src="/projects/fluxfinance/transacoes.jpg"
                      alt="Transações Flux Finance"
                      className="w-full h-48 md:h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h6 className="text-blue-300 font-medium mb-2">💳 Sistema de Transações</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Validação com Zod</li>
                        <li>• CRUD otimizado</li>
                        <li>• Filtros em tempo real</li>
                        <li>• Categorização automática</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insights - NOVA SEÇÃO */}
              <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <h5 className="text-lg text-purple-300">Insights Inteligentes</h5>
                </div>
                
                {/* GRID RESPONSIVO: Padrão 1 coluna (mobile), 2 colunas (desktop/lg) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <img 
                      src="/projects/fluxfinance/insights.jpg"
                      alt="Insights Flux Finance"
                      className="w-full h-48 md:h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h6 className="text-purple-300 font-medium mb-2">📈 Análises Avançadas</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Gráficos interativos</li>
                        <li>• Tendências de gastos</li>
                        <li>• Metas financeiras</li>
                        <li>• Relatórios personalizados</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Análise de Mercado - NOVA SEÇÃO */}
              <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 border border-orange-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <h5 className="text-lg text-orange-300">Análise de Mercado</h5>
                </div>
                
                {/* GRID RESPONSIVO: Padrão 2 colunas (mobile) para imagens menores */}
                <div className="grid grid-cols-2 gap-4 mb-6"> 
                  <div className="bg-slate-900 rounded-lg p-2 md:p-4 border border-slate-700">
                    <img 
                      src="/projects/fluxfinance/mercado-1.jpg"
                      alt="Análise de Mercado 1"
                      className="w-full h-24 md:h-48 object-cover rounded-lg" // Altura menor para caber duas em mobile
                    />
                  </div>
                  <div className="bg-slate-900 rounded-lg p-2 md:p-4 border border-slate-700">
                    <img 
                      src="/projects/fluxfinance/mercado-2.jpg"
                      alt="Análise de Mercado 2"
                      className="w-full h-24 md:h-48 object-cover rounded-lg" // Altura menor para caber duas em mobile
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h6 className="text-orange-300 font-medium mb-2">📊 Investimentos & Mercado</h6>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Acompanhamento de ações</li>
                      <li>• Análise de portfólio</li>
                      <li>• Comparativos de mercado</li>
                      <li>• Projeções financeiras</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* === RPA - COMPLETO AGORA === */}
          {selectedProject === 'rpa' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl md:text-2xl text-blue-300 mb-3">Automação RPA - Sistema de Processos Automatizados</h4>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base">
                  Sistema completo de automação robótica de processos que monitora caixa de e-mails, 
                  extrai dados de documentos e integra com ERP corporativo via UiPath, eliminando 
                  processos manuais repetitivos.
                </p>
              </div>

              {/* Arquitetura do Sistema */}
              <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <h5 className="text-lg text-blue-300">Arquitetura do Sistema RPA</h5>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h6 className="text-green-300 font-medium mb-3">🔧 Stack Técnica Completa</h6>
                    {/* GRID RESPONSIVO: Padrão 1 coluna (mobile), 2 colunas (desktop/md) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-blue-300 font-medium mb-2">Python Backend</p>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• <strong>win32com:</strong> Integração nativa com Outlook</li>
                          <li>• <strong>Pandas:</strong> Processamento de dados extraídos</li>
                          <li>• <strong>OpenPyXL:</strong> Geração de planilhas Excel</li>
                          <li>• <strong>Regex:</strong> Extração inteligente de dados</li>
                          <li>• <strong>SMTPLib:</strong> Envio de e-mails automáticos</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-orange-300 font-medium mb-2">UiPath Automation</p>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• <strong>Studio 2022.10:</strong> Versão enterprise</li>
                          <li>• <strong>Orchestrator:</strong> Gestão centralizada de processos</li>
                          <li>• <strong>Excel Activities:</strong> Manipulação de planilhas</li>
                          <li>• <strong>UI Automation:</strong> Integração com ERP Teknisa</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h6 className="text-cyan-300 font-medium mb-3">⚙️ Fluxo de Processamento</h6>
                    <div className="space-y-3">
                      {/* O layout de passos já é bom para mobile, mantido */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-blue-300 font-medium">Monitoramento de E-mails</p>
                          <p className="text-gray-300 text-sm">Script Python monitora caixa de entrada continuamente, filtrando por assunto "Baixa de AF" e marcando como lido</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-green-300 font-medium">Extração de Dados</p>
                          <p className="text-gray-300 text-sm">Regex identifica número do restaurante e lista de AFs, valida formato e salva em dados_af.xlsx</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">3</span>
                        </div>
                        <div>
                          <p className="text-orange-300 font-medium">Execução UiPath</p>
                          <p className="text-gray-300 text-sm">Batch file aciona robot que lê planilha, acessa ERP Teknisa e executa baixa automática</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">4</span>
                        </div>
                        <div>
                          <p className="text-purple-300 font-medium">Confirmação</p>
                          <p className="text-gray-300 text-sm">Sistema responde e-mail automaticamente com "Baixa Ok!" e registra log completo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefícios e Métricas */}
              {/* GRID RESPONSIVO: Padrão 1 coluna (mobile), 2 colunas (desktop/md) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h6 className="text-lg text-green-300 font-medium">📊 Métricas de Performance</h6>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-gray-300">Tempo de Processamento</span>
                      <span className="text-green-300 font-bold">45s</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-gray-300">Processos/Dia</span>
                      <span className="text-blue-300 font-bold">50-70</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-gray-300">Redução de Erros</span>
                      <span className="text-cyan-300 font-bold">98%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-gray-300">Economia de Tempo</span>
                      <span className="text-orange-300 font-bold">6h/dia</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h6 className="text-lg text-blue-300 font-medium">🛡️ Sistema de Tratamento de Erros</h6>
                  {/* O layout de lista já é bom para mobile, mantido */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Retry automático em falhas de conexão com ERP</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Validação de formato de e-mail e dados</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Logging detalhado para auditoria</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">Notificação em caso de falha crítica</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stack Técnica */}
              <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 border border-green-500/20">
                <h6 className="text-lg text-green-300 font-medium mb-4">🛠️ Stack Técnica Completa</h6>
                {/* flex-wrap garante que as tags quebrem em mobile */}
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 md:px-4 md:py-2 text-sm bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Python 3.10
                  </span>
                  <span className="px-3 py-1 md:px-4 md:py-2 text-sm bg-orange-500/20 text-orange-300 rounded-lg border border-orange-500/30 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    UiPath Studio
                  </span>
                  <span className="px-3 py-1 md:px-4 md:py-2 text-sm bg-green-500/20 text-green-300 rounded-lg border border-green-500/30 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Outlook API
                  </span>
                  <span className="px-3 py-1 md:px-4 md:py-2 text-sm bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Windows COM
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* === ANÁLISE FINANCEIRA - COMPLETO AGORA === */}
          {selectedProject === 'analise' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl md:text-2xl text-orange-300 mb-3">Sistema de Análise Financeira Comparativa</h4>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base">
                  Ferramenta avançada em Python para análise comparativa de dados financeiros entre períodos, 
                  com geração automática de relatórios em Excel e PDF, gráficos interativos e estatísticas detalhadas.
                </p>
              </div>

              {/* Arquitetura do Sistema */}
              <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 border border-orange-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <h5 className="text-lg text-orange-300">Arquitetura Modular Avançada</h5>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h6 className="text-green-300 font-medium mb-3">🏗️ Estrutura de Módulos</h6>
                    {/* GRID RESPONSIVO: Padrão 1 coluna (mobile), 2 colunas (desktop/md) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-blue-300 font-medium mb-2">Core Modules</p>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• <strong>data_processor.py:</strong> Limpeza e validação de dados</li>
                          <li>• <strong>chart_generator.py:</strong> Geração de visualizações</li>
                          <li>• <strong>report_builder.py:</strong> Criação de relatórios Excel/PDF</li>
                          <li>• <strong>statistical_analysis.py:</strong> Análises estatísticas</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-purple-300 font-medium mb-2">Support Modules</p>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• <strong>config.py:</strong> Configurações centralizadas</li>
                          <li>• <strong>utils.py:</strong> Funções utilitárias e helpers</li>
                          <li>• <strong>validators.py:</strong> Validação de dados de entrada</li>
                          <li>• <strong>logger.py:</strong> Sistema de logging estruturado</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h6 className="text-cyan-300 font-medium mb-3">📈 Pipeline de Processamento</h6>
                    {/* O layout de passos já é bom para mobile, mantido */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-blue-300 font-medium">Extração e Validação</p>
                          <p className="text-gray-300 text-sm">Leitura de arquivos Excel, validação de schema, tratamento de missing values e normalização de dados</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-green-300 font-medium">Análise Comparativa</p>
                          <p className="text-gray-300 text-sm">Cálculo de variações absolutas e percentuais, classificação por categorias, análise de tendências</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">3</span>
                        </div>
                        <div>
                          <p className="text-orange-300 font-medium">Geração de Visualizações</p>
                          <p className="text-gray-300 text-sm">Criação de gráficos comparativos, heatmaps, box plots e análise de correlações</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">4</span>
                        </div>
                        <div>
                          <p className="text-purple-300 font-medium">Exportação de Relatórios</p>
                          <p className="text-gray-300 text-sm">Geração de Excel multi-aba e PDF com layout profissional, incluindo insights automáticos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Funcionalidades Avançadas */}
              {/* GRID RESPONSIVO: Padrão 1 coluna (mobile), 2 colunas (desktop/md) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h6 className="text-lg text-green-300 font-medium">📊 Análises Estatísticas</h6>
                  {/* O layout de blocos já é bom para mobile, mantido */}
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <p className="text-green-300 font-medium mb-1">Análise de Variações</p>
                      <p className="text-gray-300 text-sm">Classificação automática em: Alto Crescimento, Crescimento Moderado, Estável, Declínio Moderado, Alto Declínio</p>
                    </div>
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <p className="text-blue-300 font-medium mb-1">Correlações</p>
                      <p className="text-gray-300 text-sm">Matriz de correlação entre diferentes métricas financeiras</p>
                    </div>
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <p className="text-purple-300 font-medium mb-1">Tendências</p>
                      <p className="text-gray-300 text-sm">Análise de sazonalidade e projeções baseadas em histórico</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h6 className="text-lg text-blue-300 font-medium">🛠️ Stack Técnica</h6>
                  {/* flex-wrap garante que as tags quebrem em mobile */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 md:px-3 md:py-2 text-sm bg-orange-500/20 text-orange-300 rounded-lg border border-orange-500/30 flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      Python 3.10
                    </span>
                    <span className="px-3 py-1 md:px-3 md:py-2 text-sm bg-green-500/20 text-green-300 rounded-lg border border-green-500/30 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Pandas
                    </span>
                    <span className="px-3 py-1 md:px-3 md:py-2 text-sm bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Matplotlib
                    </span>
                    <span className="px-3 py-1 md:px-3 md:py-2 text-sm bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      Seaborn
                    </span>
                    <span className="px-3 py-1 md:px-3 md:py-2 text-sm bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      OpenPyXL
                    </span>
                  </div>
                </div>
              </div>

              {/* Métricas de Performance */}
              <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 border border-cyan-500/20">
                <h6 className="text-lg text-cyan-300 font-medium mb-4">⚡ Performance do Sistema</h6>
                {/* GRID RESPONSIVO: Padrão 2 colunas (mobile), 4 colunas (desktop/md) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> 
                  <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                    <p className="text-cyan-300 text-xl md:text-2xl font-bold">2.3s</p>
                    <p className="text-gray-400 text-xs md:text-sm">Processamento</p>
                  </div>
                  <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                    <p className="text-green-300 text-xl md:text-2xl font-bold">15+</p>
                    <p className="text-gray-400 text-xs md:text-sm">Tipos de Gráficos</p>
                  </div>
                  <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                    <p className="text-blue-300 text-xl md:text-2xl font-bold">99.8%</p>
                    <p className="text-gray-400 text-xs md:text-sm">Precisão</p>
                  </div>
                  <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                    <p className="text-purple-300 text-xl md:text-2xl font-bold">3</p>
                    <p className="text-gray-400 text-xs md:text-sm">Formatos Export</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
)}

      {/* Services Section */}
<section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/50 to-transparent">
  <div className="max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Como Posso Te Ajudar Hoje
      </h2>
      <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
        Como estudante em constante evolução, ofereço soluções práticas e acessíveis. 
        Aprendo com cada projeto e entrego com muita dedicação e transparência.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`p-6 h-full bg-gradient-to-br ${service.gradient} ${service.borderColor} border backdrop-blur-sm hover:scale-105 transition-all duration-300 group cursor-pointer`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl text-blue-300 font-medium">{service.title}</h3>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              {service.description}
            </p>
            
            <div className="space-y-2">
              <h4 className="text-sm text-gray-400 uppercase tracking-wide font-medium mb-3">
                O que inclui:
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="px-3 py-1 text-sm bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full border border-purple-500/30 text-purple-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mt-12"
    >
      <Card className="p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20 backdrop-blur-sm max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Users className="w-8 h-8 text-blue-400" />
          <h3 className="text-2xl text-blue-300">Vamos Crescer Juntos?</h3>
          <Users className="w-8 h-8 text-blue-400" />
        </div>
        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
          Estou construindo minha carreira com honestidade e dedicação. 
          Cada projeto é uma oportunidade de aprender e fazer a diferença, 
          com preços justos e muita transparência.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25"
            onClick={() => scrollToSection('contact')}
          >
            <Heart className="mr-2 h-5 w-5" />
            Vamos Conversar
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
            onClick={() => {
              const subject = encodeURIComponent("Orçamento Gratuito - Projeto");
              const body = encodeURIComponent(`Olá Patrick! Gostaria de solicitar um orçamento gratuito para o seguinte projeto:\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📋 INFORMAÇÕES DO PROJETO:\n\n• Tipo de projeto: [Site, App, Automação, Dashboard, API...]\n• Descrição breve: [Descreva sua ideia em 2-3 frases]\n• Público-alvo: [Quem vai usar?]\n\n⏰ PRAZOS E ORÇAMENTO:\n\n• Prazo desejado: [Ex: 2 semanas, 1 mês...]\n• Orçamento disponível: [Opcional - ajuda a definir o escopo]\n• Urgência: [Baixa / Média / Alta]\n\n🎯 FUNCIONALIDADES DESEJADAS:\n\n• [ ] \n• [ ] \n• [ ] \n\n💬 OBSERVAÇÕES ADICIONAIS:\n\n[Qualquer outra informação relevante]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nAguardo seu retorno! 🚀`);
              window.location.href = `mailto:patrickbrando18102003@gmail.com?subject=${subject}&body=${body}`;
            }}
          >
            <Coffee className="mr-2 h-5 w-5" />
            Orçamento Gratuito
          </Button>
        </div>
      </Card>
    </motion.div>
  </div>
</section>

      {/* CV / Resume Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 md:p-12 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30 backdrop-blur-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <FileText className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Currículo
              </h3>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Quer conhecer minha trajetória completa? Visualize ou baixe meu currículo atualizado.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/projects/Patrick_Brando_CV_EN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-lg transition-all duration-200"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  Visualizar CV
                </a>
                <a
                  href="/projects/Patrick_Brando_CV_EN.pdf"
                  download="Patrick_Brando_CV.pdf"
                  className="inline-flex items-center justify-center px-6 py-3 border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 font-medium rounded-lg transition-all duration-200"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Download PDF
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Vamos Bater um Papo?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Tem uma ideia, um projeto pequeno ou simplesmente precisa de ajuda com tecnologia? 
              Ficarei feliz em conversar e ver como posso te ajudar!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-to-br from-slate-800/50 to-purple-900/20 border-purple-500/20 backdrop-blur-sm">
                <h3 className="text-2xl mb-8 text-gray-200">Formas de Contato</h3>
                <div className="space-y-8">
                  <a
                    href="mailto:patrickbrando18102003@gmail.com"
                    className="flex items-center space-x-6 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wide">Email</p>
                      <p className="text-lg">patrickbrando18102003@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/qr/GQUG62M2EH6RD1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-6 text-gray-300 hover:text-green-400 transition-colors group"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-green-600/30 to-blue-600/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wide">WhatsApp</p>
                      <p className="text-lg">Resposta rápida garantida!</p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/patrick-git-bite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-6 text-gray-300 hover:text-gray-100 transition-colors group"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-gray-600/30 to-purple-600/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Github className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wide">GitHub</p>
                      <p className="text-lg">Veja meus projetos</p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/patrick-brando"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-6 text-gray-300 hover:text-blue-500 transition-colors group"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Linkedin className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wide">LinkedIn</p>
                      <p className="text-lg">Vamos nos conectar</p>
                    </div>
                  </a>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-to-bl from-blue-900/20 to-purple-900/20 border-blue-500/20 backdrop-blur-sm">
                <h3 className="text-2xl mb-8 text-gray-200">Me Conte Sua Ideia</h3>
                
                {/* Formulário de Contato Corrigido */}
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Seu nome</label>
                    <Input
                      name="name" // Adicionado para conectar ao estado
                      value={formData.name} // Conecta o valor do input ao estado
                      onChange={handleFormChange} // Atualiza o estado ao digitar
                      placeholder="Como posso te chamar?"
                      required
                      className="bg-slate-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Seu email</label>
                    <Input
                      type="email"
                      name="email" // Adicionado para conectar ao estado
                      value={formData.email} // Conecta o valor do input ao estado
                      onChange={handleFormChange} // Atualiza o estado ao digitar
                      placeholder="seu.email@gmail.com"
                      required
                      className="bg-slate-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Conte sua ideia ou necessidade</label>
                    <Textarea
                      name="message" // Adicionado para conectar ao estado
                      value={formData.message} // Conecta o valor do input ao estado
                      onChange={handleFormChange} // Atualiza o estado ao digitar
                      placeholder="Qual é seu projeto? Precisa de ajuda com o quê? Não importa se é algo simples, vamos conversar!"
                      required
                      rows={5}
                      className="bg-slate-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 h-12 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <><span className="animate-spin mr-2">⏳</span> Enviando...</>
                    ) : (
                      <><Send className="mr-2 h-5 w-5" /> Enviar Mensagem</>
                    )}
                  </Button>

                  {/* Status feedback */}
                  {formStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <p className="text-sm text-green-300">Mensagem enviada com sucesso! Responderei em até 24h.</p>
                    </motion.div>
                  )}
                  {formStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                    >
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <p className="text-sm text-red-300">Falha ao enviar. Tente novamente ou me contate pelo WhatsApp.</p>
                    </motion.div>
                  )}
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-950/50 backdrop-blur-sm border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Patrick Brando
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Desenvolvedor em crescimento, apaixonado por ajudar pequenos negócios e pessoas a 
              resolverem seus problemas com tecnologia. Sempre disposto a aprender e evoluir!
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">© 2026 Patrick Brando. Evoluindo e Aprendendo.</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {[
                { id: 'home', label: 'Início' },
                { id: 'about', label: 'Sobre' },
                { id: 'education', label: 'Formação' },
                { id: 'experience', label: 'Experiência' },
                { id: 'timeline', label: 'Jornada' },
                { id: 'projects', label: 'Projetos' },
                { id: 'services', label: 'Serviços' },
                { id: 'contact', label: 'Contato' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}