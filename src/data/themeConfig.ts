/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ThemeColors {
  bg: string;
  grid: string;
  rings: string;
  ringsText: string;
  connectorsOuter: string;
  connectorsInner: string;
  laserLit: string;
  laserLitGlow: string;
  laserUnlit: string;
  laserUnlitGlow: string;
  particles: string[];
  gears: {
    gear_a: { color: string; accentColor: string };
    gear_b: { color: string; accentColor: string };
    gear_c: { color: string; accentColor: string };
  };
  receptorAuraLit: string;
  receptorAuraUnlit: string;
  receptorOuterLit: string;
  receptorOuterUnlit: string;
  receptorGemLit: string;
  receptorGemUnlit: string;
  receptorGemStrokeLit: string;
  receptorGemStrokeUnlit: string;
  receptorLabelLit: string;
  receptorLabelUnlit: string;
  pivotColorDriver: string;
  pivotColorDriven: string;
}

export const themeConfig: Record<'classic' | 'summer', ThemeColors> = {
  classic: {
    bg: '#0B0D0F',
    grid: '#12161A',
    rings: 'rgba(212, 163, 89, 0.04)',
    ringsText: 'rgba(212, 163, 89, 0.25)',
    connectorsOuter: '#222B32',
    connectorsInner: '#0F1316',
    laserLit: 'rgba(52, 211, 153, 0.85)',
    laserLitGlow: '#10B981',
    laserUnlit: 'rgba(251, 146, 60, 0.75)',
    laserUnlitGlow: '#F97316',
    particles: ['#34D399', '#059669', '#10B981', '#6EE7B7', '#FCD34D'],
    gears: {
      gear_a: { color: '#D4A359', accentColor: '#FCD34D' },
      gear_b: { color: '#475569', accentColor: '#60A5FA' },
      gear_c: { color: '#854D0E', accentColor: '#F472B6' },
    },
    receptorAuraLit: 'rgba(52, 211, 153, 0.4)',
    receptorAuraUnlit: 'rgba(234, 179, 8, 0.25)',
    receptorOuterLit: '#10B981',
    receptorOuterUnlit: '#B45309',
    receptorGemLit: '#10B981',
    receptorGemUnlit: '#78350F',
    receptorGemStrokeLit: '#34D399',
    receptorGemStrokeUnlit: '#D4A359',
    receptorLabelLit: '#10B981',
    receptorLabelUnlit: '#F1F5F9',
    pivotColorDriver: '#EF4444',
    pivotColorDriven: '#10B981',
  },
  summer: {
    bg: '#1e0c25',
    grid: '#3a134a',
    rings: 'rgba(244, 63, 94, 0.08)',
    ringsText: 'rgba(244, 63, 94, 0.35)',
    connectorsOuter: '#3d1645',
    connectorsInner: '#18051e',
    laserLit: 'rgba(6, 182, 212, 0.9)',
    laserLitGlow: '#06B6D4',
    laserUnlit: 'rgba(244, 63, 94, 0.8)',
    laserUnlitGlow: '#E11D48',
    particles: ['#22D3EE', '#0891B2', '#06B6D4', '#67E8F9', '#F43F5E', '#F97316'],
    gears: {
      gear_a: { color: '#F43F5E', accentColor: '#FDA4AF' },
      gear_b: { color: '#F97316', accentColor: '#FDBA74' },
      gear_c: { color: '#D946EF', accentColor: '#F5D0FE' },
    },
    receptorAuraLit: 'rgba(34, 211, 238, 0.45)',
    receptorAuraUnlit: 'rgba(244, 63, 94, 0.35)',
    receptorOuterLit: '#06B6D4',
    receptorOuterUnlit: '#BE123C',
    receptorGemLit: '#06B6D4',
    receptorGemUnlit: '#5B112D',
    receptorGemStrokeLit: '#22D3EE',
    receptorGemStrokeUnlit: '#F43F5E',
    receptorLabelLit: '#06B6D4',
    receptorLabelUnlit: '#FDF2F8',
    pivotColorDriver: '#F43F5E',
    pivotColorDriven: '#06B6D4',
  },
};
