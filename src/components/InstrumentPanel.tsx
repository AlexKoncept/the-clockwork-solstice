/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Settings, Volume2, VolumeX, Eye, EyeOff, RotateCcw, Activity } from 'lucide-react';
import { translations } from '../data/translations';

interface TelemetryData {
  angleA: number;
  angleB: number;
  angleC: number;
  ratioAB: number;
  ratioBC: number;
  speed: number;
  solved: boolean;
  solvedRatio: number;
}

interface InstrumentPanelProps {
  friction: number;
  setFriction: (v: number) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  laserActive: boolean;
  setLaserActive: (v: boolean) => void;
  onReset: () => void;
  telemetry: TelemetryData;
  language: 'en' | 'fr';
  theme: 'classic' | 'summer';
}

export default function InstrumentPanel({
  friction,
  setFriction,
  soundEnabled,
  setSoundEnabled,
  laserActive,
  setLaserActive,
  onReset,
  telemetry,
  language,
  theme,
}: InstrumentPanelProps) {

  const t = translations[language];
  const isSummer = theme === 'summer';

  // Convert angles block to nice readable degrees
  const degA = Math.round((telemetry.angleA * 180) / Math.PI) % 360;
  const degB = Math.round((telemetry.angleB * 180) / Math.PI) % 360;
  const degC = Math.round((telemetry.angleC * 180) / Math.PI) % 360;

  return (
    <div className={`transition-all duration-500 rounded-xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col gap-5 ${
      isSummer
        ? 'bg-[#18051E]/95 border border-pink-500/30'
        : 'bg-[#12161A]/95 border border-[#D4A359]/30'
    }`}>
      
      {/* Title Header */}
      <div className={`flex items-center justify-between border-b pb-3 transition-colors duration-500 ${
        isSummer ? 'border-pink-500/20' : 'border-[#D4A359]/20'
      }`}>
        <div className="flex items-center gap-2.5">
          <Settings className={`w-5 h-5 animate-spin-slow transition-colors duration-500 ${
            isSummer ? 'text-pink-500' : 'text-[#D4A359]'
          }`} />
          <h2 className={`font-display text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r tracking-wider uppercase transition-all duration-500 ${
            isSummer
              ? 'from-pink-500 to-[#06B6D4]'
              : 'from-[#FCD34D] to-[#D4A359]'
          }`}>
            {t.escapementControls}
          </h2>
        </div>
        <button
          onClick={onReset}
          className={`flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] rounded border transition-all duration-300 pointer-events-auto cursor-pointer ${
            isSummer
              ? 'text-pink-400 hover:text-[#18051E] bg-pink-500/10 hover:bg-pink-500 border-pink-500/30'
              : 'text-[#D4A359] hover:text-[#0B0D0F] bg-[#D4A359]/10 hover:bg-[#D4A359] border-[#D4A359]/30'
          }`}
          title="Align gears back to original solar position"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {t.resetCalibration}
        </button>
      </div>

      {/* Control Sliders */}
      <div className="space-y-4">
        {/* Momentum Inertia Friction Slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5 font-mono text-[10px] text-slate-400">
            <span>{t.frictionDecay}</span>
            <span className={`font-medium transition-colors duration-500 ${isSummer ? 'text-pink-400' : 'text-[#D4A359]'}`}>{friction.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0.90"
            max="0.995"
            step="0.005"
            value={friction}
            onChange={(e) => setFriction(parseFloat(e.target.value))}
            className={`w-full h-1.5 border rounded-lg appearance-none cursor-pointer transition-all duration-500 ${
              isSummer
                ? 'bg-[#110515] border-pink-500/20 accent-pink-500'
                : 'w-full h-1.5 bg-[#0B0D0F] border border-slate-800 accent-[#D4A359]'
            }`}
          />
          <div className="flex justify-between font-mono text-[8px] text-slate-500 mt-1">
            <span>{t.slippery} (0.90)</span>
            <span>{t.heavyDamp} (0.995)</span>
          </div>
        </div>

        {/* Audio escaping and Laser State buttons */}
        <div className="grid grid-cols-2 gap-3.5 pt-1">
          {/* Audio toggle button */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center justify-center gap-2 py-2 px-3 border rounded text-[11px] font-mono transition-all duration-300 cursor-pointer ${
              soundEnabled
                ? isSummer
                  ? 'bg-pink-500/10 text-pink-400 border-pink-500/40 hover:bg-pink-500/20'
                  : 'bg-amber-500/10 text-[#FCD34D] border-amber-500/40 hover:bg-amber-500/20'
                : 'bg-slate-900/40 text-slate-500 border-slate-800 hover:bg-slate-900/80'
            }`}
          >
            {soundEnabled ? (
              <>
                <span className={`w-2 h-2 rounded-full animate-ping ${isSummer ? 'bg-pink-500' : 'bg-[#EAB308]'}`} />
                {t.soundEcho}
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-slate-600" />
                {t.soundMuted}
              </>
            )}
          </button>

          {/* Laser Active Toggle */}
          <button
            onClick={() => setLaserActive(!laserActive)}
            className={`flex items-center justify-center gap-2 py-2 px-3 border rounded text-[11px] font-mono transition-all duration-300 cursor-pointer ${
              laserActive
                ? isSummer
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20'
                : 'bg-slate-900/40 text-slate-500 border-slate-800 hover:bg-slate-900/80'
            }`}
          >
            {laserActive ? (
              <>
                <Eye className={`w-3.5 h-3.5 ${isSummer ? 'text-cyan-400' : 'text-emerald-400'}`} />
                {t.laserEmitting}
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                {t.laserOffline}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mechanical Live Telemetry */}
      <div className={`border rounded-lg p-3.5 space-y-3 transition-all duration-500 ${
        isSummer ? 'bg-[#110515]/70 border-pink-500/10' : 'bg-[#0B0D0F]/70 border-slate-800'
      }`}>
        <div className={`flex items-center gap-2 border-b pb-1.5 transition-colors duration-500 ${
          isSummer ? 'border-pink-500/10' : 'border-slate-800'
        }`}>
          <Activity className={`w-3.5 h-3.5 transition-colors duration-500 ${isSummer ? 'text-[#06B6D4]' : 'text-[#D4A359]'}`} />
          <span className="font-display font-medium text-[10px] tracking-wider uppercase text-slate-300">
            {t.escapementTelemetry}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
          {/* Gear 1 stats */}
          <div className={`border rounded p-2 text-center transition-all duration-500 ${
            isSummer ? 'bg-[#240a2f] border-pink-500/20' : 'bg-[#12161A] border-[#D4A359]/15'
          }`}>
            <p className={`text-[8px] uppercase transition-colors duration-500 ${isSummer ? 'text-pink-400' : 'text-[#D4A359]'}`}>{t.sunDriver}</p>
            <p className="font-bold text-slate-200 mt-0.5">{degA}°</p>
            <p className="text-[8px] text-slate-500 mt-0.5">36 {t.teeth}</p>
          </div>

          {/* Gear 2 stats */}
          <div className={`border rounded p-2 text-center transition-all duration-500 ${
            isSummer ? 'bg-[#240a2f] border-orange-500/20' : 'bg-[#12161A] border-blue-500/15'
          }`}>
            <p className={`text-[8px] uppercase transition-colors duration-500 ${isSummer ? 'text-orange-400' : 'text-blue-400'}`}>{t.moonTransit}</p>
            <p className="font-bold text-slate-200 mt-0.5">{degB}°</p>
            <p className="text-[8px] text-slate-500 mt-0.5">24 {t.teeth}</p>
          </div>

          {/* Gear 3 stats */}
          <div className={`border rounded p-2 text-center transition-all duration-500 ${
            isSummer ? 'bg-[#240a2f] border-purple-500/20' : 'bg-[#12161A] border-pink-500/15'
          }`}>
            <p className={`text-[8px] uppercase transition-colors duration-500 ${isSummer ? 'text-purple-400' : 'text-pink-400'}`}>{t.solCrown}</p>
            <p className="font-bold text-slate-200 mt-0.5">{degC}°</p>
            <p className="text-[8px] text-slate-500 mt-0.5">18 {t.teeth}</p>
          </div>
        </div>

        {/* Transmission and ratios */}
        <div className={`space-y-1.5 font-mono text-[9px] text-slate-400 border-t pt-2 selection:bg-slate-800 transition-colors duration-500 ${
          isSummer ? 'border-pink-500/10' : 'border-slate-800/60'
        }`}>
          <div className="flex justify-between">
            <span>{t.linearVel}</span>
            <span className={`font-semibold transition-colors duration-500 ${
              Math.abs(telemetry.speed) > 0.001 
                ? isSummer 
                  ? 'text-pink-400' 
                  : 'text-amber-400' 
                : 'text-slate-500'
            }`}>
              {(Math.abs(telemetry.speed) * 100).toFixed(2)} {t.teethFs}
            </span>
          </div>

          <div className="flex justify-between">
            <span>{t.transmissionAB}</span>
            <span className={`font-semibold font-mono transition-colors duration-500 ${isSummer ? 'text-purple-300' : 'text-indigo-300'}`}>
              - (36/24) = 1.50x speed
            </span>
          </div>

          <div className="flex justify-between">
            <span>{t.transmissionBC}</span>
            <span className={`font-semibold font-mono transition-colors duration-500 ${isSummer ? 'text-purple-300' : 'text-indigo-300'}`}>
              - (24/18) = 1.33x speed
            </span>
          </div>

          <div className="flex justify-between">
            <span>{t.overallRatio}</span>
            <span className={`font-semibold font-mono transition-colors duration-500 ${isSummer ? 'text-cyan-400' : 'text-emerald-400'}`}>
              + (36/18) = 2.00x speed
            </span>
          </div>

          {/* Align solver gauge progress */}
          {laserActive && (
            <div className={`pt-2 border-t mt-1 transition-colors duration-500 ${isSummer ? 'border-pink-500/10' : 'border-slate-800/40'}`}>
              <div className="flex justify-between items-center mb-1">
                <span className={isSummer ? 'text-cyan-400' : 'text-emerald-400'}>{t.quantumCharge}</span>
                <span className={`font-bold ${isSummer ? 'text-cyan-300' : 'text-emerald-300'}`}>{Math.round(telemetry.solvedRatio * 100)}%</span>
              </div>
              <div className={`h-1 w-full rounded overflow-hidden transition-colors duration-500 ${isSummer ? 'bg-[#240a2f]' : 'bg-[#12161A]'}`}>
                <div 
                  className={`h-full bg-gradient-to-r transition-all duration-300 ${
                    isSummer 
                      ? 'from-cyan-500 via-purple-500 to-pink-500' 
                      : 'from-emerald-500 via-yellow-400 to-amber-400'
                  }`}
                  style={{ width: `${telemetry.solvedRatio * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
