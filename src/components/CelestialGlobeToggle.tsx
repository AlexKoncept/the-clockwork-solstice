/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

interface CelestialGlobeToggleProps {
  theme: 'classic' | 'summer';
  onToggle: () => void;
}

export default function CelestialGlobeToggle({ theme, onToggle }: CelestialGlobeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative w-7 h-7 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 focus:outline-none border border-white/30 shadow-[0_0_8px_rgba(236,72,153,0.1)] flex items-center justify-center overflow-hidden shrink-0"
      style={{
        background: 'linear-gradient(90deg, #0B0D0F 50%, #EC4899 50%)'
      }}
      title={theme === 'classic' ? 'Switch to Summer Solstice' : 'Switch to Winter Solstice'}
    >
      {/* Inner decorative orbit axis line */}
      <div className="absolute inset-y-0 left-[13px] w-[1px] bg-white/20" />
      {/* Dynamic central core pin */}
      <div className="w-1 h-1 rounded-full bg-white/70 absolute" />
      {/* Subtle overlay glow */}
      <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
        theme === 'summer' 
          ? 'bg-pink-500/10' 
          : 'bg-[#D4A359]/5'
      }`} />
    </button>
  );
}
