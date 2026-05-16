/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, User, CheckCircle, ArrowRight, Loader2, Smartphone, MapPin, Navigation, Zap, Fuel, Wrench, Lock } from 'lucide-react';
import { supabase } from './lib/supabase';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  const applyMask = (value: string) => {
    let raw = value.replace(/\D/g, '');
    if (raw.length > 11) raw = raw.slice(0, 11);
    
    if (raw.length <= 10) {
      return raw.replace(/(\d{2})(\d{4})(\d{0,4})/, (match, p1, p2, p3) => {
        let res = '';
        if (p1) res += `(${p1}`;
        if (p2) res += `) ${p2}`;
        if (p3) res += `-${p3}`;
        return res;
      }).replace(/-$/, '').replace(/\) $/, '');
    } else {
      return raw.replace(/(\d{2})(\d{5})(\d{0,4})/, (match, p1, p2, p3) => {
        let res = '';
        if (p1) res += `(${p1}`;
        if (p2) res += `) ${p2}`;
        if (p3) res += `-${p3}`;
        return res;
      }).replace(/-$/, '').replace(/\) $/, '');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, [name]: applyMask(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    if (!supabase) {
      setStatus('error');
      setErrorMsg('Configuração do Supabase ausente. Por favor, configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no painel de Segredos.');
      return;
    }

    try {
      // Usando o nome da tabela exatamente como configurado: convite_rotz
      const { error } = await supabase
        .from('convite_rotz')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            phone: formData.phone 
          }
        ]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', phone: '' });
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message || 'Ocorreu um erro ao enviar seus dados. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] relative selection:bg-primary/20 overflow-x-hidden">
      {/* Immersive Grid Background */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      
      {/* Background Decorative Routes (Fixed) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" className="blur-[2px]">
          <path d="M-50,200 C100,50 300,400 600,200 S900,50 1200,300" fill="none" stroke="#5850EC" strokeWidth="60" className="route-dash" />
          <path d="M-100,600 C200,400 400,800 700,500 S1000,700 1300,400" fill="none" stroke="#10B981" strokeWidth="40" className="route-dash" />
        </svg>
      </div>

      <main className="relative z-10">
        {/* Navigation / Header */}
        <nav className="w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 p-2">
              <img 
                src="https://cdn.shopify.com/s/files/1/0571/7599/8511/files/Pagina_1Icone_2.png?v=1778440435" 
                alt="Rotz" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="relative font-display font-black text-xl tracking-tight text-slate-950 uppercase italic inline-block leading-none">
              Rotz
              <span className="absolute -bottom-0.5 left-0 w-full h-[3px] bg-red-500 rounded-full" />
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Beta Privado</span>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-4 pt-4 pb-16 sm:pt-8 sm:pb-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4 sm:gap-6 text-center lg:text-left items-center lg:items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full w-fit">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary">Tecnologia de Roteamento 2.0</span>
            </div>
            <h1 className="text-3xl sm:text-6xl font-display font-black text-slate-950 leading-[1] sm:leading-[0.9] tracking-tighter">
              Não dirija mais rápido. <br />
              <span className="text-primary italic">Dirija de forma inteligente.</span>
            </h1>
            <p 
              ref={formRef}
              className="text-base sm:text-lg text-slate-600 font-medium max-w-lg leading-snug scroll-mt-10 sm:scroll-mt-24"
            >
              O motorista comum perde <span className="text-slate-900 font-bold italic">2 horas por dia</span> em rotas ineficientes. O Rotz devolve esse tempo pra você através de inteligência pura aplicada a cada km.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-2 sm:mt-4">
              <div className="flex items-center gap-2 bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                <span className="text-[11px] sm:text-xs font-bold text-slate-700">+25% Produtividade</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
                <Fuel className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                <span className="text-[11px] sm:text-xs font-bold text-slate-700">-18% Combustível</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto lg:ml-auto"
          >
            <div className="relative">
              {/* Urgency badge - fora do overflow-hidden */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/30 whitespace-nowrap"
                >
                  ⚡ Vagas Limitadas por Cidade
                </motion.div>
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden relative">
              {/* Blur accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10" />
              
              <div className="px-5 sm:px-10 py-8 sm:py-10 pt-10 sm:pt-12">
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-display font-black text-slate-950 mb-2">Solicitar Convite</h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-400">Entre na lista prioritária e seja o primeiro a otimizar sua rotina.</p>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-3 mb-6 p-3 bg-primary/[0.03] rounded-xl border border-primary/[0.06]">
                  <div className="flex -space-x-1.5">
                    {[
                      'linear-gradient(135deg, #5850EC, #818CF8)',
                      'linear-gradient(135deg, #10B981, #34D399)',
                      'linear-gradient(135deg, #F59E0B, #FBBF24)',
                      'linear-gradient(135deg, #6366F1, #A5B4FC)',
                    ].map((gradient, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white"
                        style={{ background: gradient }}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-400">
                    <span className="text-slate-500">Acesso restrito</span> apenas para motoristas selecionados
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6"
                    >
                      <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-accent" />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Você está na lista!</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        Seu lugar está garantido. Avisaremos assim que o Beta estiver disponível em sua região.
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="text-primary font-bold hover:underline py-2"
                      >
                        Cadastrar outro e-mail
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                        <input
                          id="name" name="name" type="text" required placeholder="Nome Completo"
                          value={formData.name} onChange={handleChange}
                          className="w-full bg-[#F8FAFC] border border-transparent rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/10 focus:bg-white focus:border-primary/20 focus:scale-[1.01] transition-all text-slate-700 placeholder:text-slate-300 font-semibold text-sm"
                        />
                      </div>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                        <input
                          id="email" name="email" type="email" required placeholder="Seu Gmail da Play Store"
                          value={formData.email} onChange={handleChange}
                          className="w-full bg-[#F8FAFC] border border-transparent rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/10 focus:bg-white focus:border-primary/20 focus:scale-[1.01] transition-all text-slate-700 placeholder:text-slate-300 font-semibold text-sm"
                        />
                        <p className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1.5 ml-1">
                          Importante: Use o mesmo e-mail cadastrado na sua Google Play Store para liberar o seu download.
                        </p>
                      </div>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                        <input
                          id="phone" name="phone" type="tel" required placeholder="WhatsApp com DDD"
                          value={formData.phone} onChange={handleChange}
                          className="w-full bg-[#F8FAFC] border border-transparent rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/10 focus:bg-white focus:border-primary/20 focus:scale-[1.01] transition-all text-slate-700 placeholder:text-slate-300 font-semibold text-sm"
                        />
                      </div>

                      {status === 'error' && (
                        <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex gap-2 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                          <p className="text-red-600 text-[11px] font-semibold">{errorMsg}</p>
                        </div>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={status === 'loading'}
                        className="w-full bg-gradient-to-r from-primary via-primary-dark to-indigo-700 text-white font-black uppercase tracking-[0.1em] text-xs py-5 rounded-2xl shadow-xl shadow-primary/30 btn-glow flex items-center justify-center gap-3 transition-all disabled:opacity-50 mt-5"
                      >
                        {status === 'loading' ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            Quero o Acesso Antecipado
                            <ArrowRight className="w-4 h-4 arrow-bounce" />
                          </>
                        )}
                      </motion.button>

                      {/* Trust signal */}
                      <div className="flex items-center justify-center gap-1.5 mt-4">
                        <Lock className="w-3 h-3 text-slate-300" />
                        <span className="text-[10px] font-bold text-slate-300">Seus dados estão seguros • Sem spam</span>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
            </div>
          </motion.div>
        </section>

        {/* Value Section: Why optimization matters */}
        <section className="bg-slate-900 py-24 px-6 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(88,80,236,0.1),transparent)]" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col gap-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-5xl font-display font-black text-white leading-tight mb-6">
                   A diferença entre trabalhar muito e <span className="text-primary italic text-shadow-glow">trabalhar bem.</span>
                </h2>
                <p className="text-slate-400 text-lg sm:text-xl font-medium mb-8">
                  Sair de casa sem um roteiro otimizado é como tentar esvaziar o oceano com um balde. O Rotz analisa centenas de variáveis para que cada gota de combustível valha a pena.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.08] transition-colors group">
                  <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
                    <Navigation className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-white mb-4">Cérebro Logístico</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Não apenas o caminho mais curto, mas o mais eficiente. Evite o trânsito, semáforos viciados e ruas que destroem seu veículo.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.08] transition-colors group">
                  <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                    <Smartphone className="w-7 h-7 text-emerald-500" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-white mb-4">Foque no Volante</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Esqueça o estresse de pensar onde ir em seguida. O Rotz decide, você executa e o dinheiro entra na conta com menos esforço.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.08] transition-colors group">
                  <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20">
                    <MapPin className="w-7 h-7 text-amber-500" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-white mb-4">Geolocalização Precisa</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Entregue na porta certa, na primeira tentativa. Reduza o tempo parado procurando endereços e aumente seu faturamento/hora.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative Section: Indispensable Tool */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="w-full h-[400px] bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2070&auto=format&fit=crop"
                  alt="Motorista trabalhando"
                  className="w-full h-full object-cover mix-blend-multiply opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    <p className="text-white text-sm font-bold italic">"Com o Rotz, consegui fazer 5 entregas a mais no mesmo período que fazia 3. É a ferramenta que faltava no meu dia a dia."</p>
                    <span className="block mt-2 text-[10px] text-primary font-black uppercase tracking-widest text-shadow-glow">Antônio S., Motorista Parceiro</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary text-white flex items-center justify-center rounded-3xl font-black text-2xl -rotate-12 shadow-xl">
                -2h
              </div>
            </div>
            
            <div className="flex flex-col gap-8">
              <h3 className="text-4xl font-display font-black text-slate-950 leading-none">
                Sua ferramenta de <br />
                <span className="text-primary italic">sobrevivência.</span>
              </h3>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                No mercado atual, quem não usa inteligência fica pra trás. O custo do combustível e a manutenção não perdoam o amadorismo. O Rotz profissionaliza seu trajeto.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Algoritmo que prevê a melhor sequência lógica",
                  "Redução imediata do estresse mental de roteamento",
                  "Maior longevidade para os componentes do seu veículo",
                  "Mais tempo livre para o que realmente importa"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-center font-bold text-slate-700 text-sm">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <button 
                  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-fit bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-[0.1em] text-[10px] sm:text-xs py-4 px-10 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
                >
                  Quero testar agora
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 text-center text-slate-900 italic font-black uppercase tracking-[0.2em] sm:tracking-[0.4em]">
            <img 
              src="https://cdn.shopify.com/s/files/1/0571/7599/8511/files/Pagina_1Icone_2.png?v=1778440435" 
              alt="Rotz" 
              className="w-12 h-12 grayscale opacity-30"
            />
            <div className="flex flex-col gap-2">
              <p className="text-[10px] text-slate-300">Rotz Technologies &bull; Brazil &bull; 2026</p>
            </div>
            <button
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-4 bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 px-6 py-3 rounded-full font-black uppercase tracking-widest text-[10px] transition-all"
            >
              Voltar ao Início
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
