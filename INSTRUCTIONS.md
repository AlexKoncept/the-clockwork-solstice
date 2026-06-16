# ⚙️ Notice d'Utilisation : The Clockwork Solstice

Bienvenue dans l'univers de **The Clockwork Solstice**, une expérience sensorielle et interactive mariant l'art de l'horlogerie mécanique, le modding de montres et la poésie céleste de l'astronomie.

Cette notice détaille le fonctionnement interne du projet, les secrets de sa conception et les façons d'interagir pleinement avec cette œuvre.

---

## 🎨 Le Concept & Fonctionnement

**The Clockwork Solstice** est un simulateur cinétique d'horlogerie céleste. Le projet simule le battement interne d'une montre mécanique (l'échappement, le balancier, la démultiplication des engrenages) tout en le synchronisant avec le cycle éternel des saisons et des solstices.

### 🌓 Les Deux États Saisons
Grâce au **Sélecteur Céleste**, l'application change de visage et d'atmosphère :
1.  **Solstice d'Hiver (Theme Sombre - Slate & Amber)** :
    *   *Atmosphère* : Une esthétique sobre inspirée des nuits froides et calmes.
    *   *Visuel* : Fonds charbon-ardoise, touches dorées vintage (`#D4A359`), et lignes de repères épurées. Les engrenages tournent avec une précision académique et posée.
    *   *Audio* : Sons d'échappement feutrés et ticks mécaniques classiques.
2.  **Solstice d'Été (Theme Clair - Sunny Rose & Neon)** :
    *   *Atmosphère* : Un espace lumineux et énergique célébrant le zénith du soleil.
    *   *Visuel* : Fond clair et lumineux aux nuances blanc-ivoire, sable rose et auras lumineuses floutées en arrière-plan. Engrenages habillés de finitions fuchsias et cyan.
    *   *Audio* : Fréquences de synthétiseur plus chaudes et résonances d'ondes de solstice.

---

## 🕹️ Comment Jouer & Interagir (La façon d'y jouer)

L'expérience se divise en deux phases hautement interactives :

### 1. La Console d'Accueil (Landing Page)
C'est votre panneau de contrôle préparatoire, un écrin de verre (Glassmorphisme ultra-léger) flottant sur un fond vibrant d'auras néons en mouvement.

*   **Changer de Langue** : En haut à droite, basculez instantanément entre l'anglais (**EN**) et le français (**FR**).
*   **Aperçu du Thème Céleste** : Utilisez le commutateur mécanique en haut à droite pour basculer la landing page de l'interrupteur Sombre (Hiver) au Blanc Lumineux (Été). Observez le fond, les boutons et les engrenages centraux s'adapter en temps réel !
*   **Lancer l'Expérience** : Cliquez sur le grand bouton central **LANCER LE MÉCANISME**. Un effet sonore métallique ("Clank") est joué pour initier le mécanisme.

---

### 2. Le Coeur de la Simulation (L'Écran Actif)
Une fois lancé, vous êtes face au simulateur d'échappement et de rotation planétaire.

*   **Contempler les Engrenages** :
    *   La grande couronne extérieure représente le cycle de rotation de la Terre autour de Sol (Le Soleil).
    *   L'engrenage satellite s'engrène précisément sur le globe central à pivot fluide.
*   **Bascule Directe des Solstices** :
    *   Cliquez sur le **Globe Céleste divisé** ou le commutateur de saison pour voir la montre se métamorphoser sous vos yeux. Les couleurs, les vitesses de rotation et l'interface s'ajustent dynamiquement.
*   **Contrôle de l'Échappement Temporel** :
    *   Des boutons de contrôle vous permettent de calibrer les battements de la montre ou de modifier le tempo.
    *   Chaque clic déclenche une impulsion sonore calibrée par synthèse fréquentielle.
*   **Le Synthétiseur Web Audio** :
    *   L'application n'utilise aucun fichier audio volumineux pré-enregistré : elle synthétise le bruit du métal, des ressorts et de l'onde de solstice directement à l'aide des oscillateurs de votre navigateur (Web Audio API).
*   **Quitter ou Réinitialiser** :
    *   Cliquez sur le bouton de retour pour vous déconnecter en douceur du simulateur et revenir à la console d'accueil d'Alex Koncept.

---

## 💡 Conseils & Recommandations

*   **Activer le Son** : Pour une expérience optimale de modding de montre, assurez-vous d'avoir le son activé. Suite aux restrictions de sécurité des navigateurs modernes, il vous faudra interagir une fois avec la page (en cliquant sur un thème ou le bouton de démarrage) pour autoriser la lecture audio.
*   **Ajustement de l'Écran** : L'interface est entièrement réactive (Responsive Design). Elle s'adapte aussi bien à un écran géant de bureau pour observer le ballet des engrenages, qu'à l'écran tactile d'un smartphone pour manipuler le mécanisme du bout des doigts.
*   **Le Logo Personnalisé** : Si vous placez un fichier image nommé `logo.png` à la racine du dossier public, l'application l'adopte instantanément en haut à gauche et dans l'onglet du navigateur pour une intégration complète de votre marque.

*Bonne exploration temporelle dans l'engrenage des solstices !*  
— **Alex Koncept** ⚙️🌸
