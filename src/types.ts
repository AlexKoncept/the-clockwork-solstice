/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Gear {
  id: string;
  name: string;
  x: number;
  y: number;
  radius: number;
  numTeeth: number;
  currentAngle: number; // in radians
  rotationSpeed: number; // in radians/frame (angular velocity)
  color: string; // Hex styling
  accentColor: string; // Accent color for astronomical engravings
  role: 'driver' | 'driven';
  description: string;
}

export interface LaserMirror {
  id: string;
  gearId: string; // The gear to which this mirror is mounted
  relativeAngle: number; // Angle relative to the gear's orientation
  distance: number; // Radius/distance from gear center
  width: number; // Width of the reflecting surface
  active: boolean;
}

export interface LightRay {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  intensity: number;
  active: boolean;
}

export interface SolsticeState {
  isCharging: boolean;
  chargePercentage: number;
  solved: boolean;
}
