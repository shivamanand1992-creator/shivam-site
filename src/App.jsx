import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Mail, Linkedin, Github, ExternalLink, Zap, Code2, Briefcase, Sparkles } from 'lucide-react';

export default function App() {
  const [aiNews, setAiNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const workRef = useRef(null);

  useEffect(() => {
    fetchAINews();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchAINews = async () => {
    try {
      const res = await fetch('/api/ai-news');
      const data = await res.json();
      setAiNews(data);
    } catch (e) {
      console.log('News fetch failed');
    }
    setLoading(false);
  };

  const scrollToWork = () => {
    workRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 z-50" style={{ width: `${scrollProgress}%` }} />

      {/* HERO / HEADER */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-20 right-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-4 sm:mb-6">
                Shivam Anand
              </h1>
              
              <p className="text-xl sm:text-2xl md:text-3xl text-amber-400 font-bold mb-4 sm:mb-6">
                RPA Architect & AI Systems Builder
              </p>

              <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-4 sm:mb-6 leading-relaxed">
                Building intelligent automation systems. Architecting agentic AI workflows. Turning complex problems into elegant automation solutions.
              </p>

              <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8 leading-relaxed">
                Currently: Leading enterprise RPA + AI projects. Building Clinoq. Playing with agentic systems and intelligent document processing.
              </p>

              <button onClick={scrollToWork} className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all transform hover:scale-105 text-sm sm:text-base">
                See My Work →
              </button>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl blur-3xl opacity-30" />
              <div className="relative bg-black rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-2xl">
                <img 
                  src="/shivam.jpg" 
                  alt="Shivam Anand" 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-amber-400" />
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Focus Areas</h2>
          
          <div className="space-y-8">
            <div className="border-l-4 border-amber-500 pl-6">
              <h3 className="text-2xl font-bold mb-2">Enterprise RPA & Automation</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                10+ years automating complex business processes. Blue Prism, UiPath, workflow architecture. Solving problems at scale across finance, legal, manufacturing, and insurance sectors.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-2xl font-bold mb-2">Agentic AI & Intelligent Workflows</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Designing autonomous systems that reason and act. Multi-step AI workflows. Intelligent document processing combining vision + LLMs. Building agents that handle edge cases intelligently, not through brittle rules.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="text-2xl font-bold mb-2">AI Product Building</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                From concept to live product. Clinoq is proof: WhatsApp-first clinic management system solving real healthcare chaos in India. Building AI-first solutions that address genuine market problems with practical economics.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="text-2xl font-bold mb-2">Systems Architecture & Consulting</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Advising teams on AI strategy, automation architecture, and implementation. Solving hard problems: document handling at scale, multi-system integration, agentic workflow design. Making complex ideas actionable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I BUILD */}
      <section ref={workRef} className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16">What I have Built</h2>

          <div className="space-y-12">
            {[
              {
                title: 'Clinoq',
                subtitle: 'WhatsApp-first Clinic Management',
                description: 'Live SaaS product solving healthcare chaos in India. Clinics run on paper and WhatsApp. Clinoq automates appointments, patient records, prescriptions, billing — all through WhatsApp. Zero friction for doctors. Real traction with early adopters.',
                impact: 'Live with paying customers. Warm leads from oncologist and dentist networks.',
                tech: 'React, Node.js, PostgreSQL, Redis, Meta WhatsApp Cloud API',
                link: 'https://clinoq.in',
                icon: '🏥'
              },
              {
                title: 'Enterprise RPA at Scale',
                subtitle: '100+ Automated Processes',
                description: 'Architected and led implementation of 100+ end-to-end automation workflows across finance, banking, manufacturing, and legal sectors. Managed cross-functional teams. Solved integration challenges across legacy and modern systems.',
                impact: '10+ years. Led teams up to 24 engineers. Multi-million dollar automation impact across enterprises.',
                tech: 'Blue Prism, UiPath, OCR, Document Processing, API Integration, Cloud Platforms',
                icon: '⚙️'
              },
              {
                title: 'Current Focus: Agentic Systems',
                subtitle: 'AI Agents + Intelligent Workflows',
                description: 'Building the next generation of automation. Agentic AI that reasons about problems. Intelligent document processing that understands context. Multi-step workflows that handle edge cases without brittle rules. Combining vision models + LLMs + reasoning engines.',
                impact: 'Leading Blue Prism project integrating agentic approaches. Implementing at enterprise scale with June 2026 go-live.',
                tech: 'Claude API, GPT-4V, open-source models, workflow orchestration, vector databases',
                icon: '🤖'
              }
            ].map((project, i) => (
              <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 hover:border-amber-500/50 hover:bg-slate-800/70 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl">{project.icon}</span>
                  <div>
                    <h3 className="text-3xl font-bold">{project.title}</h3>
                    <p className="text-amber-400 font-semibold">{project.subtitle}</p>
                  </div>
                </div>
                
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">{project.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6 py-6 border-t border-slate-700/50">
                  <div>
                    <p className="text-slate-400 text-sm font-mono mb-1">IMPACT</p>
                    <p className="text-slate-300">{project.impact}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm font-mono mb-1">TECH STACK</p>
                    <p className="text-slate-300 text-sm">{project.tech}</p>
                  </div>
                </div>

                {project.link && project.link !== '#' && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-amber-400 font-bold hover:text-amber-300">
                    Visit → <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE GRID */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16">Skills & Tools</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Automation Platforms', items: 'Blue Prism, UiPath, n8n, Make' },
              { label: 'AI & LLMs', items: 'Claude, GPT-4, open-source models' },
              { label: 'Backend', items: 'Node.js, Python, Express, databases' },
              { label: 'Frontend', items: 'React, Tailwind, modern web stack' },
              { label: 'Document Processing', items: 'OCR, vision models, PDF extraction' },
              { label: 'Infrastructure', items: 'Cloud platforms, APIs, integrations' },
              { label: 'Agentic Systems', items: 'Multi-step reasoning, autonomous workflows' },
              { label: 'Databases', items: 'PostgreSQL, Redis, vector DBs' },
              { label: 'Methodologies', items: 'Architecture, systems design, consulting' }
            ].map((skill, i) => (
              <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-6">
                <p className="text-amber-400 font-bold text-sm mb-2">{skill.label}</p>
                <p className="text-slate-300">{skill.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOW PAGE */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-8">/Now</h2>
          <p className="text-slate-400 text-sm mb-8 font-mono">What I am focused on right now</p>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-amber-400" />
                Enterprise Automation Project
              </h3>
              <p className="text-slate-300 mb-2">Leading a major Blue Prism + AI integration project for legal services automation. Go-live: June 2026. Architecting workflows that combine traditional RPA with agentic AI for intelligent document processing and decision-making.</p>
              <p className="text-slate-400 text-sm">Focus: Agentic workflows at enterprise scale. Handling edge cases intelligently. Multi-system integration.</p>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-orange-400" />
                Clinoq Growth
              </h3>
              <p className="text-slate-300 mb-2">Early customers on Clinoq. Warm leads from oncologist and dentist networks. Building out features based on real user feedback. Proving the model works in healthcare before scaling.</p>
              <p className="text-slate-400 text-sm">Focus: Product-market fit. Real customer problems. Healthcare SaaS playbook.</p>
            </div>

            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <Zap className="w-6 h-6 text-red-400" />
                Learning & Building with AI
              </h3>
              <p className="text-slate-300 mb-2">Exploring what is possible with modern AI. Building small tools and systems to understand agentic patterns. Experimenting with vision models, LLMs, and reasoning systems. Never stopping learning.</p>
              <p className="text-slate-400 text-sm">Focus: Hands-on with latest models. Understanding the edge cases and tradeoffs. Building intuition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT WORK & UPDATES */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Latest in AI</h2>
          <p className="text-slate-400 mb-16">Following the trends that matter for building real systems</p>

          {loading ? (
            <div className="text-center py-20">
              <Zap className="w-12 h-12 text-amber-400 animate-spin mx-auto" />
            </div>
          ) : (
            <div className="space-y-4">
              {aiNews.slice(0, 6).map((n, i) => (
                <div key={i} className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-amber-500/50 hover:bg-slate-800/80 transition-all cursor-pointer">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full mb-2">
                        {n.category}
                      </span>
                      <h3 className="text-lg font-bold hover:text-amber-400">{n.title}</h3>
                      <p className="text-xs text-slate-500 mt-2">{n.source}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-600 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8">Let us work together</h2>

          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Building something complex? Automating enterprise workflows? Exploring agentic AI? Need a consulting partner who understands both the technical and business side? Let us talk.
          </p>

          <div className="bg-slate-800/60 border-2 border-amber-500/40 rounded-2xl p-12 max-w-md mx-auto mb-12">
            <p className="text-sm text-slate-400 mb-6 font-mono">CONTACT</p>

            <div className="space-y-4">
              <a href="mailto:shivamanand1992@gmail.com" className="block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all text-center">
                <Mail className="w-5 h-5 inline mr-2" />
                Email
              </a>
              <a href="https://linkedin.com/in/shivam-anand-4921aa11b" target="_blank" rel="noopener noreferrer" className="block px-8 py-4 border-2 border-amber-500/50 text-amber-400 font-bold rounded-lg hover:bg-amber-500/10 text-center">
                <Linkedin className="w-5 h-5 inline mr-2" />
                LinkedIn
              </a>
              <a href="https://github.com/shivamanand1992-creator" target="_blank" rel="noopener noreferrer" className="block px-8 py-4 border-2 border-slate-600 text-slate-300 font-bold rounded-lg hover:border-slate-500 text-center">
                <Github className="w-5 h-5 inline mr-2" />
                GitHub
              </a>
            </div>

            <p className="text-xs text-slate-500 mt-8">
              shivamanand1992@gmail.com<br />
              +91 9810 721 072
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-slate-800 bg-black text-center text-slate-500 text-sm">
        <p>Shivam Anand © 2025. Building intelligent systems.</p>
      </footer>
    </div>
  );
}
