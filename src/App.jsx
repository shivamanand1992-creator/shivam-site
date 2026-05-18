import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Mail, Linkedin, ExternalLink, Zap, Star, Lightbulb } from 'lucide-react';

export default function App() {
  const [aiNews, setAiNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background blobs */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 -left-40 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-20 right-1/3 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-6 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-mono">
              ✨ From Nothing to Building
            </div>

            <h1 className="text-7xl md:text-8xl font-black leading-tight mb-8">
              You're<br/>
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">Losing</span><br/>
              Opportunity
            </h1>

            <p className="text-2xl text-slate-300 mb-6 leading-relaxed max-w-lg">
              Right now, somewhere in India, a middle-class kid thinks: "I can't code. I have no capital."
            </p>

            <p className="text-2xl text-slate-300 mb-8 leading-relaxed max-w-lg">
              That was me. Five years ago. I was completely wrong.
            </p>

            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all transform hover:scale-105">
              Read My Story →
            </button>
          </div>

          {/* Photo */}
          <div className="relative hidden md:block">
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl blur-3xl opacity-30" />
            <div className="relative bg-black rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-2xl">
              <img 
                src="/shivam.jpg" 
                alt="Shivam" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23333" width="400" height="400"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="20"%3EPhoto%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-amber-400 font-bold">Builder • Founder • RPA Architect</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-amber-400" />
        </div>
      </section>

      {/* JOURNEY */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-6xl font-black text-center mb-20">The Journey</h2>

          <div className="space-y-12">
            {[
              { year: '2015', title: 'Barclays', desc: 'Fresh grad. ₹18K/mo. Learned RPA.', icon: '📍' },
              { year: '2018-2021', title: 'Enterprise Scale', desc: 'Led 24 devs. 100+ automations.', icon: '📈' },
              { year: '2023', title: 'The Leap', desc: 'Built Clinoq. Live product.', icon: '🚀' },
              { year: '2024+', title: 'Building Future', desc: 'Clinoq growing. AI powered.', icon: '✨' }
            ].map((m, i) => (
              <div key={i} className="group relative">
                <div className="absolute -left-8 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-xl border-4 border-black group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
                <div className="ml-12 pl-6 border-l-2 border-amber-500/30 group-hover:border-amber-500 pb-8 transition-all bg-slate-800/30 group-hover:bg-slate-800/60 rounded-lg p-6">
                  <div className="text-amber-400 font-mono text-sm font-bold mb-1">{m.year}</div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-400">{m.title}</h3>
                  <p className="text-slate-400">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl font-black text-center mb-20">What I've Built</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '💎', title: 'S.S. Jewellers', desc: 'Real retail business. Real customers.' },
              { icon: '🏥', title: 'Clinoq', desc: 'Live healthcare AI. Real doctors.' },
              { icon: '⚙️', title: 'Enterprise RPA', desc: '10+ years. 100+ automations.' }
            ].map((p, i) => (
              <div key={i} className="group bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 hover:border-amber-500/50 hover:bg-slate-800/70 transition-all">
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">{p.icon}</div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-400">{p.title}</h3>
                <p className="text-slate-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLINOQ */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-black border-2 border-green-500/30 rounded-3xl p-12 hover:border-green-500/80 transition-all">
              <h2 className="text-4xl font-black mb-6 flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-green-400" />
                Clinoq: The Vision
              </h2>

              <p className="text-xl text-slate-300 mb-6">
                Indian clinics run on <span className="text-green-400 font-bold">paper and WhatsApp</span>. Doctors waste 3+ hours daily on admin. Revenue is lost.
              </p>

              <p className="text-xl text-slate-300">
                Clinoq is <span className="text-green-400 font-bold">infrastructure for Indian healthcare</span>. WhatsApp-first. AI-powered. Zero friction.
              </p>

              <div className="mt-8 pt-8 border-t border-green-500/20">
                <a href="https://clinoq.in" target="_blank" className="inline-flex items-center gap-2 text-green-400 font-bold hover:text-green-300 text-lg">
                  Explore Clinoq → <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI NEWS */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-6xl font-black text-center mb-20">What's Happening in AI</h2>

          {loading ? (
            <div className="text-center">
              <Zap className="w-12 h-12 text-amber-400 animate-spin mx-auto" />
            </div>
          ) : (
            <div className="space-y-4">
              {aiNews.slice(0, 6).map((n, i) => (
                <div key={i} className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-amber-500/50 hover:bg-slate-800/80 transition-all">
                  <div className="flex justify-between items-start gap-4">
                    <div>
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
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-7xl font-black mb-8">You Can Do This Too</h2>

          <p className="text-2xl text-slate-300 mb-6 max-w-2xl mx-auto">
            I earned ₹8,000/month. Zero coding. Zero capital. <span className="text-amber-400 font-bold">AI changed everything.</span>
          </p>

          <div className="bg-slate-800/60 border-2 border-amber-500/40 rounded-3xl p-12 max-w-xl mx-auto">
            <p className="text-lg font-bold mb-8">Let's build something that matters.</p>

            <div className="space-y-4">
              <a href="mailto:shivamanand1992@gmail.com" className="block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all text-center">
                <Mail className="w-5 h-5 inline mr-2" />
                Email Me
              </a>
              <a href="https://wa.me/919810721072" target="_blank" className="block px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 text-center">
                💬 WhatsApp
              </a>
              <a href="https://linkedin.com/in/shivam-anand-4921aa11b" target="_blank" className="block px-8 py-4 border-2 border-amber-500/50 text-amber-400 font-bold rounded-xl hover:bg-amber-500/10 text-center">
                <Linkedin className="w-5 h-5 inline mr-2" />
                LinkedIn
              </a>
            </div>
          </div>

          <p className="text-slate-500 text-sm mt-12">
            shivamanand1992@gmail.com · +91 9810 721 072
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-slate-800 bg-black text-center text-slate-500">
        <p>© 2025 Shivam Anand. Built with AI & vision.</p>
      </footer>
    </div>
  );
}
