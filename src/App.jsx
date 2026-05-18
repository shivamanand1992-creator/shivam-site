import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Mail, Linkedin, ExternalLink, Zap, Lightbulb, Spark } from 'lucide-react';

export default function App() {
  const [aiNews, setAiNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const buildRef = useRef(null);

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

  const scrollToBuild = () => {
    buildRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 z-50" style={{ width: `${scrollProgress}%` }} />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 -left-40 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-20 right-1/3 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <div className="inline-block mb-6 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-mono w-fit">
                🚀 AI is Here. Now Build.
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-8">
                <span className="block">Think</span>
                <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">WHAT</span>
                <span className="block">Not How</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-6 leading-relaxed max-w-lg">
                AI handles the "how." You focus on solving real problems. Building something meaningful. Creating impact.
              </p>

              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed max-w-lg">
                This is the time to build. No more waiting. No more thinking about what's possible. Just build.
              </p>

              <button onClick={scrollToBuild} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all transform hover:scale-105">
                Let's Build Together →
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
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-amber-400 font-bold text-sm sm:text-base">Builder • Founder • RPA Architect</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-amber-400" />
        </div>
      </section>

      {/* MY JOURNEY */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-8">My Journey</h2>
          <p className="text-center text-slate-400 mb-20 text-lg">From enterprise automation to building the future with AI</p>

          <div className="space-y-12">
            {[
              { year: '2015', title: 'Started Building', desc: 'Began working with automation. Learned how processes work. Built my first solutions. Realized automation could change everything.', icon: '🔧' },
              { year: '2015-2023', title: 'Enterprise Scale', desc: 'Worked with leading companies. Architected large-scale automation systems. Learned how to build and ship at scale. Led teams. Solved hard problems.', icon: '🏢' },
              { year: '2024', title: 'AI Changes Everything', desc: 'Started playing with AI. Claude, GPT-4, open-source tools. Realized the game just changed. No limits now. Speed and creativity multiplied.', icon: '⚡' },
              { year: '2024-Now', title: 'Building Clinoq', desc: 'Solving real healthcare chaos in India. WhatsApp-first clinic management. Live product. Real users. Proof that you can build anything with AI.', icon: '🚀' },
              { year: 'Always', title: 'Still Learning', desc: 'Every day there\'s something new. New models. New techniques. New possibilities. The loop never ends. And that\'s the beauty of it.', icon: '📚' }
            ].map((m, i) => (
              <div key={i} className="group relative">
                <div className="absolute -left-8 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-xl border-4 border-black group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
                <div className="ml-12 pl-6 border-l-2 border-amber-500/30 group-hover:border-amber-500 pb-8 transition-all bg-slate-800/30 group-hover:bg-slate-800/60 rounded-lg p-6">
                  <div className="text-amber-400 font-mono text-sm font-bold mb-1">{m.year}</div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-400 transition-colors">{m.title}</h3>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors text-lg">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILDING NOW */}
      <section ref={buildRef} className="relative py-32 px-6 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-8">What I'm Building Now</h2>
          <p className="text-center text-slate-400 mb-20 text-lg">Real problems. Real solutions. AI-powered.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                icon: '🏥', 
                title: 'Clinoq', 
                desc: 'Solving healthcare chaos in India. Doctors run clinics on paper and WhatsApp. We're changing that. WhatsApp-first. AI-powered. Real impact.',
                link: 'https://clinoq.in'
              },
              { 
                icon: '🤖', 
                title: 'Playing with AI', 
                desc: 'Building cool stuff with Claude, GPT-4, open-source models. Experimenting. Testing ideas. Making things work. Pushing what\'s possible.', 
                link: '#'
              }
            ].map((p, i) => (
              <div key={i} className="group bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 hover:border-amber-500/50 hover:bg-slate-800/70 transition-all">
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">{p.icon}</div>
                <h3 className="text-3xl font-bold mb-3 group-hover:text-amber-400 transition-colors">{p.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-300 text-lg mb-6 leading-relaxed">{p.desc}</p>
                {p.link !== '#' && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-amber-400 font-bold hover:text-amber-300">
                    Explore → <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY AI MATTERS */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-12">Why This Matters Now</h2>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-amber-400">The Old Way is Dead</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                You used to need 5 years to get good at coding. 10 years to ship products. Teams of people. Massive budgets. That's gone. AI changed the game. One person can now do what teams of 10 used to do.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Think WHAT, Not HOW</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                You don't need to know HOW anymore. Claude knows HOW. GPT knows HOW. You just need to know WHAT you want to build. What problem are you solving? What does it need to do? AI handles the rest.
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-red-400">It's Time to Build</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                No more waiting. No more learning everything before you start. Build NOW. Learn as you go. Ship fast. Iterate. The best time to build was 5 years ago. The second best time is today.
              </p>
            </div>

            <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-amber-400">Never Stop Learning</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                AI moves fast. Models improve every month. New techniques emerge every week. You'll never "finish" learning. And that's okay. That's the excitement. Embrace the endless loop. Stay curious. Keep building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI NEWS */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-8">What's Happening in AI</h2>
          <p className="text-center text-slate-400 mb-16 text-lg">Latest updates. Every day something new.</p>

          {loading ? (
            <div className="text-center py-20">
              <Zap className="w-12 h-12 text-amber-400 animate-spin mx-auto" />
            </div>
          ) : (
            <div className="space-y-4">
              {aiNews.slice(0, 8).map((n, i) => (
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

      {/* FINAL CTA */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-black mb-8">Stop Waiting. Start Building.</h2>

          <p className="text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            You have everything you need. AI tools are free. Knowledge is online. Problems are everywhere. The only thing missing is you saying "yes, I'll build this."
          </p>

          <div className="bg-slate-800/60 border-2 border-amber-500/40 rounded-3xl p-12 max-w-xl mx-auto mb-12">
            <p className="text-xl font-bold mb-8">Let's connect. Let's build. Let's make something real.</p>

            <div className="space-y-4">
              <a href="mailto:shivamanand1992@gmail.com" className="block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all text-center">
                <Mail className="w-5 h-5 inline mr-2" />
                Email Me
              </a>
              <a href="https://wa.me/919810721072" target="_blank" className="block px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 text-center">
                💬 Message on WhatsApp
              </a>
              <a href="https://linkedin.com/in/shivam-anand-4921aa11b" target="_blank" className="block px-8 py-4 border-2 border-amber-500/50 text-amber-400 font-bold rounded-xl hover:bg-amber-500/10 text-center">
                <Linkedin className="w-5 h-5 inline mr-2" />
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <p className="text-slate-500 text-sm">
            shivamanand1992@gmail.com · +91 9810 721 072
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-slate-800 bg-black text-center text-slate-500 text-sm">
        <p>Build with AI. Think big. Ship fast. Never stop learning.</p>
      </footer>
    </div>
  );
}
