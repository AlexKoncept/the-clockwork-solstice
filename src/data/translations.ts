/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslatedLevel {
  name: string;
  description: string;
  hint: string;
}

export const translations = {
  en: {
    // App level
    title: "The Clockwork Solstice",
    subtitle: "An elegant watchmaking laboratory exploring retroharmonic gear trains and laser alignment vector reflections.",
    labLab: "Astrolabe Alignment Laboratory • Game Jam Stage",
    bySignature: "by Alex Koncept",
    themeLabel: "Theme: ",
    themeClassic: "Winter Solstice",
    themeSummer: "Summer Solstice",
    totalXP: "Total XP",
    statusLvl: "Level {num} Status",
    solsticeAligned: "Solstice Aligned! ✨",
    seekingAlignment: "Seeking Alignment",
    objectiveTitle: "Astronomical Solstice Objective",
    objectiveText: "Analyze the {name} instruction notes. Click and drag or scroll trackpad wheels on the primary golden wheel block to calibrate the mounted mirrors. When the laser deflects and lock-aims the green receiver core, the planetary seals will lift and grant passage forward. Let not the twilight count expire!",
    designerSignature: "Designed & Crafted with absolute watchmaker precision by Alex Koncept.",
    rightsReserved: "CHRONOS ENGINE // PAT. PEND. NO 1883-SOL",

    // GearSolarium HUD
    stage: "Stage",
    hintBtn: "HINT",
    twilightCount: "Twilight Count",
    remaining: "remaining",
    speedMultiplier: "Speed Multiplier",
    chronosScore: "Chronos Score",
    calibCode: "Astronomical Alignment Calibration Code:",
    eclipseActive: "CELESTIAL ECLIPSE ACTIVE",
    timeRemainingHex: "Time Remaining: 00:00 // Sunset Overlord",
    eclipseDesc: "The sun has fully set. The solar laser beam is cut, and cosmic Solarium escapements have lost chronological parity.",
    rewindBtn: "REWIND TIME (RETRY LEVEL)",
    alignmentSucceeded: "Alignment Succeeded",
    solsticeUnlocked: "SOLSTICE UNLOCKED!",
    victoryDesc: "Resonating golden frequencies. Moving through to the next cosmic gate, hold steady!",
    windingCapable: "WINDING CAPABLE: Click & drag or scroll trackpad gears on the main canvas!",
    chronosInterlock: "CHRONOS INTERLOCK: ACTIVE",

    // InstrumentPanel
    escapementControls: "Escapement Controls",
    resetCalibration: "RESET CALIBRATION",
    frictionDecay: "Gear Friction Decay (Inertia damping)",
    slippery: "Slippery",
    heavyDamp: "Heavy Damp",
    soundEcho: "SOUND: ECHO ACTIVE",
    soundMuted: "SOUND: MUTED",
    laserEmitting: "LASER: EMITTING",
    laserOffline: "LASER: OFFLINE",
    escapementTelemetry: "Escapement Telemetry",
    sunDriver: "Sun (Driver)",
    moonTransit: "Moon Transit",
    solCrown: "Sol Crown",
    teeth: "Teeth",
    teethFs: "teeth/fs",
    linearVel: "Linear Escapement Vel:",
    transmissionAB: "Transmission (A → B / Moon):",
    transmissionBC: "Transmission (B → C / Crown):",
    overallRatio: "Overall Ratio (A → C):",
    quantumCharge: "Solstice Quantum Charge:",

    // WatchmakerJournal
    journalTitle: "The Chronoscriptor’s Journal",
    entry1Title: "§ OMNIA 15 - Solstice Eve, 1883",
    entry1Desc: "\"The cosmic alignments are shifting. The Sun Gate will only open when the golden drive of the Solstice Engine rotates precisely to transmit its light ray through the intermediary moon gears...\"",
    entry2Title: "§ MECHANICA CONVERGENCE - Ratio Laws",
    entry2Desc: "When matching two gears, their tooth ratios dictate precise opposite speeds. The primary 36-teeth Sun wheel drives the secondary 24-teeth Moon transit, which in turn revolves the 18-teeth Solstice Crown Receptor.",
    entry3Title: "§ HINT: Laser Alignment Path",
    entry3Desc: "Activate the Retroharmonic Laser. Mount mirrors onto the gear axles. Spin the main golden wheel by DRAGGING or using the SCROLL WHEEL. Once all components reflect the solar probe into the celestial sensor, the engine reaches critical solstice solstice energy!",
    protocolTitle: "Astronomical Protocol",
    protocolWind: "WIND ENGINE:",
    protocolWindDesc: "Click/drag or scroll standard mouse wheel on the golden Sun wheel.",
    protocolInertia: "INERTIA FLING:",
    protocolInertiaDesc: "Lift mouse quickly to cast momentum.",
    protocolRefraction: "LASER REFRACTION:",
    protocolRefractionDesc: "Connect Beam → Mirror A → Mirror B → Receptor.",

    // Levels
    levels: {
      1: {
        name: "Dawn Alignment",
        description: "Align the golden Sun drive wheel to route the starting solar array light ray. Watch for the 1.5x Moon gear acceleration.",
        hint: "Rotate the main wheel to around 55° - 68° so that the two mirrors align and reflect the beam."
      },
      2: {
        name: "Zenith Convergence",
        description: "The Celestial alignment has shifted. The Moon transit mirror has calibrated to a negative offset, forcing a tighter counter-rotation.",
        hint: "Requires a counter-turn. Try rotating the primary wheel backwards (counter-clockwise) to match our high solar receiver."
      },
      3: {
        name: "Astrolabe Resonance",
        description: "The engine's receptor moves deep into the lower gears' shadows. Double deflection requires meticulous winding precision.",
        hint: "A deeper angle deflection. Rotate slowly. The friction slider can help you make steady micro-adjustments."
      },
      4: {
        name: "The Crown Eclipse",
        description: "Our final celestial gateway. Extremely narrow target aperture requires perfect balance. Beware of the high inertia speed slip!",
        hint: "The solstice crown of watchmaking. Adjust your speed down, and use scroll winding for extreme micron alignments."
      }
    }
  },
  fr: {
    // App level
    title: "Le Solstice d'Horlogerie",
    subtitle: "Un élégant laboratoire d'horlogerie explorant les trains d'engrenages rétroharmoniques et les réflexions vectorielles d'alignement laser.",
    labLab: "Laboratoire d'Alignement d'Astrolabe • Session de Jeu",
    bySignature: "par Alex Koncept",
    themeLabel: "Thème : ",
    themeClassic: "Solstice d'Hiver",
    themeSummer: "Solstice d'Été",
    totalXP: "XP Totale",
    statusLvl: "Statut du Niveau {num}",
    solsticeAligned: "Solstice Alignée ! ✨",
    seekingAlignment: "Recherche d'Alignement",
    objectiveTitle: "Objectif du Solstice Astronomique",
    objectiveText: "Analysez les notes d'instructions pour {name}. Cliquez et glissez ou faites défiler avec la molette sur le bloc d'engrenage doré principal pour calibrer les miroirs montés. Lorsque le laser dévie et verrouille le noyau récepteur vert, les sceaux planétaires se lèveront et vous permettront de continuer. Ne laissez pas le compteur de crépuscule expirer !",
    designerSignature: "Conçu et conçu avec une précision d'horloger absolue par Alex Koncept.",
    rightsReserved: "CHRONOS ENGINE // PAT. PEND. NO 1883-SOL",

    // GearSolarium HUD
    stage: "Niveau",
    hintBtn: "INDICE",
    twilightCount: "Crépuscule",
    remaining: "restant",
    speedMultiplier: "Multiplicateur",
    chronosScore: "Score Chronos",
    calibCode: "Code de Calibration d'Alignement Astronomique :",
    eclipseActive: "ÉCLIPSE CÉLESTE ACTIVE",
    timeRemainingHex: "Temps Restant : 00:00 // Maître du Crépuscule",
    eclipseDesc: "Le soleil s'est complètement couché. Le faisceau laser solaire est coupé et les échappements Solarium cosmiques ont perdu leur parité chronologique.",
    rewindBtn: "REMONTER LE TEMPS (RECOMMENCER)",
    alignmentSucceeded: "Alignement Réussi",
    solsticeUnlocked: "SOLSTICE DÉVERROUILLÉ !",
    victoryDesc: "Fréquences dorées en résonance. Passage à la prochaine porte cosmique, restez stable !",
    windingCapable: "MÉCANISMES ACTIFS : Cliquez-glissez ou faites défiler les engrenages sur le canevas principal !",
    chronosInterlock: "VERROUILLAGE CHRONOS : ACTIF",

    // InstrumentPanel
    escapementControls: "Commandes d'Échappement",
    resetCalibration: "RÉINITIALISER",
    frictionDecay: "Friction de l'Engrenage (Amortissement d'inertie)",
    slippery: "Glissant",
    heavyDamp: "Amorti Lourd",
    soundEcho: "SON : ÉCHO ACTIF",
    soundMuted: "SON : MUET",
    laserEmitting: "LASER : ÉMISSION",
    laserOffline: "LASER : HORS LIGNE",
    escapementTelemetry: "Télémétrie d'Échappement",
    sunDriver: "Soleil (Moteur)",
    moonTransit: "Transit Lunaire",
    solCrown: "Couronne Sol",
    teeth: "Dents",
    teethFs: "dents/fs",
    linearVel: "Vit. Échappement Linéraire :",
    transmissionAB: "Transmission (A → B / Lune) :",
    transmissionBC: "Transmission (B → C / Couronne) :",
    overallRatio: "Rapport Global (A → C) :",
     quantumCharge: "Charge Quantique du Solstice :",

    // WatchmakerJournal
    journalTitle: "Le Journal du Chronoscripteur",
    entry1Title: "§ OMNIA 15 - Veille du Solstice, 1883",
    entry1Desc: "\"Les alignements cosmiques changent. La Porte du Soleil ne s'ouvrira que lorsque l'entraînement doré du moteur du solstice tournera avec précision pour transmettre son rayon lumineux à travers les engrenages lunaires intermédiaires...\"",
    entry2Title: "§ CONVERGENCE MÉCANIQUE - Lois des Rapports",
    entry2Desc: "Lors de l'engrènement de deux engrenages, leurs rapports de dents dictent des vitesses opposées précises. La roue solaire principale de 36 dents entraîne le transit lunaire secondaire de 24 dents, qui fait tourner à son tour le récepteur de la couronne du solstice de 18 dents.",
    entry3Title: "§ INDICE : Chemin d'Alignement Laser",
    entry3Desc: "Activez le Laser Rétroharmonique. Montez les miroirs sur les axes des engrenages. Faites tourner la roue dorée principale en GLISSANT ou en utilisant la MOLETTE DE DÉFILEMENT. Une fois que tous les composants reflètent le signal solaire dans le capteur céleste, le moteur atteint sa charge d'énergie critique !",
    protocolTitle: "Protocole Astronomique",
    protocolWind: "ENGRENAGE :",
    protocolWindDesc: "Cliquez/glissez ou faites défiler la molette de la souris sur la roue solaire dorée.",
    protocolInertia: "INERTIE :",
    protocolInertiaDesc: "Relâchez la souris rapidement pour projeter de l'élan.",
    protocolRefraction: "RÉFRACTION LASER :",
    protocolRefractionDesc: "Reliez Rayon → Miroir A → Miroir B → Récepteur.",

    // Levels
    levels: {
      1: {
        name: "Alignement de l'Aube",
        description: "Alignez la roue motrice dorée du Soleil pour diriger le rayon lumineux initial. Attention à l'accélération de 1,5x de l'engrenage lunaire.",
        hint: "Faites tourner la roue principale à environ 55° - 68° pour que les deux miroirs s'alignent et réfléchissent le faisceau."
      },
      2: {
        name: "Convergence du Zénith",
        description: "L'alignement céleste a changé. Le miroir de transit de la Lune s'est calibré sur un décalage négatif, forçant une contre-rotation plus serrée.",
        hint: "Nécessite un tour en arrière. Essayez de faire tourner la roue principale vers la gauche (sens anti-horaire) pour atteindre le récepteur."
      },
      3: {
        name: "Résonance de l'Astrolabe",
        description: "Le récepteur du moteur s'enfonce profondément dans l'ombre des engrenages inférieurs. La double déviation exige une extrême précision de remontage.",
        hint: "Une déviation d'angle plus profonde. Tournez lentement. Le curseur de friction peut vous aider à effectuer des micro-adjustements de précision."
      },
      4: {
        name: "L'Éclipse de la Couronne",
        description: "Notre dernière barrière céleste. L'ouverture très étroite du récepteur nécessite un équilibre parfait. Attention au glissement de vitesse provoqué par l'inertie !",
        hint: "Le chef-d'œuvre de l'horlogerie. Réduisez votre vitesse et utilisez le défilement de précision pour des micro-ajustements micrométriques."
      }
    }
  }
};
