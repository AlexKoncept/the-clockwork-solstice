/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, HelpCircle } from 'lucide-react';
import { translations } from '../data/translations';

interface WatchmakerJournalProps {
  language: 'en' | 'fr';
  theme: 'classic' | 'summer';
}

export default function WatchmakerJournal({ language, theme }: WatchmakerJournalProps) {
  const t = translations[language];
  const isSummer = theme === 'summer';

  return (
    <div className={`transition-all duration-500 rounded-xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden group ${
      isSummer 
        ? 'bg-[#18051E]/95 border border-pink-500/30' 
        : 'bg-[#12161A]/95 border border-[#D4A359]/30'
    }`}>
      {/* Decorative gold background glow */}
      <div className={`absolute -top-12 -left-12 w-24 h-24 rounded-full blur-2xl transition-all duration-700 ${
        isSummer
          ? 'bg-cyan-500/10 group-hover:bg-pink-500/15'
          : 'bg-[#D4A359]/5 group-hover:bg-[#D4A359]/10'
      }`} />
      
      {/* Journal Heading */}
      <div className={`flex items-center gap-3 border-b pb-3 mb-4 transition-colors duration-500 ${
        isSummer ? 'border-pink-500/20' : 'border-[#D4A359]/20'
      }`}>
        <BookOpen className={`w-5 h-5 animate-pulse transition-colors duration-500 ${
          isSummer ? 'text-[#06B6D4]' : 'text-[#D4A359]'
        }`} />
        <h2 className={`font-display text-lg font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500 ${
          isSummer 
            ? 'from-pink-500 via-purple-400 to-[#06B6D4]' 
            : 'from-[#FCD34D] to-[#D4A359]'
        }`}>
          {t.journalTitle}
        </h2>
      </div>

      <div className="space-y-4 text-xs font-sans text-slate-300 leading-relaxed max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {/* Entry 1 */}
        <div className={`border-l-2 pl-3 py-1 transition-colors duration-500 ${
          isSummer ? 'border-pink-500/40' : 'border-[#D4A359]/40'
        }`}>
          <p className={`font-mono text-[10px] mb-1 transition-colors duration-500 ${
            isSummer ? 'text-pink-400' : 'text-[#D4A359]'
          }`}>{t.entry1Title}</p>
          <p className="italic">
            {t.entry1Desc}
          </p>
        </div>

        {/* Entry 2 */}
        <div className={`border-l-2 pl-3 py-1 transition-colors duration-500 ${
          isSummer ? 'border-purple-500/40' : 'border-[#6D28D9]/40'
        }`}>
          <p className={`font-mono text-[10px] mb-1 transition-colors duration-500 ${
            isSummer ? 'text-purple-400' : 'text-amber-500'
          }`}>{t.entry2Title}</p>
          <p>
            {t.entry2Desc}
          </p>
        </div>

        {/* Entry 3 */}
        <div className={`border-l-2 pl-3 py-1 transition-colors duration-500 ${
          isSummer ? 'border-cyan-500/40' : 'border-[#10B981]/40'
        }`}>
          <p className={`font-mono text-[10px] mb-1 transition-colors duration-500 ${
            isSummer ? 'text-cyan-300' : 'text-emerald-400'
          }`}>{t.entry3Title}</p>
          <p className={isSummer ? 'text-cyan-200' : 'text-emerald-300'}>
            {t.entry3Desc}
          </p>
        </div>
      </div>

      {/* Mechanics Guidelines Footer Quick Checklist */}
      <div className={`mt-5 pt-3 border-t transition-colors duration-500 ${
        isSummer ? 'border-pink-500/10' : 'border-[#D4A359]/10'
      }`}>
        <div className={`flex items-center gap-2 mb-2 transition-colors duration-500 ${
          isSummer ? 'text-[#06B6D4]' : 'text-[#D4A359]'
        }`}>
          <HelpCircle className="w-4 h-4" />
          <span className="font-display font-medium text-[11px] tracking-wider uppercase">{t.protocolTitle}</span>
        </div>
        <ul className="space-y-1.5 font-mono text-[10px] text-slate-400">
          <li className="flex items-start gap-1.5">
            <span className={isSummer ? 'text-pink-500' : 'text-[#D4A359]'}>•</span>
            <span><strong className={isSummer ? 'text-pink-300' : 'text-slate-200'}>{t.protocolWind}</strong> {t.protocolWindDesc}</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className={isSummer ? 'text-purple-500' : 'text-[#D4A359]'}>•</span>
            <span><strong className={isSummer ? 'text-purple-300' : 'text-slate-200'}>{t.protocolInertia}</strong> {t.protocolInertiaDesc}</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className={isSummer ? 'text-cyan-500' : 'text-[#D4A359]'}>•</span>
            <span><strong className={isSummer ? 'text-cyan-300' : 'text-slate-200'}>{t.protocolRefraction}</strong> {t.protocolRefractionDesc}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
