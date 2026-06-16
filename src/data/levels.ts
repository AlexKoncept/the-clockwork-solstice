/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Level {
  id: number;
  name: string;
  description: string;
  timeLimit: number; // in seconds
  startAngleA: number; // in radians
  receptorPos: { x: number; y: number; radius: number };
  mirrorAOffset: number; // relative Angle on Gear A
  mirrorBOffset: number; // relative Angle on Gear B
  hint: string;
}

export const GAME_LEVELS: Level[] = [
  {
    id: 1,
    name: "Dawn Alignment",
    description: "Align the golden Sun drive wheel to route the starting solar array light ray. Watch for the 1.5x Moon gear acceleration.",
    timeLimit: 60,
    startAngleA: 0.15,
    receptorPos: { x: 690, y: 260, radius: 28 },
    mirrorAOffset: 0.85,
    mirrorBOffset: -0.45,
    hint: "Rotate the main wheel to around 55° - 68° so that the two mirrors align and reflect the beam."
  },
  {
    id: 2,
    name: "Zenith Convergence",
    description: "The Celestial alignment has shifted. The Moon transit mirror has calibrated to a negative offset, forcing a tighter counter-rotation.",
    timeLimit: 45,
    startAngleA: 1.25,
    receptorPos: { x: 690, y: 210, radius: 24 }, // Moved higher up & narrower
    mirrorAOffset: 1.45,
    mirrorBOffset: -0.95,
    hint: "Requires a counter-turn. Try rotating the primary wheel backwards (counter-clockwise) to match our high solar receiver."
  },
  {
    id: 3,
    name: "Astrolabe Resonance",
    description: "The engine's receptor moves deep into the lower gears' shadows. Double deflection requires meticulous winding precision.",
    timeLimit: 40,
    startAngleA: 3.14,
    receptorPos: { x: 650, y: 340, radius: 22 }, // Lower receptor position
    mirrorAOffset: -0.65,
    mirrorBOffset: 0.75,
    hint: "A deeper angle deflection. Rotate slowly. The friction slider can help you make steady micro-adjustments."
  },
  {
    id: 4,
    name: "The Crown Eclipse",
    description: "Our final celestial gateway. Extremely narrow target aperture requires perfect balance. Beware of the high inertia speed slip!",
    timeLimit: 30,
    startAngleA: 4.5,
    receptorPos: { x: 710, y: 290, radius: 18 }, // Super small and far target!
    mirrorAOffset: 2.10,
    mirrorBOffset: -1.35,
    hint: "The solstice crown of watchmaking. Adjust your speed down, and use scroll winding for extreme micron alignments."
  }
];
