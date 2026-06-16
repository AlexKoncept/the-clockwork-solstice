/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import GearSolarium from './components/GearSolarium';
import InstrumentPanel from './components/InstrumentPanel';
import WatchmakerJournal from './components/WatchmakerJournal';
import { GAME_LEVELS } from './data/levels';
import { Sun, Sparkles, Sliders, Info, Zap, ChevronRight, RefreshCw, Trophy } from 'lucide-react';
import { watchAudio } from './utils/audio';
import { translations } from './data/translations';
import LandingPage from './components/LandingPage';
import CelestialGlobeToggle from './components/CelestialGlobeToggle';
import { motion } from 'motion/react';

export default function App() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [theme, setTheme] = useState<'classic' | 'summer'>('classic');
  const [showGame, setShowGame] = useState<boolean>(false);

  // Shared mechanical parameters
  const [friction, setFriction] = useState<number>(0.985);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [laserActive, setLaserActive] = useState<boolean>(true);
  const [resetKey, setResetKey] = useState<number>(0);

  // Level Progression States
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(0);
  const currentLevel = GAME_LEVELS[currentLevelIndex];

  const t = translations[language];

  // Twilight timer representation of the setting sun
  const [timeLeft, setTimeLeft] = useState<number>(currentLevel.timeLimit);
  const [score, setScore] = useState<number>(0);
  const [isVictoryActive, setIsVictoryActive] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Live telemetry readings synchronized from the physical canvas loop
  const [telemetry, setTelemetry] = useState({
    angleA: 0,
    angleB: 0,
    angleC: 0,
    ratioAB: 1.5,
    ratioBC: 1.33,
    speed: 0,
    solved: false,
    solvedRatio: 0,
  });

  // Level Swapping side effect, resetting time levels
  useEffect(() => {
    setTimeLeft(currentLevel.timeLimit);
    setIsGameOver(false);
    setIsVictoryActive(false);
  }, [currentLevelIndex]);

  // Synchronize and manage countdown clock intervals
  useEffect(() => {
    // If we won or lost, freeze the countdown clock
    if (isVictoryActive || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          watchAudio.playTick('esc'); // Play retro power-down alarm sounds
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVictoryActive, isGameOver, currentLevelIndex]);

  // Handler to trigger recalibration
  const handleResetCalibration = () => {
    setResetKey((prev) => prev + 1);
  };

  // Victory Sequence callback
  const handleLevelSolved = () => {
    if (isVictoryActive || isGameOver) return;
    setIsVictoryActive(true);

    // Calculate score: remaining times * current level difficulty + base completion reward
    const speedRatio = 1.0 + (timeLeft / currentLevel.timeLimit) * 1.5;
    const baseReward = 1000;
    const bonus = Math.round(timeLeft * 25 * speedRatio);
    setScore((prev) => prev + baseReward + bonus);

    // Transition smoothly to next stage after 2.5s duration
    setTimeout(() => {
      setIsVictoryActive(false);
      setCurrentLevelIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < GAME_LEVELS.length) {
          return nextIndex;
        } else {
          // Finished all levels! Loop back to first stage for endless practice
          return 0;
        }
      });
    }, 2500);
  };

  // Game over rewind timer retry logic
  const handleRetryLevel = () => {
    setIsGameOver(false);
    setTimeLeft(currentLevel.timeLimit);
    handleResetCalibration();
  };

  const toggleTheme = () => {
    if (theme === 'classic') {
      setTheme('summer');
      watchAudio.playTick('solstice');
    } else {
      setTheme('classic');
      watchAudio.playTick('clank');
    }
  };

  if (!showGame) {
    return (
      <LandingPage
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        onToggleTheme={toggleTheme}
        onStart={() => setShowGame(true)}
      />
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen ${theme === 'summer' ? 'bg-[#0f0514] text-[#FDF2F8]' : 'bg-[#07090A] text-[#E2E8F0]'} selection:bg-amber-500/30 selection:text-amber-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 antialiased transition-colors duration-500`}
    >
      {/* Visual background atmospheric elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] ${theme === 'summer' ? 'bg-pink-500/5' : 'bg-[#D4A359]/3'} rounded-full blur-[120px] transition-all duration-500`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] ${theme === 'summer' ? 'bg-cyan-500/4' : 'bg-blue-500/2'} rounded-full blur-[120px] transition-all duration-500`} />
      </div>

      <div className="max-w-7xl mx-auto w-full z-10 space-y-6">
        {/* Header - Watchmaker Atelier Title Panel */}
        <header className={`flex flex-col md:flex-row md:items-center justify-between gap-5 border-b pb-5 select-none transition-colors duration-500 ${
          theme === 'summer' ? 'border-pink-500/15' : 'border-[#D4A359]/15'
        }`}>
          <div className="space-y-1.5 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-5.5 h-5.5 object-contain rounded-md border border-white/10"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Sun className={`w-5 h-5 animate-spin-slow transition-colors duration-500 ${theme === 'summer' ? 'text-pink-500' : 'text-[#FCD34D]'}`} />
              <span className={`font-mono text-[9px] tracking-widest uppercase font-semibold transition-colors duration-500 ${
                theme === 'summer' ? 'text-pink-400' : 'text-[#D4A359]'
              }`}>
                {t.labLab}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 flex flex-wrap items-center gap-2.5">
              <span>{t.title}</span>
              <span className={`text-[9px] font-mono uppercase border rounded px-2 py-0.5 tracking-widest leading-none font-semibold transition-all duration-500 ${
                theme === 'summer' 
                  ? 'bg-pink-500/15 text-pink-400 border-pink-500/35' 
                  : 'bg-[#D4A359]/15 text-[#FCD34D] border border-[#D4A359]/35'
              }`}>
                by Alex Koncept
              </span>
            </h1>
            <p className="font-sans text-xs text-slate-400">
              {t.subtitle}
            </p>
          </div>

          {/* Core Level, Alignment Badge and Language Selector */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Highly tactile premium language segmented control */}
            <div className={`flex rounded-xl p-1 shadow-md border transition-all duration-500 ${
              theme === 'summer' ? 'bg-[#18051E]/90 border-pink-500/20' : 'bg-[#12161A]/80 border-slate-800'
            }`}>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-[10px] font-mono font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                  language === 'en'
                    ? theme === 'summer'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-[#D4A359] text-[#07090A]'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1 text-[10px] font-mono font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                  language === 'fr'
                    ? theme === 'summer'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-[#D4A359] text-[#07090A]'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                FR
              </button>
            </div>

            {/* Highly tactile premium theme switcher with Celestial Globe */}
            <div className={`flex items-center gap-2.5 rounded-xl px-3 py-1.5 shadow-md border transition-all duration-500 ${
              theme === 'summer' ? 'bg-[#18051E]/90 border-pink-500/20' : 'bg-[#12161A]/80 border-slate-800'
            }`}>
              <div className={`flex items-center pr-1.5 border-r transition-colors duration-500 ${
                theme === 'summer' ? 'border-pink-500/10' : 'border-slate-800'
              }`}>
                <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest font-semibold leading-none">
                  {t.themeLabel}
                </span>
              </div>
              
              {/* Winter Solstice Label */}
              <button
                onClick={() => {
                  if (theme !== 'classic') {
                    setTheme('classic');
                    watchAudio.playTick('clank');
                  }
                }}
                className={`text-[10px] font-mono leading-none transition-all duration-300 hover:text-slate-200 cursor-pointer ${
                  theme === 'classic'
                    ? 'font-bold text-[#D4A359]'
                    : 'text-slate-500'
                }`}
              >
                {t.themeClassic}
              </button>

              {/* The split physical interactive globe */}
              <CelestialGlobeToggle
                theme={theme}
                onToggle={toggleTheme}
              />

              {/* Summer Solstice Label */}
              <button
                onClick={() => {
                  if (theme !== 'summer') {
                    setTheme('summer');
                    watchAudio.playTick('solstice');
                  }
                }}
                className={`text-[10px] font-mono leading-none transition-all duration-300 hover:text-slate-200 cursor-pointer ${
                  theme === 'summer'
                    ? 'font-bold text-pink-500'
                    : 'text-slate-500'
                }`}
              >
                {t.themeSummer}
              </button>
            </div>

            {/* Live Score/XP Display */}
            <div className={`hidden sm:flex items-center gap-2.5 rounded-xl px-4 py-2 border transition-all duration-500 ${
              theme === 'summer' ? 'bg-[#18051E]/70 border-pink-500/25' : 'bg-[#12161A]/60 border-slate-800/80'
            }`}>
              <Trophy className={`w-4 h-4 transition-colors duration-500 ${theme === 'summer' ? 'text-pink-400' : 'text-amber-400'}`} />
              <div className="font-mono text-left leading-tight">
                <span className="block text-[7px] text-slate-400 uppercase tracking-widest font-semibold">{t.totalXP}</span>
                <span className="text-xs font-bold text-slate-200">{score} pts</span>
              </div>
            </div>

            <div className={`flex items-center gap-3 rounded-xl p-3 shadow-lg border transition-all duration-500 ${
              theme === 'summer' ? 'bg-[#18051E]/90 border-pink-500/25' : 'bg-[#12161A]/80 border-[#D4A359]/25'
            }`}>
              <div className={`p-2 rounded-lg transition-all duration-500 ${
                theme === 'summer' ? 'bg-pink-500/10 text-pink-400' : 'bg-[#D4A359]/10 text-[#FCD34D]'
              }`}>
                <Zap className={`w-5 h-5 ${telemetry.solved ? 'animate-bounce text-emerald-400' : ''}`} />
              </div>
              <div>
                <p className="font-mono text-[8px] text-slate-400 uppercase tracking-wider">{t.statusLvl.replace('{num}', (currentLevelIndex + 1).toString())}</p>
                <p className={`font-display text-xs font-semibold uppercase tracking-wide transition-colors duration-500 ${
                  telemetry.solved 
                    ? 'text-emerald-400 animate-pulse' 
                    : theme === 'summer' ? 'text-pink-400' : 'text-[#D4A359]'
                }`}>
                  {telemetry.solved ? t.solsticeAligned : t.seekingAlignment}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Solarium Canvas (Left side takes 2 cols on big desktops) */}
          <div className="lg:col-span-2 space-y-4">
            <GearSolarium
              friction={friction}
              soundEnabled={soundEnabled}
              laserActive={laserActive}
              currentLevel={currentLevel}
              timeLeft={timeLeft}
              timeLimit={currentLevel.timeLimit}
              score={score}
              isVictoryActive={isVictoryActive}
              isGameOver={isGameOver}
              resetKey={resetKey}
              onUpdateTelemetry={setTelemetry}
              onSolvedTriggered={handleLevelSolved}
              onRetryLevel={handleRetryLevel}
              language={language}
              theme={theme}
            />

            {/* Quick Calibration Helper Alert Box */}
            <div className={`rounded-xl p-4 flex gap-3.5 items-start border transition-all duration-500 ${
              theme === 'summer' ? 'bg-[#18051E]/50 border-pink-500/15' : 'bg-[#12161A]/50 border-slate-800'
            }`}>
              <Info className={`w-5 h-5 shrink-0 mt-0.5 transition-colors duration-500 ${theme === 'summer' ? 'text-cyan-400' : 'text-indigo-400'}`} />
              <div className="space-y-1 text-xs text-slate-400">
                <p className="font-display font-medium text-slate-200">
                  {t.objectiveTitle}
                </p>
                <p className="leading-relaxed">
                  {t.objectiveText.replace('{name}', t.levels[currentLevel.id as 1 | 2 | 3 | 4]?.name || currentLevel.name)}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Panel - Controls & Lore Journal */}
          <div className="space-y-6 flex flex-col">
            {/* Physics and sound controls */}
            <InstrumentPanel
              friction={friction}
              setFriction={setFriction}
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
              laserActive={laserActive}
              setLaserActive={setLaserActive}
              onReset={handleResetCalibration}
              telemetry={telemetry}
              language={language}
              theme={theme}
            />

            {/* In-universe journal stories */}
            <WatchmakerJournal language={language} theme={theme} />
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className={`max-w-7xl mx-auto w-full text-center py-6 mt-12 border-t border-dashed text-[10px] text-slate-500 space-y-2 select-none transition-colors duration-500 ${
        theme === 'summer' ? 'border-pink-500/10' : 'border-slate-900'
      }`}>
        <p className="font-display">
          {t.designerSignature}
        </p>
        <p className={`font-mono text-[8px] tracking-widest transition-colors duration-500 ${
          theme === 'summer' ? 'text-pink-500/40' : 'text-[#D4A359]/40'
        }`}>
          {t.rightsReserved}
        </p>
      </footer>
    </motion.main>
  );
}
