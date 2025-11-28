import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { 
  Mail, Phone, Github, Linkedin, Menu, X, Calendar, MapPin, 
  Bot, BarChart3, Code, Monitor, Cloud, Gamepad2, Zap, 
  TrendingUp, Globe, Settings, Sparkles, Heart, Users, 
  Coffee, Database, Server, Target, Clock, FileText, GitBranch, Eye, Lock, GraduationCap  
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
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

 const openProjectModal = (project: string) => {
  setSelectedProject(project);
};

const closeProjectModal = () => {
  setSelectedProject(null);
};
  // --- INÍCIO DA LÓGICA DO FORMULÁRIO ---
  // Estados para guardar os dados do formulário e o status de envio.
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para atualizar o estado conforme o usuário digita.
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função que envia os dados para a API quando o formulário é submetido.
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Previne envios duplicados

    setIsSubmitting(true);
    toast.info('Enviando sua mensagem...');

    try {
      const res = await fetch("/api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        setFormData({ name: '', email: '', message: '' }); // Limpa o formulário
      } else {
        const data = await res.json();
        toast.error(`Erro ao enviar: ${data.message || 'Tente novamente.'}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Ocorreu um erro de conexão. Verifique sua internet.");
    } finally {
      setIsSubmitting(false); // Reabilita o botão
    }
  };

  
  // --- FIM DA LÓGICA DO FORMULÁRIO ---

  // SUBSTITUA o useEffect por esta versão mais limpa:
useEffect(() => {
  const handleScroll = () => {
    const sections = ['home', 'about', 'education', 'experience', 'timeline', 'services', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
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
    border: "border border-blue-500/30"
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

const timelineData = [
  { 
    year: "2024", 
    title: "Início da Graduação", 
    description: "Análise e Desenvolvimento de Sistemas - Uniftec",
    icon: Calendar,
    color: "from-blue-500 to-cyan-500",
    achievements: ["Primeiros contatos com programação", "Fundamentos de algoritmos"]
  },
  { 
    year: "2025", 
    title: "Primeira Experiência Profissional", 
    description: "Analista/Suporte de TI - Detella Restaurantes",
    icon: Target,
    color: "from-green-500 to-teal-500",
    achievements: ["Automação de processos", "Desenvolvimento full-stack", "Gestão de infraestrutura"]
  },
  { 
    year: "2025", 
    title: "Certificação Google Cloud", 
    description: "Google Cloud Computing Foundations",
    icon: Cloud,
    color: "from-purple-500 to-pink-500",
    achievements: ["Fundamentos de cloud computing", "Infraestrutura Google Cloud"]
  },
  { 
    year: "2025", 
    title: "Especialização em Cloud", 
    description: "15+ Certificações Google Cloud",
    icon: TrendingUp,
    color: "from-orange-500 to-red-500",
    achievements: ["Infraestrutura & Rede", "Dados & Machine Learning"]
  },
  { 
    year: "2026", 
    title: "Meta: Data Analytics", 
    description: "Google Cloud Data Analytics Certificate",
    icon: BarChart3,
    color: "from-yellow-500 to-green-500",
    achievements: ["BigQuery", "Data Visualization", "Análise de Big Data"]
  },
  { 
    year: "2027", 
    title: "Conclusão da Graduação", 
    description: "Formação em Análise e Desenvolvimento de Sistemas",
    icon: GraduationCap,
    color: "from-indigo-500 to-blue-500",
    achievements: ["Projeto de conclusão", "Preparação para mercado"]
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
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center md:text-left relative"
          >
            <div className="mb-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              >
                 <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
  </div>
                Patrick Brando
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 mb-6"
              >
                Desenvolvedor e Analista de Sistemas
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-400 mb-8 leading-relaxed"
              >
                Em constante aprendizado, apaixonado por tecnologia e sempre disposto a ajudar 
                pequenos negócios e empreendedores a crescerem com soluções digitais simples e eficazes.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/25"
                onClick={() => scrollToSection('services')}
              >
                <Heart className="mr-2 h-5 w-5" />
                Como Posso Ajudar
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                onClick={() => scrollToSection('contact')}
              >
                <Coffee className="mr-2 h-5 w-5" />
                Vamos Conversar
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-20 scale-110"></div>
              <img
                src={patrickImage}
                alt="Patrick Brando"
                className="relative w-80 h-80 rounded-full object-cover border-4 border-gradient-to-r from-blue-400 to-purple-400 shadow-2xl shadow-blue-500/20"
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
                  Sou apaixonado por tecnologia, games e natureza, sempre buscando aprender e evoluir. 
                  Minha trajetória é marcada pela curiosidade e pelo desejo constante de resolver problemas 
                  através da inovação, mesmo que ainda esteja no início da minha jornada profissional.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Acredito que não preciso ser um especialista para fazer a diferença. Com dedicação, 
                  estudo constante e muita disposição, busco ajudar pequenos negócios, empreendedores 
                  e pessoas que precisam de soluções tecnológicas simples e acessíveis.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Meu foco está em automação de processos básicos, desenvolvimento web simples e 
                  suporte técnico. Sei que tenho muito a aprender, mas estou disposto a dar o meu 
                  melhor em cada projeto, tratando cada cliente como uma oportunidade de crescimento mútuo.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl mb-6 text-gray-200">Minhas Competências Atuais:</h3>
          <div className="grid grid-cols-1 gap-3">
  {[
    // Ordenado do MAIOR para o MENOR nível
    { name: 'Ferramentas Office', level: 'Avançado', color: 'from-red-500 to-orange-500', width: '70%', icon: FileText },
    { name: 'Python', level: 'Intermediário', color: 'from-yellow-500 to-green-500', width: '65%', icon: Bot },
    { name: 'Lógica de Programação', level: 'Intermediário', color: 'from-purple-500 to-pink-500', width: '65%', icon: GitBranch },
    { name: 'Google Cloud', level: 'Intermediário', color: 'from-green-500 to-teal-500', width: '60%', icon: Cloud },
    { name: 'Git & GitHub', level: 'Intermediário', color: 'from-gray-500 to-purple-500', width: '60%', icon: GitBranch },
    { name: 'VS Code', level: 'Intermediário', color: 'from-blue-500 to-cyan-500', width: '60%', icon: Code },
    { name: 'C', level: 'Básico', color: 'from-blue-500 to-purple-500', width: '50%', icon: Code },
    { name: 'HTML & CSS', level: 'Básico', color: 'from-orange-500 to-red-500', width: '50%', icon: Code },
    { name: 'SQL & Banco de Dados', level: 'Básico', color: 'from-purple-500 to-pink-500', width: '50%', icon: Database },
    { name: 'Windows Server', level: 'Básico', color: 'from-blue-600 to-cyan-500', width: '50%', icon: Server },
    { name: 'TypeScript', level: 'Básico', color: 'from-blue-400 to-cyan-500', width: '45%', icon: Code },
    { name: 'Firebase', level: 'Básico', color: 'from-yellow-500 to-orange-500', width: '45%', icon: Cloud },
    { name: 'Vercel', level: 'Básico', color: 'from-gray-400 to-black', width: '45%', icon: Cloud },
    { name: 'JavaScript', level: 'Aprendendo', color: 'from-yellow-400 to-orange-500', width: '40%', icon: Code },
    { name: 'React', level: 'Aprendendo', color: 'from-cyan-500 to-blue-500', width: '40%', icon: Code },
    { name: 'Power BI', level: 'Iniciante', color: 'from-yellow-600 to-orange-600', width: '30%', icon: BarChart3 },
    { name: 'Node.js', level: 'Iniciante', color: 'from-green-400 to-green-600', width: '30%', icon: Code }
  ].map((skill, index) => (
    <motion.div
      key={skill.name}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
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
          initial={{ width: 0 }}
          whileInView={{ width: skill.width }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
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
                  "Prefiro ser honesto sobre meu nível atual e entregar com qualidade do que prometer algo além das minhas capacidades. 
                  Cada projeto é uma chance de aprender e crescer juntos!"
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
                  {/* Google Cloud Data Analytics */}
                  <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg border border-cyan-500/20">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full flex-shrink-0 animate-pulse"></div>
                    <div className="flex-1">
                      <span className="text-gray-300 font-medium">Google Cloud Data Analytics Certificate</span>
                      <p className="text-sm text-gray-400 mt-1">
                        Focado em técnicas de Análise de Dados, visualização (Looker Studio) e uso de BigQuery no Google Cloud Platform
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded-full">Análise de Big Data</span>
                        <span className="text-xs text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded-full">BigQuery</span>
                        <span className="text-xs text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded-full">Data Analytics</span>
                      </div>
                    </div>
                    <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded-full">Out 2025 - Abr 2026</span>
                  </div>
                  
                  {/* Google Cloud Computing Foundations */}
                  <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg border border-green-500/20">
                    <div className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="text-gray-300 font-medium">Google Cloud Computing Foundations Certificate</span>
                      <p className="text-sm text-gray-400 mt-1">Fundamentos de computação em nuvem e infraestrutura Google Cloud</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">BigQuery</span>
                        <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">Google Cloud Platform</span>
                      </div>
                    </div>
                    <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">Nov 2025</span>
                  </div>
                  
                  {/* Especialização Google Cloud */}
<div className="p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-3">
      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
      <span className="text-gray-300 font-medium text-lg">Especialização Google Cloud</span>
    </div>
    <span className="text-xs text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">15+ Certificações</span>
  </div>
  
  <p className="text-sm text-gray-400 mb-4">
    Especialista em infraestrutura cloud com múltiplas certificações técnicas
  </p>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <h4 className="text-sm text-blue-300 font-medium mb-2">🏗️ Infraestrutura & Rede</h4>
      <div className="flex flex-wrap gap-1">
        <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">Load Balancing</span>
        <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">Network Security</span>
        <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">Compute Engine</span>
      </div>
    </div>
    
    <div>
      <h4 className="text-sm text-green-300 font-medium mb-2">📊 Dados & Machine Learning</h4>
      <div className="flex flex-wrap gap-1">
        <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">BigQuery</span>
        <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">Data Pipelines</span>
        <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">ML APIs</span>
      </div>
    </div>
  </div>
</div>
<div className="text-center mt-8">
  <Button
    variant="outline"
    className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
    onClick={() => window.open('https://www.credly.com/users/patrick-brando', '_blank')}
  >
    Ver todas as 15+ certificações no Credly
  </Button>
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

             {/* Experience jornada */}
<section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/50 to-blue-950/30">
  <div className="max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        Minha Jornada
      </h2>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto">
        Da descoberta da tecnologia às conquistas profissionais - uma linha do tempo interativa
      </p>
      <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-6"></div>
    </motion.div>

    <div className="relative">
      {/* Linha central */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500/20 via-blue-500/40 to-purple-500/20"></div>
      
      <div className="space-y-12">
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
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
              <Card className={`p-6 bg-gradient-to-br ${item.color}/20 border-${item.color.split('-')[1]}-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl font-bold text-gray-200">{item.year}</span>
                      <span className="text-sm px-2 py-1 bg-slate-800/50 text-cyan-300 rounded-full border border-cyan-500/30">
                        {index === 1 ? "Atual" : index > 1 ? "Futuro" : "Passado"}
                      </span>
                    </div>
                    <h3 className="text-xl text-gray-100 mb-2">{item.title}</h3>
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    <div className="space-y-2">
                      {item.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                          <span className="text-sm text-gray-400">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Ponto na linha */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className={`w-6 h-6 rounded-full border-4 border-white bg-gradient-to-r ${item.color} shadow-lg shadow-${item.color.split('-')[1]}-500/25`}></div>
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
      className="text-center mt-16"
    >
      <Card className="p-8 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-500/20 backdrop-blur-sm max-w-2xl mx-auto">
        <h3 className="text-2xl text-cyan-300 mb-4">Próxima Parada: Sua Empresa?</h3>
        <p className="text-gray-300 mb-6">
          Estou pronto para minha próxima oportunidade profissional. Vamos construir algo incrível juntos?
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 border-0"
          onClick={() => scrollToSection('contact')}
        >
          <TrendingUp className="mr-2 h-5 w-5" />
          Vamos Conversar
        </Button>
      </Card>
    </motion.div>
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
            <Card className="p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-2xl text-purple-300 mb-2">Analista / Suporte de TI</h3>
                    <p className="text-xl text-gray-300 mb-2">Detella Restaurantes Empresariais</p>
                    <p className="text-sm text-gray-400 mb-4 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Julho 2025 – Atual • Trabalho Individual com Autonomia Total
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                        Desenvolvedor Full-Stack
                      </span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                        Engenheiro de Automação
                      </span>
                      <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30">
                        Administrador de Sistemas
                      </span>
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm border border-indigo-500/30">
                        Gestor Estratégico de TI
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Atuo como único responsável pela área de TI, combinando desenvolvimento full-stack, 
                      automação de processos e gestão de infraestrutura para otimizar operações empresariais.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-lg text-blue-300 font-medium mb-3 flex items-center">
                          <Code className="w-5 h-5 mr-2" />
                          Desenvolvimento Full-Stack
                        </h4>
                        <div className="space-y-3">
                          {[
                            "Construção de aplicações internas com Next.js/TypeScript",
                            "Desenvolvimento em C# e integração com Firebase", 
                            "Migração de soluções legadas para modernas",
                            "Melhoria contínua da experiência do usuário"
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
                          <Bot className="w-5 h-5 mr-2" />
                          Engenharia de Automação
                        </h4>
                        <div className="space-y-3">
                          {[
                            "Liderança em scripts Python e RPA (UiPath)",
                            "Projeto 'Automações implementados'",
                            "Integração entre sistemas corporativos",
                            "Eliminação de processos manuais repetitivos"
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
                          <Server className="w-5 h-5 mr-2" />
                          Infraestrutura & Segurança
                        </h4>
                        <div className="space-y-3">
                          {[
                            "Gestão de servidores, backup e VPN corporativa",
                            "Administração de segurança de rede (Firewalls)",
                            "Configuração e manutenção de VPN SSL",
                            "Garantia da resiliência operacional"
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
                          Gestão Ágil & Metodologias
                        </h4>
                        <div className="space-y-3">
                          {[
                            "Aplicação prática de Scrum/Kanban",
                            "Priorização estratégica de demandas de TI",
                            "Alinhamento tecnologia-negócio",
                            "Documentação de processos e entregáveis"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                              <span className="text-gray-300 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Gestão Estratégica & Business Intelligence */}
                    <div className="mt-6 p-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg border border-indigo-500/30">
                      <h4 className="text-lg text-indigo-300 font-medium mb-4 flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Gestão Estratégica & Business Intelligence
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h5 className="text-sm text-indigo-200 font-medium mb-2">📊 Business Intelligence & Orçamento</h5>
                          <div className="space-y-2">
                            {[
                              "Desenvolvimento de dashboards estratégicos para diretoria",
                              "Análise de dados para tomada de decisão executiva", 
                              "Planejamento e controle de orçamento de TI",
                              "Definição de métricas e KPIs de negócio",
                              "Relatórios de performance para gestão"
                            ].map((item, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                                <span className="text-gray-300 text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h5 className="text-sm text-indigo-200 font-medium mb-2">🤝 Negociação & Governança</h5>
                          <div className="space-y-2">
                            {[
                              "Negociação direta com diretoria sobre prioridades de TI",
                              "Mediação entre necessidades técnicas e de negócio",
                              "Definição de roadmap tecnológico alinhado à estratégia",
                              "Gestão de expectativas e comunicação executiva",
                              "Governança de TI com foco em resultados empresariais"
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
                          <h5 className="text-sm text-blue-300 font-medium mb-2">🚀 Frontend & Full-Stack</h5>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Next.js", "TypeScript", "JavaScript", "HTML/CSS", 
                              "React", "Tailwind CSS"
                            ].map((skill, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h5 className="text-sm text-green-300 font-medium mb-2">⚙️ Backend & Infraestrutura</h5>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Python", "C#", "Firebase", "Google Cloud", 
                              "Windows Server", "SQL"
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
                          <h5 className="text-sm text-orange-300 font-medium mb-2">🤖 Automação & Ferramentas</h5>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "UiPath (RPA)", "Power Automate", "Scripts Python",
                              "Automação de Processos"
                            ].map((skill, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h5 className="text-sm text-cyan-300 font-medium mb-2">📊 Gestão & Metodologias</h5>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Scrum", "Kanban", "Gestão de Projetos",
                              "Metodologias Ágeis"
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

      {/* Projects Section */}
<section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/50 to-blue-900/20">
  <div className="max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
        Projetos em Destaque
      </h2>
      <p className="text-lg text-gray-400 max-w-3xl mx-auto">
        Do conceito à implementação: soluções reais para desafios reais
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 gap-8">
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
            <div className="lg:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm font-medium">PROJETO DESTAQUE</span>
                </div>
                <h3 className="text-2xl lg:text-3xl text-blue-300 mb-4">AssetWise</h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  Sistema completo de gestão de ativos de TI desenvolvido para empresa real. 
                  Dashboard intuitivo, controle de ativos, movimentações e diagnóstico por IA integrada.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">Next.js</span>
                  <span className="px-3 py-1 text-sm bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">TypeScript</span>
                  <span className="px-3 py-1 text-sm bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">Firebase</span>
                  <span className="px-3 py-1 text-sm bg-green-500/20 text-green-300 rounded-full border border-green-500/30">Google AI</span>
                  <span className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">Tailwind</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 border-0"
                  onClick={() => openProjectModal('assetwise')}
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Ver Detalhes Técnicos
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
                  onClick={() => toast.info('Projeto desenvolvido para empresa específica')}
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Código Privado
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center p-8">
              <div className="text-center">
                <Server className="w-20 h-20 text-white mb-4 mx-auto" />
                <p className="text-white/80 text-sm">Dashboard de Gestão de Ativos</p>
                <p className="text-white/60 text-xs mt-2">Sistema empresarial completo</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Flux Finance */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-green-600/20 to-teal-600/20 border-green-500/30 backdrop-blur-sm overflow-hidden group cursor-pointer h-full flex flex-col hover:scale-105 transition-transform duration-300">
          <div className="h-48 bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <TrendingUp className="w-16 h-16 text-white" />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl text-green-300 mb-2">Flux Finance</h3>
            <p className="text-gray-300 mb-4 flex-1">Plataforma multi-usuário para gestão financeira pessoal com insights inteligentes, categorização automática e análise de investimentos.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-sm bg-green-500/20 text-green-300 rounded-full border border-green-500/30">Next.js</span>
              <span className="px-3 py-1 text-sm bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">Firebase</span>
              <span className="px-3 py-1 text-sm bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">TypeScript</span>
              <span className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">Multi-usuário</span>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="flex-1 bg-green-600 hover:bg-green-700 border-0"
                onClick={() => openProjectModal('fluxfinance')}
              >
                <Eye className="w-4 h-4 mr-2" />
                Detalhes Técnicos
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="flex-1 border-green-500/50 text-green-300 hover:bg-green-500/10"
                onClick={() => window.open('https://github.com/patrick-git-bite/Flux-Finance', '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                Código
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* RPA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30 backdrop-blur-sm overflow-hidden group cursor-pointer h-full flex flex-col hover:scale-105 transition-transform duration-300">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <Bot className="w-16 h-16 text-white" />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl text-blue-300 mb-2">Automação RPA</h3>
            <p className="text-gray-300 mb-4 flex-1">Sistema que automatiza baixa de documentos via e-mail, integrando Python com UiPath para otimizar fluxos operacionais empresariais.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">Python</span>
              <span className="px-3 py-1 text-sm bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">UiPath</span>
              <span className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">Automação</span>
              <span className="px-3 py-1 text-sm bg-green-500/20 text-green-300 rounded-full border border-green-500/30">Outlook</span>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="flex-1 bg-blue-600 hover:bg-blue-700 border-0"
                onClick={() => openProjectModal('rpa')}
              >
                <Eye className="w-4 h-4 mr-2" />
                Detalhes Técnicos
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="flex-1 border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
                onClick={() => window.open('https://github.com/patrick-git-bite/RPA', '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                Código
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Análise Financeira */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30 backdrop-blur-sm overflow-hidden group cursor-pointer h-full flex flex-col hover:scale-105 transition-transform duration-300">
          <div className="h-48 bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <BarChart3 className="w-16 h-16 text-white" />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl text-orange-300 mb-2">Análise Financeira</h3>
            <p className="text-gray-300 mb-4 flex-1">Ferramenta avançada para análise comparativa de dados financeiros entre períodos, com geração de relatórios em Excel/PDF.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-sm bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">Python</span>
              <span className="px-3 py-1 text-sm bg-green-500/20 text-green-300 rounded-full border border-green-500/30">Pandas</span>
              <span className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">Matplotlib</span>
              <span className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">Data Analysis</span>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="flex-1 bg-orange-600 hover:bg-orange-700 border-0"
                onClick={() => openProjectModal('analise')}
              >
                <Eye className="w-4 h-4 mr-2" />
                Detalhes Técnicos
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="flex-1 border-orange-500/50 text-orange-300 hover:bg-orange-500/10"
                onClick={() => window.open('https://github.com/patrick-git-bite/Analise-financeiro', '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                Código
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  </div>
</section>

{/* Project Modals */}
{selectedProject && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    onClick={closeProjectModal}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-slate-900 rounded-2xl border border-blue-500/30 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl text-blue-300">
            {selectedProject === 'assetwise' && 'AssetWise - Sistema de Gestão de Ativos de TI'}
            {selectedProject === 'fluxfinance' && 'Flux Finance - Plataforma Financeira Multi-usuário'}
            {selectedProject === 'rpa' && 'Automação RPA - Sistema de Processos Automatizados'}
            {selectedProject === 'analise' && 'Sistema de Análise Financeira Comparativa'}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={closeProjectModal}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
        
        <div className="space-y-6">
          {selectedProject === 'assetwise' && (
  <div className="space-y-6">
    <div>
      <h4 className="text-2xl text-green-300 mb-3">AssetWise - Sistema de Gestão de Ativos de TI</h4>
      <p className="text-gray-300 mb-4 leading-relaxed">
        Sistema completo desenvolvido para gestão de ativos de TI em empresa real. 
        Inclui dashboard intuitivo, controle de ativos, histórico de movimentações, 
        diagnóstico por IA integrada e relatórios automáticos.
      </p>
    </div>

    {/* Dashboard */}
    <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-500/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
        <h5 className="text-lg text-blue-300">Dashboard Principal</h5>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <img 
            src="/projects/assetwise/dashboard.jpg" 
            alt="Dashboard Principal do AssetWise"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        
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
    <div className="bg-slate-800/50 rounded-xl p-6 border border-green-500/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        <h5 className="text-lg text-green-300">Diagnóstico por IA</h5>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <img 
            src="/projects/assetwise/diagnostico-ia.jpg" 
            alt="Diagnóstico IA AssetWise"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        
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

          {selectedProject === 'fluxfinance' && (
  <div className="space-y-6">
    <div>
      <h4 className="text-2xl text-green-300 mb-3">Flux Finance - Plataforma Financeira Multi-usuário</h4>
      <p className="text-gray-300 mb-4 leading-relaxed">
        Plataforma completa para gestão financeira pessoal com autenticação multi-usuário, 
        categorização automática de transações, análise de investimentos e insights de mercado.
      </p>
    </div>

    {/* Dashboard */}
    <div className="bg-slate-800/50 rounded-xl p-6 border border-green-500/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        <h5 className="text-lg text-green-300">Dashboard Financeiro</h5>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <img 
            src="/projects/fluxfinance/painel.jpg"
            alt="Dashboard Flux Finance"
            className="w-full h-64 object-cover rounded-lg"
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
    <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-500/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
        <h5 className="text-lg text-blue-300">Gestão de Transações</h5>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <img 
            src="/projects/fluxfinance/transacoes.jpg"
            alt="Transações Flux Finance"
            className="w-full h-64 object-cover rounded-lg"
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
    <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
        <h5 className="text-lg text-purple-300">Insights Inteligentes</h5>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <img 
            src="/projects/fluxfinance/insights.jpg"
            alt="Insights Flux Finance"
            className="w-full h-64 object-cover rounded-lg"
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
    <div className="bg-slate-800/50 rounded-xl p-6 border border-orange-500/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
        <h5 className="text-lg text-orange-300">Análise de Mercado</h5>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <img 
            src="/projects/fluxfinance/mercado-1.jpg"
            alt="Análise de Mercado 1"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <img 
            src="/projects/fluxfinance/mercado-2.jpg"
            alt="Análise de Mercado 2"
            className="w-full h-48 object-cover rounded-lg"
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

          {/* RPA - COMPLETO AGORA */}
          {selectedProject === 'rpa' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-2xl text-blue-300 mb-3">Automação RPA - Sistema de Processos Automatizados</h4>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Sistema completo de automação robótica de processos que monitora caixa de e-mails, 
                  extrai dados de documentos e integra com ERP corporativo via UiPath, eliminando 
                  processos manuais repetitivos.
                </p>
              </div>

              {/* Arquitetura do Sistema */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <h5 className="text-lg text-blue-300">Arquitetura do Sistema RPA</h5>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h6 className="text-green-300 font-medium mb-3">🔧 Stack Técnica Completa</h6>
                    <div className="grid md:grid-cols-2 gap-4">
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
              <div className="grid md:grid-cols-2 gap-6">
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
              <div className="bg-slate-800/50 rounded-xl p-6 border border-green-500/20">
                <h6 className="text-lg text-green-300 font-medium mb-4">🛠️ Stack Técnica Completa</h6>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 text-sm bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Python 3.10
                  </span>
                  <span className="px-4 py-2 text-sm bg-orange-500/20 text-orange-300 rounded-lg border border-orange-500/30 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    UiPath Studio
                  </span>
                  <span className="px-4 py-2 text-sm bg-green-500/20 text-green-300 rounded-lg border border-green-500/30 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Outlook API
                  </span>
                  <span className="px-4 py-2 text-sm bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Windows COM
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ANÁLISE FINANCEIRA - COMPLETO AGORA */}
          {selectedProject === 'analise' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-2xl text-orange-300 mb-3">Sistema de Análise Financeira Comparativa</h4>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Ferramenta avançada em Python para análise comparativa de dados financeiros entre períodos, 
                  com geração automática de relatórios em Excel e PDF, gráficos interativos e estatísticas detalhadas.
                </p>
              </div>

              {/* Arquitetura do Sistema */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-orange-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <h5 className="text-lg text-orange-300">Arquitetura Modular Avançada</h5>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h6 className="text-green-300 font-medium mb-3">🏗️ Estrutura de Módulos</h6>
                    <div className="grid md:grid-cols-2 gap-6">
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
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h6 className="text-lg text-green-300 font-medium">📊 Análises Estatísticas</h6>
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
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-2 text-sm bg-orange-500/20 text-orange-300 rounded-lg border border-orange-500/30 flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      Python 3.10
                    </span>
                    <span className="px-3 py-2 text-sm bg-green-500/20 text-green-300 rounded-lg border border-green-500/30 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Pandas
                    </span>
                    <span className="px-3 py-2 text-sm bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Matplotlib
                    </span>
                    <span className="px-3 py-2 text-sm bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      Seaborn
                    </span>
                    <span className="px-3 py-2 text-sm bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      OpenPyXL
                    </span>
                  </div>
                </div>
              </div>

              {/* Métricas de Performance */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/20">
                <h6 className="text-lg text-cyan-300 font-medium mb-4">⚡ Performance do Sistema</h6>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                    <p className="text-cyan-300 text-2xl font-bold">2.3s</p>
                    <p className="text-gray-400 text-sm">Processamento</p>
                  </div>
                  <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                    <p className="text-green-300 text-2xl font-bold">15+</p>
                    <p className="text-gray-400 text-sm">Tipos de Gráficos</p>
                  </div>
                  <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                    <p className="text-blue-300 text-2xl font-bold">99.8%</p>
                    <p className="text-gray-400 text-sm">Precisão</p>
                  </div>
                  <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                    <p className="text-purple-300 text-2xl font-bold">3</p>
                    <p className="text-gray-400 text-sm">Formatos Export</p>
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
              const body = encodeURIComponent("Olá Patrick! Gostaria de solicitar um orçamento gratuito para o seguinte projeto:\n\n• Tipo de projeto:\n• Descrição breve:\n• Prazo estimado:\n• Orçamento disponível:\n\nAguardo seu retorno!");
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
                    disabled={isSubmitting} // Desabilita o botão durante o envio
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 h-12 disabled:opacity-50"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
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
            <p className="text-gray-400">© 2025 Patrick Brando. Evoluindo e Aprendendo.</p>
            <div className="flex space-x-8">
              {[
                { id: 'home', label: 'Início' },
                { id: 'about', label: 'Sobre' },
                { id: 'education', label: 'Formação' },
                { id: 'experience', label: 'Experiência' },
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

