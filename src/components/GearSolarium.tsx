/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Gear, LaserMirror, LightRay } from '../types';
import { watchAudio } from '../utils/audio';
import { Level } from '../data/levels';
import { AlertCircle, HelpCircle, Sparkles, Sun, RotateCcw, Info } from 'lucide-react';
import { translations } from '../data/translations';
import { themeConfig } from '../data/themeConfig';

interface Point {
  x: number;
  y: number;
}

interface GearSolariumProps {
  friction: number;
  soundEnabled: boolean;
  laserActive: boolean;
  currentLevel: Level;
  timeLeft: number;
  timeLimit: number;
  score: number;
  isVictoryActive: boolean;
  isGameOver: boolean;
  resetKey: number;
  onUpdateTelemetry: (data: {
    angleA: number;
    angleB: number;
    angleC: number;
    ratioAB: number;
    ratioBC: number;
    speed: number;
    solved: boolean;
    solvedRatio: number;
  }) => void;
  onSolvedTriggered: () => void;
  onRetryLevel: () => void;
  language: 'en' | 'fr';
  theme: 'classic' | 'summer';
}

export default function GearSolarium({
  friction,
  soundEnabled,
  laserActive,
  currentLevel,
  timeLeft,
  timeLimit,
  score,
  isVictoryActive,
  isGameOver,
  resetKey,
  onUpdateTelemetry,
  onSolvedTriggered,
  onRetryLevel,
  language,
  theme,
}: GearSolariumProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const t = translations[language];

  // Keep mechanical rotation angles bound inside [0, 2PI)
  const wrapAngle = (angle: number): number => {
    return ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  };

  // State to toggle manual in-screen Hint drawer overlay
  const [showHint, setShowHint] = useState<boolean>(false);

  // Trigger calibration reset when resetKey changes or level switches
  useEffect(() => {
    setGears((prev) => {
      const copy = prev.map((g) => ({ ...g }));
      copy[0].currentAngle = currentLevel.startAngleA; // default starting angle
      copy[0].rotationSpeed = 0;

      // Calculate initial mesh angles for B and C
      const ratioAB = 36 / 24;
      const ratioBC = 24 / 18;
      const phi_ab = -0.3; // contact angle
      const offset_b = phi_ab * (1 + ratioAB) + Math.PI / 24; 
      copy[1].currentAngle = wrapAngle(-currentLevel.startAngleA * ratioAB + offset_b);
      copy[1].rotationSpeed = 0;

      const phi_bc = 0.8; // contact angle
      const offset_c = phi_bc * (1 + ratioBC) + Math.PI / 18;
      copy[2].currentAngle = wrapAngle(-copy[1].currentAngle * ratioBC + offset_c);
      copy[2].rotationSpeed = 0;

      return copy;
    });

    setMirrors([
      {
        id: 'mirror_a',
        gearId: 'gear_a',
        relativeAngle: currentLevel.mirrorAOffset,
        distance: 65,
        width: 32,
        active: true,
      },
      {
        id: 'mirror_b',
        gearId: 'gear_b',
        relativeAngle: currentLevel.mirrorBOffset,
        distance: 45,
        width: 28,
        active: true,
      },
    ]);

    watchAudio.playTick('clank');
    wasSolvedRef.current = false;
    hasExplodedRef.current = false;
    setShowHint(false); // Hide hint on new level load
  }, [resetKey, currentLevel]);

  // Core Simulation States (gears initially placeholder, will sync on load)
  const [gears, setGears] = useState<Gear[]>([
    {
      id: 'gear_a',
      name: 'Sun Core',
      role: 'driver',
      x: 230,
      y: 250,
      radius: 110,
      numTeeth: 36,
      currentAngle: 0.15,
      rotationSpeed: 0,
      color: '#D4A359', // Beautiful Golden Brass
      accentColor: '#FCD34D', // Radiant Sun Yellow
      description: 'The golden primary drive wheel, wind-driven or hand-wound.',
    },
    {
      id: 'gear_b',
      name: 'Moon Transit',
      role: 'driven',
      x: 405.15,
      y: 195.82,
      radius: 73.33,
      numTeeth: 24,
      currentAngle: 0,
      rotationSpeed: 0,
      color: '#475569', // Steel Lunar Slate
      accentColor: '#60A5FA', // Pale Silver Blue
      description: 'Bridges daytime solar torque with crown receptors.',
    },
    {
      id: 'gear_c',
      name: 'Solstice Receptor',
      role: 'driven',
      x: 494.55,
      y: 287.88,
      radius: 55,
      numTeeth: 18,
      currentAngle: 0,
      rotationSpeed: 0,
      color: '#854D0E', // Deeper Coppery Amber Bronze
      accentColor: '#F472B6', // Crown Rose Gold
      description: 'Solstice occurs when the ray aligns through its core.',
    },
  ]);

  // Mirrors mounted on the gears for the laser reflection mechanic
  const [mirrors, setMirrors] = useState<LaserMirror[]>([
    {
      id: 'mirror_a',
      gearId: 'gear_a',
      relativeAngle: 0.85,
      distance: 65,
      width: 32,
      active: true,
    },
    {
      id: 'mirror_b',
      gearId: 'gear_b',
      relativeAngle: -0.45,
      distance: 45,
      width: 28,
      active: true,
    },
  ]);

  // Target receiver crystal position (Celestial Receptor) derived dynamically from level state
  const receptorCircle = currentLevel.receptorPos;

  // Dragging and Momentum Physics References
  const isDraggingRef = useRef<boolean>(false);
  const dragStartAngleRef = useRef<number>(0);
  const gearStartAngleRef = useRef<number>(0);
  const lastMousePosRef = useRef<Point>({ x: 0, y: 0 });
  const speedAccumulatorRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Solstice game level solved tracking refs
  const wasSolvedRef = useRef<boolean>(false);
  const hasExplodedRef = useRef<boolean>(false);

  // Capture parent handlers in mutable refs to break infinite React rendering cycles
  const onUpdateTelemetryRef = useRef(onUpdateTelemetry);
  const onSolvedTriggeredRef = useRef(onSolvedTriggered);

  useEffect(() => {
    onUpdateTelemetryRef.current = onUpdateTelemetry;
  }, [onUpdateTelemetry]);

  useEffect(() => {
    onSolvedTriggeredRef.current = onSolvedTriggered;
  }, [onSolvedTriggered]);

  // Particle list for astronomical aesthetics
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    color: string;
    life: number;
    maxLife: number;
  }>>([]);

  // Setup sound support whenever soundEnabled changes
  useEffect(() => {
    watchAudio.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  // Ray casting solver logic
  // Traces standard 2D laser light paths starting from the Sun Emitter
  const solveLaserPath = (currentGears: Gear[]): { rays: LightRay[]; receptorCharge: number; solved: boolean } => {
    if (!laserActive) {
      return { rays: [], receptorCharge: 0, solved: false };
    }

    const gearMap = new Map<string, Gear>();
    currentGears.forEach(g => gearMap.set(g.id, g));

    const rays: LightRay[] = [];
    const maxBounces = 3;
    
    // Emitter position (Horizontal probe aligned to cross Gear A's mirror path)
    let currentStart: Point = { x: 40, y: 165 };
    let currentDir: Point = { x: 1, y: 0 }; // horizontal vector to the right

    let bounceCount = 0;
    let chargeRatio = 0;
    let solved = false;

    // Helper to calculate segment intersection
    const getSegmentIntersection = (
      rStart: Point,
      rDir: Point,
      segStart: Point,
      segEnd: Point
    ): { x: number; y: number; t: number } | null => {
      // Ray represented as P(t) = rStart + t * rDir
      // Segment represented as Q(u) = segStart + u * (segEnd - segStart)
      const rFar = { x: rStart.x + rDir.x * 2000, y: rStart.y + rDir.y * 2000 };
      
      const s1_x = rFar.x - rStart.x;
      const s1_y = rFar.y - rStart.y;
      const s2_x = segEnd.x - segStart.x;
      const s2_y = segEnd.y - segStart.y;

      const denom = -s2_x * s1_y + s1_x * s2_y;
      if (Math.abs(denom) < 1e-8) return null; // Parallel lines

      const s = (-s1_y * (rStart.x - segStart.x) + s1_x * (rStart.y - segStart.y)) / denom;
      const t = (s2_x * (rStart.y - segStart.y) - s2_y * (rStart.x - segStart.x)) / denom;

      if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        return {
          x: rStart.x + t * s1_x,
          y: rStart.y + t * s1_y,
          t: t
        };
      }
      return null;
    };

    while (bounceCount < maxBounces) {
      let closestHit: { x: number; y: number; t: number; mirrorId: string; gear: Gear; mirrorAngle: number } | null = null;

      // Check intersection with all available mirrors
      mirrors.forEach(mirror => {
        const gear = gearMap.get(mirror.gearId);
        if (!gear) return;

        // Compute actual mirror position in world coordinates based on rotating parent gear
        const mirrorAngleWorld = gear.currentAngle + mirror.relativeAngle;
        const mX = gear.x + mirror.distance * Math.cos(mirrorAngleWorld);
        const mY = gear.y + mirror.distance * Math.sin(mirrorAngleWorld);

        // Mirror runs perpendicular to the radial spoke axis
        const tangentAngle = mirrorAngleWorld + Math.PI / 2;
        const halfW = mirror.width / 2;

        const segStart = {
          x: mX - halfW * Math.cos(tangentAngle),
          y: mY - halfW * Math.sin(tangentAngle)
        };
        const segEnd = {
          x: mX + halfW * Math.cos(tangentAngle),
          y: mY + halfW * Math.sin(tangentAngle)
        };

        const hit = getSegmentIntersection(currentStart, currentDir, segStart, segEnd);
        if (hit && hit.t > 1e-5) {
          if (!closestHit || hit.t < closestHit.t) {
            closestHit = {
              x: hit.x,
              y: hit.y,
              t: hit.t,
              mirrorId: mirror.id,
              gear: gear,
              mirrorAngle: mirrorAngleWorld
            };
          }
        }
      });

      // Also check intersection with Celestial Receptor (glowing solar sensor)
      // Vector from Ray Origin to Circle Center
      const toCircle = { x: receptorCircle.x - currentStart.x, y: receptorCircle.y - currentStart.y };
      const proj = toCircle.x * currentDir.x + toCircle.y * currentDir.y;
      
      let checkCircleHit = false;
      let circleHitPoint = { x: 0, y: 0, t: 99999 };

      if (proj > 0) {
        // Nearest point on line
        const nearX = currentStart.x + proj * currentDir.x;
        const nearY = currentStart.y + proj * currentDir.y;
        
        // Distance from neat point to circle center
        const distSq = (nearX - receptorCircle.x) ** 2 + (nearY - receptorCircle.y) ** 2;
        if (distSq < receptorCircle.radius ** 2) {
          // Ray hits circle
          const offsetDist = Math.sqrt(receptorCircle.radius ** 2 - distSq);
          const t1 = proj - offsetDist;
          
          if (t1 > 1e-5 && t1 / 2000 < circleHitPoint.t) {
            circleHitPoint = {
              x: currentStart.x + t1 * currentDir.x,
              y: currentStart.y + t1 * currentDir.y,
              t: t1 / 2000
            };
            checkCircleHit = true;
          }
        }
      }

      // If we hit a mirror closer than receptor
      if (closestHit && (!checkCircleHit || closestHit.t < circleHitPoint.t)) {
        // Ray segments
        rays.push({
          startX: currentStart.x,
          startY: currentStart.y,
          endX: closestHit.x,
          endY: closestHit.y,
          intensity: 1.0 - (bounceCount * 0.25),
          active: true
        });

        // Compute reflection angle vector
        // Reflected angle R = I - 2 * (I . N) * N
        // Where Normal vector N is the spoke radial index (cos_a, sin_a)
        const nX = Math.cos(closestHit.mirrorAngle);
        const nY = Math.sin(closestHit.mirrorAngle);
        const dot = currentDir.x * nX + currentDir.y * nY;

        currentDir = {
          x: currentDir.x - 2 * dot * nX,
          y: currentDir.y - 2 * dot * nY
        };

        // Normalise direction vector just in case of float drifts
        const mag = Math.sqrt(currentDir.x * currentDir.x + currentDir.y * currentDir.y);
        currentDir = { x: currentDir.x / mag, y: currentDir.y / mag };

        // Update starting point of next bounce, nudge slightly out of mirror planes
        currentStart = {
          x: closestHit.x + currentDir.x * 0.5,
          y: closestHit.y + currentDir.y * 0.5
        };

        bounceCount++;
      } else if (checkCircleHit) {
        // Ray hit the endpoint sensor!
        rays.push({
          startX: currentStart.x,
          startY: currentStart.y,
          endX: circleHitPoint.x,
          endY: circleHitPoint.y,
          intensity: 1.0 - (bounceCount * 0.15),
          active: true
        });

        // If we hit with at least 2 mechanical bounces (meaning it deflected on Mirror A then Mirror B!), alignment is 100%!
        if (bounceCount >= 2) {
          chargeRatio = 1.0;
          solved = true;
        } else {
          // Off-angle hit or direct hit (gives feedback but does not unlock solstice)
          chargeRatio = 0.35;
        }
        break;
      } else {
        // Ray went out of boundary, draw ray to edge
        const farX = currentStart.x + currentDir.x * 1200;
        const farY = currentStart.y + currentDir.y * 1200;
        rays.push({
          startX: currentStart.x,
          startY: currentStart.y,
          endX: farX,
          endY: farY,
          intensity: 0.8 - (bounceCount * 0.25),
          active: true
        });
        break;
      }
    }

    return { rays, receptorCharge: chargeRatio, solved };
  };

  // Synchronize telemetry with parent component whenever gears state changes securely without side-effects during render
  useEffect(() => {
    const driver = gears[0];
    const ratioAB = 36 / 24;
    const ratioBC = 24 / 18;
    const solver = solveLaserPath(gears);

    onUpdateTelemetryRef.current({
      angleA: driver.currentAngle,
      angleB: gears[1].currentAngle,
      angleC: gears[2].currentAngle,
      ratioAB,
      ratioBC,
      speed: driver.rotationSpeed,
      solved: solver.solved,
      solvedRatio: solver.receptorCharge,
    });

    // Handle Victory transition safely, avoiding block setState rendering errors
    if (solver.solved && !isGameOver && !isVictoryActive) {
      if (!wasSolvedRef.current) {
        wasSolvedRef.current = true;
        onSolvedTriggeredRef.current();
      }
    }
  }, [gears, laserActive, isGameOver, isVictoryActive]);

  // Main Canvas Render loop & physics update
  useEffect(() => {
    let animationId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI retina display canvases
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const updateAndDraw = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1); // Clamp dt to prevent layout jumps
      lastTimeRef.current = timestamp;

      // 1. UPDATE PHYSICS (Gear mechanical translation and drag inertias)
      setGears((prevGears) => {
        // Freeze motions when game over or victory countdown is active
        if (isGameOver || isVictoryActive) {
          return prevGears;
        }

        const gearsCopy = [...prevGears];
        const driver = gearsCopy[0]; // Gear A is the main driver
        
        if (!isDraggingRef.current) {
          // Apply gear inertia decelerations (Decays over friction slider)
          driver.rotationSpeed *= friction;
          
          if (Math.abs(driver.rotationSpeed) < 0.0001) {
            driver.rotationSpeed = 0;
          }
          
          // Speed step rotation angle increment
          driver.currentAngle = wrapAngle(driver.currentAngle + driver.rotationSpeed);
        } else {
          // If dragging, rotation speed represents dragging velocity
          // Calculate standard velocity damping
          driver.rotationSpeed = speedAccumulatorRef.current;
          speedAccumulatorRef.current *= 0.85; // Drag damp dampener
        }

        // Trigger AudioEscapement ticks based on teeth positions
        if (Math.abs(driver.rotationSpeed) > 0.0001) {
          watchAudio.init(); // lazy init
          watchAudio.processHeadingTick(driver.currentAngle, driver.numTeeth);
        }

        // Mechanical drive ratios:
        // pitch radius ratios: Solstice Sun A -> Luna B -> Solstice Crown C
        const ratioAB = 36 / 24;
        const ratioBC = 24 / 18;

        // Gear B angle calculation: reverse directions, align relative teeth angles
        const phi_ab = -0.3; // contact angle
        const offset_b = phi_ab * (1 + ratioAB) + Math.PI / 24; 
        gearsCopy[1].currentAngle = wrapAngle(-driver.currentAngle * ratioAB + offset_b);
        gearsCopy[1].rotationSpeed = -driver.rotationSpeed * ratioAB;

        // Gear C angle calculation: reverse directions of B (same directions as A)
        const phi_bc = 0.8; // contact angle
        const offset_c = phi_bc * (1 + ratioBC) + Math.PI / 18;
        gearsCopy[2].currentAngle = wrapAngle(-gearsCopy[1].currentAngle * ratioBC + offset_c);
        gearsCopy[2].rotationSpeed = -gearsCopy[1].rotationSpeed * ratioBC;

        // Trace lasers & calculate solver convergence states
        const solver = solveLaserPath(gearsCopy);
        const currentThemeConfig = themeConfig[theme] || themeConfig.classic;
        const pColors = currentThemeConfig.particles;

        // Trigger particles if aligned!
        if (solver.solved) {
          // If a new alignment was reached, explode massive particle bundle
          if (!hasExplodedRef.current) {
            hasExplodedRef.current = true;
            for (let pIdx = 0; pIdx < 75; pIdx++) {
              const angleVal = Math.random() * Math.PI * 2;
              const velocityPower = 2.5 + Math.random() * 5.5;
              const randomParticleColor = pColors[Math.floor(Math.random() * pColors.length)];
              particlesRef.current.push({
                x: receptorCircle.x,
                y: receptorCircle.y,
                vx: Math.cos(angleVal) * velocityPower,
                vy: Math.sin(angleVal) * velocityPower - 1.2,
                size: 2 + Math.random() * 4.5,
                alpha: 1.0,
                color: randomParticleColor,
                life: 0,
                maxLife: 45 + Math.random() * 35,
              });
            }
          }

          // Spark particles streaming from core sensor
          for (let pIdx = 0; pIdx < 3; pIdx++) {
            const angleVal = Math.random() * Math.PI * 2;
            const velocityPower = 1 + Math.random() * 3;
            const randomSparkColor = Math.random() > 0.4 ? pColors[0] : '#ffffff';
            particlesRef.current.push({
              x: receptorCircle.x,
              y: receptorCircle.y,
              vx: Math.cos(angleVal) * velocityPower,
              vy: Math.sin(angleVal) * velocityPower - 1,
              size: 2 + Math.random() * 4,
              alpha: 1.0,
              color: randomSparkColor,
              life: 0,
              maxLife: 30 + Math.random() * 20,
            });
          }
        }

        return gearsCopy;
      });

      // Update particles
      particlesRef.current = particlesRef.current
        .map((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life++;
          p.alpha = 1.0 - p.life / p.maxLife;
          return p;
        })
        .filter((p) => p.life < p.maxLife);

      // 2. DRAW CANVAS (The Clockwork Solarium Arena)
      ctx.clearRect(0, 0, rect.width, rect.height);

      // BACKGROUND - Draw cosmic stars & engineering compass circles
      drawGridAndBackdrop(ctx, rect.width, rect.height);

      // DRAW MIRRORS & GEOMETRY LAYERS
      // We draw connection chains or shafts linking centers of gears
      drawMechanicalConnectors(ctx);

      // Draw Gears
      gears.forEach((gear) => {
        drawRealisticGear(ctx, gear);
      });

      // Draw Mirrors mounted onto Spoke Wheels
      drawMountedMirrors(ctx);

      // Draw Celestial Solstice Receptor Goal
      drawCelestialReceptor(ctx);

      // Draw Laser Emitter and Laser Radiation Rays
      drawLaserSystem(ctx);

      // Draw active particles
      drawActiveParticles(ctx);

      // Call next frame
      animationId = requestAnimationFrame(updateAndDraw);
    };

    animationId = requestAnimationFrame(updateAndDraw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [gears, laserActive, friction, mirrors, timeLeft, timeLimit, isGameOver, isVictoryActive, theme]);

  // Canvas Backdrop grid lines, compass calibrations with progressive sunset overlay
  const drawGridAndBackdrop = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const currentThemeConfig = themeConfig[theme] || themeConfig.classic;

    // Fill backdrop
    if (theme === 'summer') {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#110515'); // ultra dark purple
      bgGrad.addColorStop(0.5, '#2D0A35'); // deep magenta-plum
      bgGrad.addColorStop(1, '#50113B'); // coral/wine base
      ctx.fillStyle = bgGrad;
    } else {
      ctx.fillStyle = currentThemeConfig.bg;
    }
    ctx.fillRect(0, 0, w, h);

    // Elegant navy slate grid
    ctx.strokeStyle = currentThemeConfig.grid;
    ctx.lineWidth = 1;
    
    // Grid Spacings
    const spacing = 40;
    for (let x = 0; x < w; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Calculate twilight ratio representing the setting sun (0 = clear sky, 1 = deep dark eclipse twilight)
    const twilightRatio = Math.max(0, Math.min(1.0, 1.0 - (timeLeft / timeLimit)));
    
    // Draw twilight setting sun atmospheric overlay!
    if (twilightRatio > 0) {
      // Draw a radial gradient representing the setting orange-red/purple sun setting in background
      const sunsetGrad = ctx.createRadialGradient(w / 2, h + 100, 50, w / 2, h + 100, w * 0.9);
      if (theme === 'summer') {
        sunsetGrad.addColorStop(0, `rgba(244, 63, 94, ${twilightRatio * 0.5})`); // neon pink/crimson sun
        sunsetGrad.addColorStop(0.4, `rgba(124, 10, 140, ${twilightRatio * 0.6})`); // deep summer violet
        sunsetGrad.addColorStop(1, `rgba(17, 5, 25, ${twilightRatio * 0.75})`); // midnight warm tropical base
      } else {
        sunsetGrad.addColorStop(0, `rgba(180, 25, 40, ${twilightRatio * 0.42})`); // setting crimson sun
        sunsetGrad.addColorStop(0.4, `rgba(75, 12, 105, ${twilightRatio * 0.52})`); // deep violet sky
        sunsetGrad.addColorStop(1, `rgba(15, 10, 32, ${twilightRatio * 0.68})`); // velvet space dark
      }
      
      ctx.fillStyle = sunsetGrad;
      ctx.fillRect(0, 0, w, h);
    }

    // Concentric calibration guide rings (representing watchmaker dials)
    ctx.strokeStyle = currentThemeConfig.rings;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(230, 250, 180, 0, Math.PI * 2);
    ctx.arc(230, 250, 250, 0, Math.PI * 2);
    ctx.stroke();

    // Subtle compass angle text markers
    ctx.fillStyle = currentThemeConfig.ringsText;
    ctx.font = '8px monospace';
    ctx.fillText('N 0°', 230 - 10, 250 - 188);
    ctx.fillText('S 180°', 230 - 15, 250 + 196);
    ctx.fillText('E 90°', 230 + 188, 250 + 3);
    ctx.fillText('W 270°', 230 - 220, 250 + 3);
  };

  // Draw iron connector linkages holding centers
  const drawMechanicalConnectors = (ctx: CanvasRenderingContext2D) => {
    const currentThemeConfig = themeConfig[theme] || themeConfig.classic;
    ctx.strokeStyle = currentThemeConfig.connectorsOuter;
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';

    // Link A -> B
    ctx.beginPath();
    ctx.moveTo(gears[0].x, gears[0].y);
    ctx.lineTo(gears[1].x, gears[1].y);
    ctx.stroke();

    // Link B -> C
    ctx.beginPath();
    ctx.moveTo(gears[1].x, gears[1].y);
    ctx.lineTo(gears[2].x, gears[2].y);
    ctx.stroke();

    // Inner core lining
    ctx.strokeStyle = currentThemeConfig.connectorsInner;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(gears[0].x, gears[0].y);
    ctx.lineTo(gears[1].x, gears[1].y);
    ctx.lineTo(gears[2].x, gears[2].y);
    ctx.stroke();
  };

  // Draw highly realistic metallic brass-gear structures
  const drawRealisticGear = (ctx: CanvasRenderingContext2D, gear: Gear) => {
    const { x, y, radius, numTeeth, currentAngle, color, accentColor, role } = gear;
    const currentThemeConfig = themeConfig[theme] || themeConfig.classic;
    const gearTheme = currentThemeConfig.gears[gear.id as 'gear_a' | 'gear_b' | 'gear_c'];
    const resolvedColor = gearTheme ? gearTheme.color : color;
    const resolvedAccent = gearTheme ? gearTheme.accentColor : accentColor;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(currentAngle);

    // Dynamic drag glow
    if (role === 'driver' && isDraggingRef.current) {
      ctx.shadowColor = theme === 'summer' ? 'rgba(244, 63, 94, 0.55)' : 'rgba(251, 191, 36, 0.45)';
      ctx.shadowBlur = 15;
    } else {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 4;
    }

    // 1. Draw Trapezological Teeth profile
    ctx.beginPath();
    const toothHeight = 7.5;
    const innerRadius = radius - toothHeight;
    const outerRadius = radius + toothHeight;
    const angleStep = (Math.PI * 2) / numTeeth;

    for (let i = 0; i < numTeeth; i++) {
      const angle = i * angleStep;
      
      // Each tooth step subdivided into:
      // a: start rising
      // b: peak top start flat
      // c: peak top finish flat
      // d: bottom trough finish
      const a = angle;
      const b = angle + angleStep * 0.28;
      const c = angle + angleStep * 0.52;
      const d = angle + angleStep * 0.80;

      if (i === 0) {
        ctx.moveTo(innerRadius * Math.cos(a), innerRadius * Math.sin(a));
      } else {
        ctx.lineTo(innerRadius * Math.cos(a), innerRadius * Math.sin(a));
      }
      
      ctx.lineTo(outerRadius * Math.cos(b), outerRadius * Math.sin(b));
      ctx.lineTo(outerRadius * Math.cos(c), outerRadius * Math.sin(c));
      ctx.lineTo(innerRadius * Math.cos(d), innerRadius * Math.sin(d));
    }
    ctx.closePath();
    ctx.fillStyle = resolvedColor;
    ctx.fill();

    // Reset shadow for fine outline details
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = resolvedAccent;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 2. Draw Hollow Outer web-ring outline
    ctx.beginPath();
    ctx.arc(0, 0, radius - 15, 0, Math.PI * 2);
    ctx.fillStyle = currentThemeConfig.bg; // Recesses hollow body to dark background
    ctx.fill();
    ctx.stroke();

    // 3. Spoke configurations
    const numSpokes = role === 'driver' ? 6 : 4;
    const spokeWidth = role === 'driver' ? 6 : 4;
    ctx.strokeStyle = resolvedColor;
    ctx.lineWidth = spokeWidth;
    ctx.lineCap = 'butt';

    for (let sIdx = 0; sIdx < numSpokes; sIdx++) {
      const spokeAngle = (sIdx * Math.PI * 2) / numSpokes;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo((radius - 15) * Math.cos(spokeAngle), (radius - 15) * Math.sin(spokeAngle));
      ctx.stroke();
    }

    // 4. Intricate Astronomic Engravings inside the gears
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    if (role === 'driver') {
      // Golden Sun ornaments
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.45, 0, Math.PI * 2);
      ctx.stroke();

      // Flare rays
      ctx.strokeStyle = theme === 'summer' ? 'rgba(253, 164, 181, 0.35)' : 'rgba(251, 191, 36, 0.25)';
      ctx.beginPath();
      for (let f = 0; f < 12; f++) {
        const fAngle = (f * Math.PI * 2) / 12;
        ctx.moveTo(radius * 0.25 * Math.cos(fAngle), radius * 0.25 * Math.sin(fAngle));
        ctx.lineTo(radius * 0.4 * Math.cos(fAngle), radius * 0.4 * Math.sin(fAngle));
      }
      ctx.stroke();
    } else if (gear.id === 'gear_b') {
      // Crescent Moon engravings
      ctx.strokeStyle = theme === 'summer' ? 'rgba(253, 186, 116, 0.3)' : 'rgba(96, 165, 250, 0.2)';
      ctx.beginPath();
      ctx.arc(radius * 0.15, radius * 0.15, radius * 0.2, 0, Math.PI * 2);
      ctx.stroke();
    } else if (gear.id === 'gear_c') {
      // Concentric stellar orbital lines
      ctx.strokeStyle = theme === 'summer' ? 'rgba(245, 208, 254, 0.3)' : 'rgba(244, 114, 182, 0.2)';
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.5, 0, Math.PI * 2);
      ctx.arc(0, 0, radius * 0.7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 5. Central Brass Axle Core Block
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#1E293B';
    ctx.fill();
    ctx.strokeStyle = resolvedAccent;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Interactive Jewel Core Center (Ruby/Saphire pivots)
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = role === 'driver' ? currentThemeConfig.pivotColorDriver : currentThemeConfig.pivotColorDriven;
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.restore();
  };

  // Draw mirrors mounted on gear radii spokes
  const drawMountedMirrors = (ctx: CanvasRenderingContext2D) => {
    mirrors.forEach((mirror) => {
      const gear = gears.find((g) => g.id === mirror.gearId);
      if (!gear) return;

      const mirrorAngleWorld = gear.currentAngle + mirror.relativeAngle;
      const mX = gear.x + mirror.distance * Math.cos(mirrorAngleWorld);
      const mY = gear.y + mirror.distance * Math.sin(mirrorAngleWorld);

      ctx.save();
      ctx.translate(mX, mY);
      ctx.rotate(mirrorAngleWorld);

      // Draw heavy backing mount (brass/bronze clip)
      ctx.fillStyle = '#6B7280';
      ctx.fillRect(-mirror.width / 2 - 2, 0, mirror.width + 4, 3);
      
      // Draw actual mirror face
      const silverGrad = ctx.createLinearGradient(-mirror.width / 2, 0, mirror.width / 2, 0);
      silverGrad.addColorStop(0, '#CBD5E1');
      silverGrad.addColorStop(0.5, '#E2E8F0');
      silverGrad.addColorStop(1, '#94A3B8');
      
      ctx.fillStyle = silverGrad;
      ctx.fillRect(-mirror.width / 2, -2, mirror.width, 2);

      // Gold outline trim
      ctx.strokeStyle = '#D4A359';
      ctx.lineWidth = 1;
      ctx.strokeRect(-mirror.width / 2, -2, mirror.width, 2);

      // Decorative gem pivot representing a retro fitting anchor
      ctx.beginPath();
      ctx.arc(0, 1.5, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#38BDF8';
      ctx.fill();

      // Mirror designation text
      ctx.rotate(-mirrorAngleWorld);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '7px Calibri';
      ctx.fillText(mirror.id === 'mirror_a' ? 'M1' : 'M2', -5, -8);

      ctx.restore();
    });
  };

  // Draw target goal celestial receptor plate
  const drawCelestialReceptor = (ctx: CanvasRenderingContext2D) => {
    const { x, y, radius } = receptorCircle;
    const currentThemeConfig = themeConfig[theme] || themeConfig.classic;

    ctx.save();
    
    // Draw background glowing aura
    const chargeVal = solveLaserPath(gears).receptorCharge;
    const isLit = chargeVal > 0.9;
    
    if (chargeVal > 0) {
      const radG = ctx.createRadialGradient(x, y, 2, x, y, radius * 1.5);
      radG.addColorStop(0, isLit ? currentThemeConfig.receptorAuraLit : currentThemeConfig.receptorAuraUnlit);
      radG.addColorStop(1, 'rgba(11, 13, 15, 0)');
      ctx.fillStyle = radG;
      ctx.beginPath();
      ctx.arc(x, y, radius * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outer physical dial bronze ring
    ctx.strokeStyle = isLit ? currentThemeConfig.receptorOuterLit : currentThemeConfig.receptorOuterUnlit;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Concentric celestial alignments decoration
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, radius - 6, 0, Math.PI * 2);
    ctx.stroke();

    // Core alignment prism gemstone
    ctx.beginPath();
    ctx.moveTo(x, y - 10);
    ctx.lineTo(x + 10, y + 6);
    ctx.lineTo(x - 10, y + 6);
    ctx.closePath();
    ctx.fillStyle = isLit ? currentThemeConfig.receptorGemLit : currentThemeConfig.receptorGemUnlit;
    ctx.fill();
    ctx.strokeStyle = isLit ? currentThemeConfig.receptorGemStrokeLit : currentThemeConfig.receptorGemStrokeUnlit;
    ctx.stroke();

    // Label indicator tag
    ctx.fillStyle = isLit ? currentThemeConfig.receptorLabelLit : currentThemeConfig.receptorLabelUnlit;
    ctx.font = '10px "Space Grotesk", sans-serif';
    ctx.fillText('SOLSTIC GATE', x - 33, y - radius - 8);

    ctx.restore();
  };

  // Draw Emitter box and the glowing laser rays
  const drawLaserSystem = (ctx: CanvasRenderingContext2D) => {
    // 1. Draw Emitter box at left (40, 165)
    ctx.save();
    ctx.fillStyle = '#12161A';
    ctx.strokeStyle = '#D4A359';
    ctx.lineWidth = 2;
    ctx.fillRect(15, 150, 30, 30);
    ctx.strokeRect(15, 150, 30, 30);

    // Golden detailing of emitter lens
    ctx.beginPath();
    ctx.arc(35, 165, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#EF4444';
    ctx.fill();
    ctx.strokeStyle = '#FCD34D';
    ctx.stroke();

    // Laser nozzle tip
    ctx.fillStyle = '#D4A359';
    ctx.fillRect(45, 161, 6, 8);

    // Emitter label
    ctx.fillStyle = '#D4A359';
    ctx.font = '8px monospace';
    ctx.fillText('SOL EMR', 10, 144);

    ctx.restore();

    // 2. DRAW LIGHT RAYS
    const currentThemeConfig = themeConfig[theme] || themeConfig.classic;
    const solver = solveLaserPath(gears);
    solver.rays.forEach((ray) => {
      ctx.save();
      
      const isLit = solver.solved;
      
      // Core glowing laser line
      ctx.lineCap = 'round';
      ctx.strokeStyle = isLit ? currentThemeConfig.laserLit : currentThemeConfig.laserUnlit;
      ctx.lineWidth = 2.5 * ray.intensity;
      
      // Backside blur glow
      ctx.shadowColor = isLit ? currentThemeConfig.laserLitGlow : currentThemeConfig.laserUnlitGlow;
      ctx.shadowBlur = 8;
      
      ctx.beginPath();
      ctx.moveTo(ray.startX, ray.startY);
      ctx.lineTo(ray.endX, ray.endY);
      ctx.stroke();

      // Sharp inner white hot core ray
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 0.8 * ray.intensity;
      ctx.beginPath();
      ctx.moveTo(ray.startX, ray.startY);
      ctx.lineTo(ray.endX, ray.endY);
      ctx.stroke();

      ctx.restore();
    });
  };

  // Render particles
  const drawActiveParticles = (ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0; // Reset
  };

  // Convert mouse coord into angle relative to Gear A center so we can compute wheel rotations
  const getMouseAngleWorld = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { angle: 0, x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return { angle: 0, x: 0, y: 0 };
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    const angle = Math.atan2(mouseY - gears[0].y, mouseX - gears[0].x);
    return { angle, x: mouseX, y: mouseY };
  };

  // Mouse / Touch Event Hooks
  const handleStartInteraction = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isGameOver || isVictoryActive) return;
    watchAudio.init(); // Prompt context activation
    
    const { angle, x, y } = getMouseAngleWorld(e);
    
    // Check if user clicked inside Gear A (Primary Sun drive wheel)
    const distToDriver = Math.sqrt((x - gears[0].x) ** 2 + (y - gears[0].y) ** 2);
    
    // Allow dragging inside radius
    if (distToDriver <= gears[0].radius) {
      isDraggingRef.current = true;
      dragStartAngleRef.current = angle;
      gearStartAngleRef.current = gears[0].currentAngle;
      lastMousePosRef.current = { x, y };
      speedAccumulatorRef.current = 0;
      
      // Stop ongoing auto rotation immediately
      setGears((prev) => {
        const copy = [...prev];
        copy[0].rotationSpeed = 0;
        return copy;
      });
    }
  };

  const handleMoveInteraction = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isGameOver || isVictoryActive) {
      isDraggingRef.current = false;
      return;
    }
    if (!isDraggingRef.current) return;

    const { angle, x, y } = getMouseAngleWorld(e);
    
    // Angle offset differences
    let deltaAngle = angle - dragStartAngleRef.current;
    
    // Normalize shortest arc jumps (wraps standard discontinuities)
    if (deltaAngle > Math.PI) deltaAngle -= Math.PI * 2;
    if (deltaAngle < -Math.PI) deltaAngle += Math.PI * 2;

    const targetAngle = wrapAngle(gearStartAngleRef.current + deltaAngle);
    
    // Accumulate momentum velocity for fling effects
    speedAccumulatorRef.current = deltaAngle * 0.18; // smooth damp drag
    
    setGears((prev) => {
      const copy = [...prev];
      copy[0].currentAngle = targetAngle;
      return copy;
    });

    lastMousePosRef.current = { x, y };
  };

  const handleEndInteraction = () => {
    if (isGameOver || isVictoryActive) {
      isDraggingRef.current = false;
      return;
    }
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Apply swipe fling acceleration into the driver rotation speed
    setGears((prev) => {
      const copy = [...prev];
      // Limit giant velocity ticks
      const speedCap = 0.25;
      copy[0].rotationSpeed = Math.max(-speedCap, Math.min(speedAccumulatorRef.current, speedCap));
      
      // Deep clank sound on heavy wind spin-release!
      if (Math.abs(copy[0].rotationSpeed) > 0.05) {
        watchAudio.playTick('clank');
      }
      return copy;
    });

    speedAccumulatorRef.current = 0;
  };

  // Scroll wheel supports winding primary drive gear!
  const handleScrollWind = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (isGameOver || isVictoryActive) return;
    e.preventDefault();
    watchAudio.init();

    // Scroll delta increases angular speed
    const scrollDelta = e.deltaY * 0.00018;
    setGears((prev) => {
      const copy = [...prev];
      // Wind speed increment
      copy[0].rotationSpeed = Math.max(-0.25, Math.min(copy[0].rotationSpeed + scrollDelta, 0.25));
      return copy;
    });
  };

  return (
    <div className={`relative w-full ${theme === 'summer' ? 'bg-[#18051E] border-pink-500/25' : 'bg-[#07090A] border-[#D4A359]/20'} border rounded-xl overflow-hidden shadow-2xl flex flex-col items-center`}>
      {/* HUD Bar Overlay */}
      <div className="absolute top-4 left-4 right-4 pointer-events-none flex flex-col md:flex-row justify-between items-stretch md:items-start gap-3 z-10 select-none">
        
        {/* Left Section: Level Tracker & Story Title */}
        <div className="bg-[#12161A]/90 border border-[#D4A359]/30 rounded-lg px-3 py-1.5 backdrop-blur-sm shadow-md flex items-center gap-2.5">
          <div className="font-mono text-center shrink-0">
            <span className="block text-[7px] text-[#D4A359] uppercase font-bold tracking-widest leading-none mb-0.5">{t.stage}</span>
            <span className="text-sm font-bold text-slate-100">{currentLevel.id}/4</span>
          </div>
          <div className="w-[1px] h-6 bg-slate-800 shrink-0" />
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-semibold text-xs text-slate-200 tracking-wide truncate">
                {t.levels[currentLevel.id as 1 | 2 | 3 | 4]?.name || currentLevel.name}
              </h3>
              <button
                onClick={() => setShowHint(!showHint)}
                className="pointer-events-auto bg-[#D4A359]/15 hover:bg-[#D4A359]/35 text-[#FCD34D] border border-[#D4A359]/35 rounded px-1.5 py-0.5 font-mono text-[8px] tracking-wider transition-all cursor-pointer"
                title="View astrolabe alignment hints"
              >
                {t.hintBtn}
              </button>
            </div>
            <p className="font-mono text-[8px] text-slate-400 truncate tracking-tight uppercase">
              {t.levels[currentLevel.id as 1 | 2 | 3 | 4]?.description || currentLevel.description}
            </p>
          </div>
        </div>

        {/* Center Section: Atmospheric Sunset Ring Timer */}
        <div className="flex justify-center items-start shrink-0">
          <div className="bg-[#12161A]/95 border border-[#D4A359]/25 rounded-xl px-4 py-1.5 backdrop-blur-sm shadow-md flex items-center gap-2.5">
            <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="14"
                  cy="14"
                  r="11"
                  stroke="#1E293B"
                  strokeWidth="2.2"
                  fill="transparent"
                />
                <circle
                  cx="14"
                  cy="14"
                  r="11"
                  stroke={timeLeft < 10 ? '#EF4444' : '#FCD34D'}
                  strokeWidth="2.2"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 11}`}
                  strokeDashoffset={`${2 * Math.PI * 11 * (1 - timeLeft / timeLimit)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <Sun className={`w-3.5 h-3.5 ${timeLeft < 10 ? 'text-[#EF4444] animate-pulse duration-500' : 'text-[#FCD34D]'}`} />
            </div>
            
            <div className="flex flex-col">
              <span className="font-mono text-[7px] text-slate-400 uppercase tracking-widest font-semibold leading-none mb-0.5">{t.twilightCount}</span>
              <span className={`font-mono text-xs leading-none font-bold tracking-wider ${timeLeft < 10 ? 'text-[#EF4444] animate-pulse' : 'text-slate-100'}`}>
                {timeLeft}s {t.remaining}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Multiplier & Live Score Dashboard */}
        <div className="bg-[#12161A]/90 border border-[#D4A359]/30 rounded-lg px-3 py-1.5 backdrop-blur-sm shadow-md flex items-center justify-between md:justify-end gap-3.5 text-right">
          <div className="font-mono text-left md:text-right">
            <span className="block text-[7px] text-[#D4A359] uppercase font-bold tracking-widest leading-none mb-0.5">{t.speedMultiplier}</span>
            <span className="text-[10px] font-bold text-amber-300">
              x{(1.0 + (timeLeft / timeLimit) * 1.5).toFixed(2)}
            </span>
          </div>
          <div className="w-[1px] h-6 bg-slate-800" />
          <div className="font-mono">
            <span className="block text-[7px] text-indigo-400 uppercase font-bold tracking-widest leading-none mb-0.5">{t.chronosScore}</span>
            <span className="text-xs font-bold text-slate-100">
              {score}
            </span>
          </div>
        </div>
      </div>

      {/* Manual Hint Overlay Box */}
      {showHint && (
        <div className="absolute top-20 left-4 right-4 bg-[#12161A]/95 border border-[#D4A359]/40 rounded-xl p-3.5 backdrop-blur-md shadow-xl z-20 text-xs font-mono text-slate-350 space-y-1 animate-fade-in select-none">
          <div className="flex items-center gap-1.5 text-[#FCD34D] mb-1 font-semibold text-[10px] tracking-wider uppercase">
            <Info className="w-3.5 h-3.5" />
            {t.calibCode}
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">
            {t.levels[currentLevel.id as 1 | 2 | 3 | 4]?.hint || currentLevel.hint}
          </p>
        </div>
      )}

      {/* Eclipse / Game Over Screen Overlay */}
      {isGameOver && (
        <div className="absolute inset-0 bg-[#07090A]/95 backdrop-blur-md flex flex-col justify-center items-center p-6 text-center z-30 select-none">
          <div className="border border-[#EF4444]/30 bg-[#12161A]/85 p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/40 flex items-center justify-center mx-auto animate-pulse">
              <Sun className="w-8 h-8 text-[#EF4444] stroke-[1.5]" />
            </div>
            
            <div className="space-y-2">
              <h2 className="font-display text-xl font-bold uppercase tracking-wider text-[#EF4444]">
                {t.eclipseActive}
              </h2>
              <p className="font-mono text-[9px] text-[#EF4444]/80 tracking-widest uppercase">
                {t.timeRemainingHex}
              </p>
            </div>

            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              {t.eclipseDesc}
            </p>

            <button
              onClick={onRetryLevel}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 font-mono text-xs text-[#0B0D0F] hover:text-[#0B0D0F] bg-[#D4A359] hover:bg-[#FCD34D] rounded-xl font-bold border border-[#D4A359]/30 shadow-lg transform active:scale-95 transition-all duration-200 cursor-pointer pointer-events-auto"
            >
              <RotateCcw className="w-4 h-4" />
              {t.rewindBtn}
            </button>
          </div>
        </div>
      )}

      {/* Victory / Transition Overlay screen */}
      {isVictoryActive && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center p-6 text-center z-20 select-none">
          <div className="border border-emerald-500/30 bg-[#12161A]/95 p-8 rounded-2xl max-w-sm shadow-2xl space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <Sparkles className="w-7 h-7 text-emerald-400" />
            </div>
            
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-slate-400 text-[10px] tracking-wider uppercase leading-none">{t.alignmentSucceeded}</h3>
              <h2 className="font-display text-xl font-bold uppercase tracking-wider text-emerald-400">
                {t.solsticeUnlocked}
              </h2>
            </div>

            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              {t.victoryDesc}
            </p>
          </div>
        </div>
      )}

      {/* Main Game Jam HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleStartInteraction}
        onMouseMove={handleMoveInteraction}
        onMouseUp={handleEndInteraction}
        onMouseLeave={handleEndInteraction}
        onTouchStart={handleStartInteraction}
        onTouchMove={handleMoveInteraction}
        onTouchEnd={handleEndInteraction}
        onWheel={handleScrollWind}
        className="w-full h-[450px] cursor-grab active:cursor-grabbing max-w-[850px]"
      />

      {/* Aesthetic helper badge footer */}
      <div className="w-full bg-[#12161A]/45 border-t border-slate-900/40 p-3 flex justify-between items-center text-[10px] text-slate-400 px-5">
        <span className="flex items-center gap-1.5 font-sans">
          <AlertCircle className="w-3.5 h-3.5 text-[#D4A359]" />
          {t.windingCapable}
        </span>
        <span className="font-mono text-[8px] tracking-widest uppercase text-slate-500">
          {t.chronosInterlock}
        </span>
      </div>
    </div>
  );
}
