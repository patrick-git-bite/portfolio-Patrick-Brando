import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Menu, X, Calendar, MapPin, Bot, BarChart3, Code, Monitor, Cloud, Gamepad2, Zap, TrendingUp, Globe, Settings, Sparkles, Heart, Users, Coffee, Database, Server, Target, Clock, FileText, GitBranch } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { toast } from "sonner";
import patrickImage from "./assets/foto.jpg";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'experience', 'services', 'contact'];
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const services = [
    {
      icon: Bot,
      title: "Automação de Processos",
      description: "Desenvolvimento de soluções em Python para automatizar tarefas repetitivas do seu negócio. Desde organização de planilhas até automação de emails e relatórios. Ideal para pequenos comércios, consultórios e empreendedores que querem otimizar tempo.",
      features: ["Scripts em Python", "Automação de Planilhas", "Organização de Arquivos", "Relatórios Simples"],
      gradient: "from-blue-600/20 to-cyan-600/20",
      borderColor: "border-blue-500/30"
    },
    {
      icon: BarChart3,
      title: "Dashboards e Relatórios",
      description: "Criação de relatórios visuais simples para acompanhar o crescimento do seu negócio. Gráficos e indicadores básicos que ajudam você a entender melhor seus dados de vendas, clientes ou estoque.",
      features: ["Gráficos Simples", "Relatórios de Vendas", "Controle de Estoque", "Acompanhamento Básico"],
      gradient: "from-purple-600/20 to-pink-600/20",
      borderColor: "border-purple-500/30"
    },
    {
      icon: Code,
      title: "Sites e Landing Pages",
      description: "Desenvolvimento de sites simples e funcionais para pequenos negócios. Sites de apresentação, landing pages para capturar leads ou portfólios pessoais. Focado em design limpo e responsivo.",
      features: ["Sites Institucionais", "Landing Pages", "Portfólios Pessoais", "Design Responsivo"],
      gradient: "from-green-600/20 to-teal-600/20",
      borderColor: "border-green-500/30"
    },
    {
      icon: Server,
      title: "Infraestrutura Completa",
      description: "Domínio total em infraestrutura de TI para pequenas e médias empresas. Configuração de servidores, backup automatizado, VPN, firewall, redes e toda estrutura tecnológica necessária para seu negócio funcionar com segurança e eficiência.",
      features: ["Servidores", "Backup Automatizado", "VPN & Firewall", "Redes Corporativas"],
      gradient: "from-orange-600/20 to-red-600/20",
      borderColor: "border-orange-500/30"
    },
    {
      icon: Cloud,
      title: "Soluções Digitais Simples",
      description: "Implementação de ferramentas digitais básicas para modernizar seu negócio. Configuração de Google Workspace, backup em nuvem e organização digital para pequenas empresas e autônomos.",
      features: ["Google Workspace", "Backup Simples", "Organização Digital", "Ferramentas Básicas"],
      gradient: "from-indigo-600/20 to-blue-600/20",
      borderColor: "border-indigo-500/30"
    },
    {
      icon: Gamepad2,
      title: "Projetos Criativos",
      description: "Desenvolvimento de pequenos projetos relacionados a jogos, aplicativos educativos simples ou ferramentas criativas. Ideal para quem tem ideias inovadoras e quer testar conceitos básicos.",
      features: ["Protótipos Simples", "Jogos Básicos", "Apps Educativos", "Ideias Criativas"],
      gradient: "from-violet-600/20 to-purple-600/20",
      borderColor: "border-violet-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-x-hidden">
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
            className="text-center md:text-left"
          >
            <div className="mb-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              >
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
                  { name: 'Python', level: 'Básico-Intermediário', color: 'from-yellow-500 to-green-500' },
                  { name: 'C', level: 'Básico', color: 'from-blue-500 to-purple-500' },
                  { name: 'JavaScript', level: 'Aprendendo', color: 'from-yellow-400 to-orange-500' },
                  { name: 'HTML & CSS', level: 'Básico', color: 'from-orange-500 to-red-500' },
                  { name: 'React', level: 'Aprendendo', color: 'from-cyan-500 to-blue-500' },
                  { name: 'Node.js', level: 'Iniciante', color: 'from-green-400 to-green-600' },
                  { name: 'SQL & Banco de Dados', level: 'Básico', color: 'from-purple-500 to-pink-500' },
                  { name: 'Google Cloud', level: 'Estudando', color: 'from-green-500 to-teal-500' }
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
                      <span className="text-blue-300 font-medium text-sm">{skill.name}</span>
                      <span className="text-xs text-gray-400 bg-slate-800/50 px-2 py-1 rounded-full">
                        {skill.level}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 
                          skill.level === 'Básico-Intermediário' ? '65%' : 
                          skill.level === 'Básico' ? '45%' : 
                          skill.level === 'Aprendendo' ? '35%' : 
                          skill.level === 'Estudando' ? '30%' : 
                          skill.level === 'Iniciante' ? '25%' : '25%' 
                        }}
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
                    <p className="text-gray-300 mb-3 text-lg">Aprendendo na prática e na teoria</p>
                    <span className="text-sm text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
                      Em andamento • Formando 2026
                    </span>
                    <p className="text-gray-400 mt-4 leading-relaxed">
                      Estou absorvendo tudo que posso sobre programação, análise de sistemas e gestão de projetos. 
                      Cada disciplina é uma nova descoberta, e estou aplicando o conhecimento em projetos práticos 
                      para consolidar o aprendizado.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-to-l from-cyan-900/20 to-purple-900/20 border-cyan-500/30 backdrop-blur-sm">
                <h3 className="text-2xl text-cyan-300 mb-6">Certificações e Estudos Contínuos</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg border border-cyan-500/20">
                    <div className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="text-gray-300 font-medium">Informática Profissionalizante</span>
                      <p className="text-sm text-gray-400 mt-1">Minha base sólida para começar na área</p>
                    </div>
                    <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">Concluído</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg border border-cyan-500/20">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full flex-shrink-0 animate-pulse"></div>
                    <div className="flex-1">
                      <span className="text-gray-300 font-medium">Google Cloud Digital Leader</span>
                      <p className="text-sm text-gray-400 mt-1">Aprendendo sobre cloud e transformação digital</p>
                    </div>
                    <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded-full">Estudando</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg border border-cyan-500/20">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full flex-shrink-0 animate-pulse"></div>
                    <div className="flex-1">
                      <span className="text-gray-300 font-medium">Google Cloud Computing Foundations</span>
                      <p className="text-sm text-gray-400 mt-1">Explorando as possibilidades da computação em nuvem</p>
                    </div>
                    <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded-full">Em progresso</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg border border-cyan-500/20">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full flex-shrink-0 animate-pulse"></div>
                    <div className="flex-1">
                      <span className="text-gray-300 font-medium">Google Cloud GenAI Skill Badges</span>
                      <p className="text-sm text-gray-400 mt-1">Explorando o mundo da inteligência artificial</p>
                    </div>
                    <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded-full">Explorando</span>
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
              Minha Experiência Profissional
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
                      Julho 2025 – Atual
                    </p>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                        Trabalho Individual
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                        Autonomia Total
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Trabalho de forma independente como único responsável pela área de TI da empresa. 
                      Esta experiência me proporciona aprendizado intenso tanto em aspectos técnicos quanto 
                      em gestão, já que preciso entender diretamente as necessidades da gestão e traduzi-las 
                      em soluções tecnológicas.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-lg text-blue-300 font-medium mb-3 flex items-center">
                          <Code className="w-5 h-5 mr-2" />
                          Desenvolvimento & Automação
                        </h4>
                        <div className="space-y-3">
                          {[
                            "Desenvolvimento de scripts Python para automação",
                            "Criação de dashboards para acompanhamento",
                            "Integração entre sistemas internos",
                            "Otimização de processos manuais"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span className="text-gray-300 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg text-purple-300 font-medium mb-3 flex items-center">
                          <Target className="w-5 h-5 mr-2" />
                          Gestão & Metodologias
                        </h4>
                        <div className="space-y-3">
                          {[
                            "Organização e acompanhamento de projetos utilizando ferramentas ágeis",
                            "Planejamento e priorização de tarefas para garantir entregas dentro do prazo",
                            "Documentação detalhada de processos, decisões e entregáveis",
                            "Monitoramento de progresso e análise de desempenho das atividades"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                              <span className="text-gray-300 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg border border-green-500/20">
                      <h4 className="text-lg text-green-300 font-medium mb-3 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Aprendizados Únicos do Trabalho Solo
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          {[
                            "Comunicação direta com gestão empresarial",
                            "Tradução de necessidades de negócio em soluções técnicas",
                            "Gestão completa do ciclo de desenvolvimento"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                              <span className="text-gray-300 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          {[
                            "Responsabilidade total por resultados",
                            "Flexibilidade para escolher tecnologias",
                            "Visão holística dos processos empresariais"
                          ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                              <span className="text-gray-300 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-blue-500/20">
                        <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-sm text-blue-300 font-medium">Gestão de Tempo</p>
                        <p className="text-xs text-gray-400 mt-1">Priorização autônoma de tarefas</p>
                      </div>
                      <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-purple-500/20">
                        <FileText className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-sm text-purple-300 font-medium">Documentação</p>
                        <p className="text-xs text-gray-400 mt-1">Criação de processos e manuais</p>
                      </div>
                      <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-green-500/20">
                        <GitBranch className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-sm text-green-300 font-medium">Metodologias Ágeis</p>
                        <p className="text-xs text-gray-400 mt-1">Aplicação prática de Kanban/Scrum</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

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
              Como Posso Te Ajudar
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Ofereço soluções simples e acessíveis para pequenos negócios, empreendedores e pessoas 
              que precisam de ajuda com tecnologia. Valores justos e trabalho dedicado!
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
                Acredito que cada projeto pequeno é uma oportunidade de aprender e fazer a diferença. 
                Se você tem uma ideia, um pequeno negócio ou precisa de ajuda com tecnologia, 
                vamos conversar! Preços acessíveis e dedicação garantida.
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

