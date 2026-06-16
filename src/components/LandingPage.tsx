/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Sparkles, Sliders, Volume2, Gamepad2, Settings, Compass, HelpCircle, ArrowRight } from 'lucide-react';
import { watchAudio } from '../utils/audio';
import CelestialGlobeToggle from './CelestialGlobeToggle';

interface LandingPageProps {
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
  theme: 'classic' | 'summer';
  setTheme: (theme: 'classic' | 'summer') => void;
  onToggleTheme: () => void;
  onStart: () => void;
}

export default function LandingPage({ language, setLanguage, theme, setTheme, onToggleTheme, onStart }: LandingPageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const texts = {
    en: {
      subtitle: "A Creative Coding Experiment",
      passionTitle: "The Craft & Philosophy",
      passionText: "Born from a genuine passion for mechanical horology and watch modding, this project is an emotional bridge between traditional craftsmanship and creative coding. The goal is to translate the tactile beauty, mathematical precision, and mesmerizing flow of gears into an interactive digital experience.",
      cta: "START SIMULATION",
      subCta: "LANCER LE MÉCANISME",
      signature: "Alex Koncept — Merging AI, DIY, and Horology.",
      portfolio: "Portfolio",
      contact: "Contact Us",
      badgeText: "HOROLOGY EDITION",
      themeLabel: "Theme: ",
      themeClassic: "Winter Solstice",
      themeSummer: "Summer Solstice",
      featuresTitle: "Mechanical Pillars",
      features: [
        {
          icon: "⚙️",
          title: "Authentic Gear Ratios",
          desc: "36, 24, and 18 teeth wheels interacting with real 1.5x and 1.33x physical gear reduction laws."
        },
        {
          icon: "🌓",
          title: "Dual-Theming Engine",
          desc: "Switch instantly between the vintage 19th-century Winter Solstice slate and the vibrant Neo-Summer Solstice layout."
        },
        {
          icon: "🔊",
          title: "Synthesized Audio Escapement",
          desc: "Low-latency mechanical tooth clicks and victory chimes generated in real-time via the Web Audio API."
        },
        {
          icon: "🌍",
          title: "Bilingual Telemetry HUD",
          desc: "Full technical dashboard tracking real-time angles, Chronos XP, and astronomical hints in EN/FR."
        }
      ]
    },
    fr: {
       subtitle: "Une expérience de code créatif",
       passionTitle: "L'Art & La Philosophie",
       passionText: "Né d'une véritable passion pour l'horlogerie mécanique et le modding de montres, ce projet est un pont entre l'artisanat traditionnel et le code créatif. L'objectif est de traduire la beauté tactile, la précision mathématique et le flux fascinant des engrenages dans une expérience digitale interactive.",
       cta: "LANCER LE MÉCANISME",
       subCta: "START SIMULATION",
       signature: "Alex Koncept — À la croisée de l'IA, du DIY et de l'Horlogerie.",
       portfolio: "Portfolio",
       contact: "Contactez-nous",
       badgeText: "ÉDITION HORLOGERIE",
       themeLabel: "Thème : ",
       themeClassic: "Solstice d'Hiver",
       themeSummer: "Solstice d'Été",
       featuresTitle: "Piliers Mécaniques",
      features: [
        {
          icon: "⚙️",
          title: "Ratios Mécaniques Réels",
          desc: "Roues de 36, 24 et 18 dents interagissant avec des réductions physiques réelles de 1.5x et 1.33x."
        },
        {
          icon: "🌓",
          title: "Moteur de Thèmes Dual",
          desc: "Basculez instantanément entre l'ardoise du Solstice d'Hiver classique et le design dynamique du Solstice d'Été."
        },
        {
          icon: "🔊",
          title: "Audio Synthétisé",
          desc: "Clics de dents mécaniques à faible latence et carillons de victoire générés en temps réel via l'API Web Audio."
        },
        {
          icon: "🌍",
          title: "HUD Télémétrique Bilingue",
          desc: "Tableau de bord technique complet suivant en temps réel les angles, l'XP Chronos et les indices astronomiques."
        }
      ]
    }
  };

  const activeText = texts[language];

  // Sounds wrapper
  const handleStartClick = () => {
    watchAudio.playTick('solstice');
    onStart();
  };

  const isSummer = theme === 'summer';

  return (
    <div 
      id="landing-container" 
      className={`min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-10 antialiased selection:bg-pink-500/40 selection:text-pink-100 overflow-x-hidden relative transition-all duration-700 ${
        isSummer 
          ? 'bg-gradient-to-br from-[#FAFAF9] via-[#FFF1F2] to-[#FFE4E6] text-[#27272A]' 
          : 'bg-gradient-to-br from-[#0B0D0F] via-[#0E1114] to-[#161B22] text-[#E2E8F0]'
      }`}
    >
      
      {/* Absolute design accents - Neon backing glow lights */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {isSummer ? (
          <>
            {/* Extremely vibrant sunny golden/rose backing glows */}
            <div className="absolute top-[5%] left-[10%] w-[55%] h-[55%] bg-pink-400/25 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[10%] right-[5%] w-[50%] h-[50%] bg-amber-300/20 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: '10s' }} />
            <div className="absolute top-[40%] left-[35%] w-[40%] h-[40%] bg-cyan-300/15 rounded-full blur-[130px]" />
          </>
        ) : (
          <>
            {/* Classic starry night winter amber backing glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4A359]/6 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/4 rounded-full blur-[130px]" />
            <div className="absolute top-[35%] right-[20%] w-[35%] h-[35%] bg-slate-500/3 rounded-full blur-[100px]" />
          </>
        )}
        
        {/* Subtle grid lines background overlay */}
        <div className={`absolute inset-0 opacity-[0.045] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]`} />
      </div>

      {/* Header Bar */}
      <header id="landing-header" className={`w-full max-w-6xl mx-auto flex justify-between items-center z-10 py-2 border-b select-none transition-colors duration-500 ${
        isSummer ? 'border-pink-200/60' : 'border-white/5'
      }`}>
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className={`w-10 h-10 object-contain rounded-xl border p-1 transition-all duration-300 hover:scale-105 ${
              isSummer 
                ? 'bg-white/80 border-pink-200/60 shadow-[0_4px_12px_rgba(236,72,153,0.06)]' 
                : 'bg-black/35 border-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
            }`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Theme and Language Selection Group */}
        <div className="flex flex-wrap items-center gap-3.5">
          {/* Celestial Globe Theme Switcher */}
          <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border shadow-md transition-all duration-500 ${
            isSummer ? 'bg-white/80 border-pink-200 backdrop-blur-md shadow-[0_4px_20px_rgba(236,72,153,0.06)]' : 'bg-[#12161A]/80 border-slate-800'
          }`}>
            {/* Winter Solstice Label */}
            <button
              onClick={() => {
                if (theme !== 'classic') {
                  setTheme('classic');
                  watchAudio.playTick('clank');
                }
              }}
              className={`text-[10px] font-mono leading-none transition-all duration-300 hover:text-slate-800 cursor-pointer ${
                theme === 'classic'
                  ? 'font-bold text-[#D4A359]'
                  : isSummer ? 'text-stone-400' : 'text-slate-500'
              }`}
            >
              {activeText.themeClassic}
            </button>

            {/* Split globe toggle button */}
            <CelestialGlobeToggle
              theme={theme}
              onToggle={onToggleTheme}
            />

            {/* Summer Solstice Label */}
            <button
              onClick={() => {
                if (theme !== 'summer') {
                  setTheme('summer');
                  watchAudio.playTick('solstice');
                }
              }}
              className={`text-[10px] font-mono leading-none transition-all duration-300 hover:text-slate-800 cursor-pointer ${
                theme === 'summer'
                  ? 'font-bold text-pink-600'
                  : 'text-slate-500'
              }`}
            >
              {activeText.themeSummer}
            </button>
          </div>

          {/* Language selector segmented control */}
          <div className={`flex border rounded-xl p-0.5 shadow-md transition-all duration-500 ${
            isSummer ? 'bg-white/80 border-pink-200' : 'bg-[#12161A]/80 border-slate-800'
          }`}>
            <button
              onClick={() => {
                setLanguage('en');
                watchAudio.playTick('clank');
              }}
              className={`px-3 py-1 text-[10px] font-mono font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                language === 'en'
                  ? isSummer 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow'
                    : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow'
                  : isSummer 
                    ? 'text-stone-500 hover:text-stone-800' 
                    : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => {
                setLanguage('fr');
                watchAudio.playTick('clank');
              }}
              className={`px-3 py-1 text-[10px] font-mono font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                language === 'fr'
                  ? isSummer 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow'
                    : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow'
                  : isSummer 
                    ? 'text-stone-500 hover:text-stone-800' 
                    : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              FR
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Hero */}
      <main id="landing-main" className="w-full max-w-5xl mx-auto z-10 flex flex-col items-center justify-center py-10 md:py-16 space-y-12 animate-fade-in">
        
        {/* Real-time elegant revolving gear visual representation */}
        <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
          {/* Outer Sun gear (36 teeth equivalent layout) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center opacity-90"
          >
            <svg viewBox="0 0 100 100" className={`w-full h-full transition-colors duration-500 ${isSummer ? 'text-pink-600/90' : 'text-[#D4A359]'}`}>
              <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3 3" />
              {/* Teeth ticks */}
              {[...Array(36)].map((_, i) => (
                <rect
                  key={i}
                  x="48.5"
                  y="6"
                  width="3"
                  height="7"
                  rx="1"
                  fill="currentColor"
                  transform={`rotate(${(i * 360) / 36} 50 50)`}
                />
              ))}
              <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.5" fill="none" />
              {/* Inner Spokes */}
              {Array.from({ length: 6 }).map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  transform={`rotate(${(i * 360) / 6} 50 50)`}
                />
              ))}
            </svg>
          </motion.div>

          {/* Intermediary Moon gear (24 teeth equivalent layout) */}
          <motion.div
            animate={{ rotate: -540 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute w-24 h-24 -mt-10 -ml-16 flex items-center justify-center opacity-80"
          >
            <svg viewBox="0 0 100 100" className={`w-full h-full transition-colors duration-500 ${isSummer ? 'text-cyan-500/90' : 'text-blue-400'}`}>
              <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 4" />
              {/* Teeth ticks */}
              {[...Array(24)].map((_, i) => (
                <rect
                  key={i}
                  x="48.5"
                  y="6"
                  width="3"
                  height="7"
                  rx="1"
                  fill="currentColor"
                  transform={`rotate(${(i * 360) / 24} 50 50)`}
                />
              ))}
              {/* Inner Moon Spokes */}
              {Array.from({ length: 4 }).map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  transform={`rotate(${(i * 360) / 4} 50 50)`}
                />
              ))}
            </svg>
          </motion.div>

          {/* Sol Core Pivot center */}
          <div className={`absolute w-12 h-12 rounded-full border flex items-center justify-center shadow-lg transition-all duration-500 ${
            isSummer 
              ? 'bg-white border-pink-500/40 shadow-pink-500/25' 
              : 'bg-[#12161A] border-[#06B6D4]/40 shadow-cyan-500/20'
          }`}>
            <Compass className={`w-5 h-5 animate-pulse transition-colors duration-500 ${isSummer ? 'text-pink-600' : 'text-[#06B6D4]'}`} />
          </div>
        </div>

        {/* Hero Brand Title and Badge */}
        <div className="text-center space-y-3">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono text-[9px] tracking-widest uppercase font-bold shadow-sm transition-all duration-500 ${
            isSummer 
              ? 'bg-pink-100/80 border-pink-200/60 text-pink-700' 
              : 'bg-amber-500/10 border-amber-500/20 text-transparent bg-clip-text bg-gradient-to-r from-[#D4A359] via-slate-200 to-amber-200'
          }`}>
            <Sparkles className="w-3 h-3 text-pink-500" />
            by Alex Koncept
          </div>
          
          <h1 className={`font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r drop-shadow transition-all duration-500 ${
            isSummer
              ? 'from-[#3A043B] via-[#9D174D] to-[#4C0519]'
              : 'from-slate-50 via-slate-100 to-slate-400'
          }`}>
            The Clockwork Solstice
          </h1>

          <p className={`font-mono text-xs sm:text-sm tracking-wide font-medium transition-all duration-500 ${
            isSummer ? 'text-rose-950/80' : 'text-slate-400'
          }`}>
            {activeText.subtitle}
          </p>
        </div>

        {/* Passion & Story Quote Block (Personal craft highlight) with dynamic glassmorphism and backlight design */}
        <section 
          id="passion-section" 
          className={`w-full max-w-2xl border rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden group transition-all duration-500 ${
            isSummer 
              ? 'bg-white/80 border-pink-100 shadow-[0_8px_30px_rgba(23a,72,153,0.06)] backdrop-blur-xl' 
              : 'bg-[#12161A]/50 border-slate-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          }`}
        >
          {/* Subtle decor side indicators */}
          <div className={`absolute top-0 left-0 h-full w-1 transition-all duration-500 ${
            isSummer ? 'bg-gradient-to-b from-pink-500 to-rose-500' : 'bg-gradient-to-b from-[#D4A359] to-blue-500'
          }`} />
          
          <div className="space-y-4">
            <h3 className={`font-display text-[11px] font-bold tracking-widest uppercase flex items-center gap-2 transition-colors duration-500 ${
              isSummer ? 'text-pink-600' : 'text-[#D4A359]'
            }`}>
              <Compass className={`w-4 h-4 transition-colors duration-500 ${isSummer ? 'text-pink-600' : 'text-[#D4A359]'}`} />
              {activeText.passionTitle}
            </h3>
            
            <p className={`font-sans text-xs sm:text-sm font-normal leading-relaxed italic pr-2 transition-colors duration-500 ${
              isSummer ? 'text-stone-800' : 'text-slate-300'
            }`}>
              &ldquo;{activeText.passionText}&rdquo;
            </p>
          </div>
        </section>

        {/* Large Central Call-to-action Button with massive neon glow under summer solstice */}
        <div id="cta-container" className="flex flex-col items-center justify-center space-y-3 py-4 z-10 w-full max-w-xs">
          <button
            onClick={handleStartClick}
            onMouseEnter={() => {
              setIsHovered(true);
              watchAudio.playTick('clank');
            }}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full py-4 text-center text-xs font-mono font-black tracking-widest text-white rounded-xl shadow-2xl relative overflow-hidden group transition-all duration-300 transform active:scale-95 cursor-pointer border border-white/10"
            style={{
              background: isSummer 
                ? 'linear-gradient(135deg, #EC4899 0%, #FA5252 100%)' 
                : 'linear-gradient(135deg, #3B82F6 0%, #D4A359 100%)',
              boxShadow: isHovered 
                ? isSummer
                  ? '0 0 35px rgba(236,72,153,0.45)'
                  : '0 0 30px rgba(59, 130, 246, 0.4), 0 0 15px rgba(212, 163, 89, 0.4)'
                : isSummer
                  ? '0 10px 25px rgba(236, 72, 153, 0.15)'
                  : '0 10px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Shimmer overlay effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="flex items-center justify-center gap-2 relative z-10">
              {activeText.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </button>
          
          <p className={`font-mono text-[9px] tracking-widest text-center uppercase font-semibold transition-colors duration-500 ${
            isSummer ? 'text-rose-950/70' : 'text-[#A1A1AA]'
          }`}>
            {activeText.subCta}
          </p>
        </div>

        {/* Features Grid Showcase (The Pillars) */}
        <section id="features-section" className="w-full space-y-6 pt-4">
          <div className="text-center">
            <h2 className={`font-display text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-colors duration-500 ${
              isSummer ? 'text-rose-800' : 'text-slate-450'
            }`}>
              {activeText.featuresTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {activeText.features.map((feat, idx) => (
              <div
                key={idx}
                className={`border rounded-xl p-4 sm:p-5 flex gap-4 transition-all duration-300 backdrop-blur-lg hover:translate-y-[-2px] cursor-default ${
                  isSummer 
                    ? 'bg-white/85 border-pink-200/80 hover:bg-white hover:border-pink-300 hover:shadow-[0_8px_30px_rgba(236,72,153,0.08)]' 
                    : 'bg-[#12161A]/40 border-slate-800/80 hover:bg-[#12161A]/60 hover:border-slate-700/80 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                }`}
              >
                <div className="text-2xl pt-0.5 select-none shrink-0 filter drop-shadow">
                  {feat.icon}
                </div>
                <div className="space-y-1">
                  <h4 className={`font-display text-xs sm:text-sm font-semibold transition-colors duration-500 ${
                    isSummer ? 'text-pink-900' : 'text-slate-100'
                  }`}>
                    {feat.title}
                  </h4>
                  <p className={`font-sans text-xs transition-colors duration-500 ${
                    isSummer ? 'text-stone-600' : 'text-slate-400'
                  }`}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer Details */}
      <footer id="landing-footer" className={`w-full max-w-6xl mx-auto z-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-5 pb-2 font-mono text-[10px] transition-all duration-550 ${
        isSummer ? 'border-pink-200/80 text-stone-600' : 'border-white/5 text-slate-500'
      }`}>
        <p className="text-center sm:text-left transition-colors duration-500">
          {activeText.signature}
        </p>

        <div className="flex gap-4 items-center">
          <a
            href="https://alexkoncept.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors duration-200 flex items-center gap-1 ${
              isSummer ? 'hover:text-pink-700' : 'hover:text-slate-200'
            }`}
            onClick={() => watchAudio.playTick('clank')}
          >
            {activeText.portfolio}
          </a>
          <span className={`select-none ${isSummer ? 'text-pink-200' : 'text-white/10'}`}>|</span>
          <a
            href="mailto:contact@alexkoncept.com"
            className={`transition-colors duration-200 flex items-center gap-1 ${
              isSummer ? 'hover:text-pink-700' : 'hover:text-slate-200'
            }`}
            onClick={() => watchAudio.playTick('clank')}
          >
            {activeText.contact}
          </a>
        </div>
      </footer>

    </div>
  );
}
