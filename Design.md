# NK NINJA STEAM GAME — Design Specification

> **Project:** NK Ninja STEAM Game  
> **Format:** Responsive Web Game / Educational Game / STEAM Game-Based Learning  
> **Game:** 2D Chibi Ninja Side-Scrolling Action Platformer  
> **Brand Promise:** **Real Learning × Virtual Adventure × A Brighter Future**  
> **Core Motto:** **PLAY • LEARN • CREATE • INNOVATE**

---

## 1. Vision

NK Ninja STEAM Game connects:

- **Real People** — authentic student/team identity
- **Virtual Ninja** — stylized chibi ninja avatars
- **STEAM Learning** — Science, Technology, Engineering, Arts, Mathematics
- **Game-Based Learning** — missions, challenges, rewards and problem solving
- **Future Skills** — creativity, computational thinking, analysis, collaboration and innovation

Core experience:

```text
REAL STUDENTS
      ↓
VIRTUAL NINJA CHARACTERS
      ↓
CHIBI NINJA GAME
      ↓
STEAM MISSIONS
      ↓
PROBLEM SOLVING
      ↓
REAL-WORLD LEARNING
```

---

## 2. Brand Position

### Master Brand

# NK NINJA

### Product Descriptor

# STEAM GAME

Recommended lockup:

```text
NK NINJA
STEAM GAME

REAL LEARNING × VIRTUAL ADVENTURE × A BRIGHTER FUTURE
```

### Brand Personality

| Attribute | Visual Expression |
|---|---|
| Adventurous | Dynamic ninja poses and motion trails |
| Intelligent | HUD, diagrams and STEAM interfaces |
| Innovative | Futuristic holographic technology |
| Educational | Clear learning missions |
| Youthful | Chibi characters and collectibles |
| Professional | Cinematic composition and consistent design |

Target position:

> **Premium educational game × cinematic ninja world × STEAM innovation**

---

## 3. Real + Virtual Design System

### REAL LAYER

Use authentic student photographs to establish project identity.

- Real faces
- Real people
- Real laboratory / STEAM environments
- Authentic uniforms where appropriate
- Natural photography
- Clear label: **REAL TEAM**

### VIRTUAL LAYER

Transform the project identity into fictional ninja characters.

- Chibi proportions
- Black tactical ninja clothing
- Mask
- Katana / shuriken
- Neon-green energy
- Japanese-inspired environments
- Game HUD

Label:

**VIRTUAL NINJA**

### GAME LAYER

The virtual game must clearly be:

> **2D CHIBI NINJA GAME**

It should include:

- Side scrolling
- Platforms
- Jumping
- Running
- Dash
- Sword attack
- Special attack
- Projectile
- Enemies
- Bosses
- Collectibles
- Mission objectives

---

## 4. Visual Identity

### Primary Palette

| Color | Hex | Use |
|---|---|---|
| Deep Navy | `#081020` | Main background |
| Midnight Blue | `#0B1830` | Panels |
| Neon Cyan | `#00E5FF` | Technology / UI |
| Neon Green | `#00FF90` | Ninja energy |
| Electric Blue | `#4DB8FF` | Interactive states |
| Purple | `#8B5CF6` | Special skills |
| Red | `#FF3B5C` | Damage / warning |
| Light Gray | `#E5E7EB` | Body text |
| White | `#FFFFFF` | Headlines |
| Gold | `#FFD34E` | Coins / rewards |

### Color hierarchy

```text
DEEP NAVY
   ↓
WHITE
   ↓
CYAN = TECHNOLOGY
GREEN = NINJA ENERGY
PURPLE = SPECIAL
RED = DANGER
GOLD = REWARD
```

Do not use every accent at equal intensity.

---

## 5. Typography

### Headlines

Recommended:

- Bebas Neue
- Anton
- Rajdhani Bold
- Orbitron Bold

Example:

```text
NK NINJA
STEAM GAME
```

### Body / UI

Recommended:

- Inter
- Noto Sans
- Kanit
- Prompt

English-first production should prioritize:

> **Inter + Rajdhani + Bebas Neue**

---

## 6. Logo

Primary:

```text
NK NINJA
STEAM GAME
```

Visual characteristics:

- Angular lettering
- White / icy-blue type
- Neon-green slash
- Shuriken symbol
- Cyan glow
- Dark navy background

App icon:

```text
┌─────────────┐
│      ✦      │
│   NK NINJA  │
│      ╱      │
└─────────────┘
```

Logo must remain readable at 32, 64, 128 and 512 px.

---

## 7. Character Direction

### Real Team

The supplied student photographs should remain photographic and recognizable when used as the **real-world team layer**.

Recommended label:

```text
REAL TEAM
```

### Main Virtual Character

**NINJA-01 — SHADOW BLADE**

Style:

- Chibi body
- Oversized head
- Expressive eyes
- Black tactical ninja outfit
- Mask
- Gloves
- Boots
- Utility belt
- Katana
- Optional red scarf
- Neon-green energy

Role:

> Agile balanced melee character

Abilities:

- Walk
- Run
- Jump
- Dash
- Slash
- Spin Slash
- Shuriken / Kunai Toss

---

## 8. Character Animation Set

Required animation states:

```text
IDLE
WALK
RUN
JUMP
FALL
LAND
DASH
ATTACK
COMBO
SPECIAL
PROJECTILE
HURT
KO
VICTORY
```

Recommended asset folders:

```text
characters/
└── ninja01/
    ├── idle/
    ├── walk/
    ├── run/
    ├── jump/
    ├── dash/
    ├── attack/
    ├── special/
    ├── projectile/
    ├── hurt/
    ├── ko/
    └── victory/
```

Recommended production frame:

```text
128 × 128 px
```

or

```text
160 × 160 px
```

For large promotional artwork:

```text
512 × 512 px
```

Keep the feet baseline, center point, scale and facing direction consistent.

---

## 9. Game Canvas

Recommended logical resolution:

```text
960 × 540 px
```

Aspect ratio:

```text
16:9
```

Architecture:

```text
Canvas 960 × 540
       ↓
Responsive CSS scaling
       ↓
Desktop / Tablet / Mobile
```

Game physics should use the logical resolution rather than CSS display dimensions.

---

## 10. Game Controls

| Input | Action |
|---|---|
| `A` / `←` | Move Left |
| `D` / `→` | Move Right |
| `SPACE` | Jump |
| `J` | Attack / Slash |
| `K` | Special Spin Slash |
| `L` | Dash / Slide |
| `E` | Shuriken / Kunai |

Mobile controls should mirror the same actions using touch buttons.

---

## 11. HUD

Top-left:

```text
[ NINJA AVATAR ]

SHADOW NINJA · Lv.1
██████████  HP
██████████  ENERGY
```

Top-right:

```text
🪙 000
SCORE 0000
```

Mobile controls:

```text
◀   ▶
```

and:

```text
JUMP   ⚔   SPECIAL   DASH   PROJECTILE
```

UI style:

- Dark translucent glass
- Cyan border
- Neon-green active state
- Rounded corners
- Soft glow
- High contrast

---

## 12. Core Gameplay Loop

```text
START
 ↓
MISSION
 ↓
RUN
 ↓
JUMP
 ↓
AVOID
 ↓
ATTACK
 ↓
COLLECT
 ↓
STEAM CHALLENGE
 ↓
CHECKPOINT
 ↓
BOSS / FINAL CHALLENGE
 ↓
MISSION COMPLETE
 ↓
LEARNING RESULT
 ↓
NEXT MISSION
```

---

## 13. STEAM Gameplay

### SCIENCE

Topics:

- Motion
- Energy
- Force
- Environment
- Materials

Game mechanic:

> Predict how an object moves before activating a mechanism.

### TECHNOLOGY

Topics:

- Coding
- Sensors
- Digital systems
- AI
- Data

Game mechanic:

> Select the correct digital sequence to unlock a gate.

### ENGINEERING

Topics:

- Structures
- Systems
- Design
- Optimization

Game mechanic:

> Build or select the correct mechanism.

### ARTS

Topics:

- Character design
- Visual composition
- Storytelling
- Sound

Game mechanic:

> Create or select the correct visual pattern.

### MATHEMATICS

Topics:

- Geometry
- Measurement
- Probability
- Trajectory
- Optimization

Game mechanic:

> Calculate a trajectory or select the correct solution.

---

## 14. Level Direction

### LEVEL 01 — NINJA ACADEMY

Focus:

> Introduction to STEAM

Environment:

- Japanese village
- Sakura
- Lanterns
- Temple

### LEVEL 02 — SCIENCE FOREST

Focus:

> Motion / Energy / Physics

### LEVEL 03 — TECHNOLOGY LAB

Focus:

> Coding / Sensors / Data

Environment:

- Futuristic laboratory
- Holographic displays
- Robots

### LEVEL 04 — ENGINEERING CITY

Focus:

> Structures / Systems / Optimization

### LEVEL 05 — MATHEMATICS SKY

Focus:

> Geometry / Trajectory / Calculation

### FINAL LEVEL — STEAM FUTURE CITY

Integrates:

```text
SCIENCE
TECHNOLOGY
ENGINEERING
ARTS
MATHEMATICS
```

---

## 15. Environment Direction

World progression:

```text
TRADITIONAL JAPAN
      ↓
NINJA VILLAGE
      ↓
FUTURE LABORATORY
      ↓
SMART CITY
      ↓
STEAM FUTURE CITY
```

Visual ingredients:

- Moonlight
- Sakura
- Mountains
- Torii gates
- Temples
- Waterfalls
- Futuristic towers
- Holographic interfaces
- Robots
- Digital displays

---

## 16. Enemies

### BASIC ENEMY

- Black / red palette
- Red glowing eyes
- Short katana
- Mask

### ADVANCED ENEMY

- Shield
- Projectile attack
- Faster movement

### BOSS

Large cyber-ninja or robotic guardian.

Boss mechanics should require:

- Timing
- Movement
- Strategy
- STEAM reasoning

---

## 17. Collectibles

### GOLD COIN

Purpose:

> Score / reward

### ENERGY ORB

Purpose:

> Restore special ability

### KNOWLEDGE CRYSTAL

Purpose:

> Unlock STEAM information

### HEART

Purpose:

> Restore HP

---

## 18. Learning UX

Educational content should be short and integrated into gameplay.

Example:

```text
MISSION

What force changes the ninja's motion?

A. Gravity
B. Color
C. Sound
D. Light
```

Correct:

```text
✓ CORRECT

SCIENCE +100 XP
```

Incorrect:

```text
TRY AGAIN

HINT:
Think about the force pulling objects downward.
```

---

## 19. Mission Complete

Recommended screen:

```text
MISSION COMPLETE

★ ★ ★

XP              +100
COINS            +50

STEAM SKILLS
SCIENCE          ✓
TECHNOLOGY       ✓

[ CONTINUE → ]
```

---

## 20. Real-to-Virtual Transformation

This is a key brand differentiator.

Narrative:

```text
REAL STUDENT
      ↓
STEAM LAB
      ↓
DIGITAL TRANSFORMATION
      ↓
NINJA AVATAR
      ↓
CHIBI GAME WORLD
      ↓
STEAM MISSION
      ↓
REAL-WORLD SOLUTION
```

Visual effects:

- Digital scan
- Particle dissolve
- Green energy
- Holographic grid
- Character silhouette
- Chibi transformation

Clearly distinguish documentary photography from fictional generated/game imagery.

---

## 21. Website Architecture

```text
HOME
│
├── PLAY GAME
│
├── ABOUT
│   ├── Project
│   ├── Team
│   └── STEAM Concept
│
├── CHARACTERS
│   ├── Real Team
│   └── Ninja Avatars
│
├── MISSIONS
│   ├── Science
│   ├── Technology
│   ├── Engineering
│   ├── Arts
│   └── Mathematics
│
├── LEARN
│
└── CREDITS
```

---

## 22. Landing Page

Hero:

```text
NK NINJA
STEAM GAME

REAL LEARNING × VIRTUAL ADVENTURE
× A BRIGHTER FUTURE

[ PLAY NOW ]
```

Hero composition:

1. Logo
2. Main ninja
3. Real team / real-world layer
4. Chibi game preview
5. STEAM icons
6. CTA

---

## 23. UI Components

Button hierarchy:

```text
[ PLAY NOW ]
[ MISSIONS ]
[ SETTINGS ]
```

States:

- Default
- Hover
- Active
- Disabled
- Success
- Danger

Visual treatment:

```text
DARK GLASS
+
CYAN BORDER
+
NEON GLOW
+
ROUNDED CORNERS
```

---

## 24. Icon System

Core STEAM icons:

- Science → Atom
- Technology → Microchip
- Engineering → Gear
- Arts → Palette
- Mathematics → π

Game icons:

- Attack → Katana
- Special → Spiral
- Dash → Lightning
- Projectile → Shuriken
- Coin → Coin
- Health → Heart
- Energy → Bolt
- Boss → Mask

Use a consistent line weight and rounded geometry.

---

## 25. Motion Design

UI:

- 150–250 ms transitions
- Small hover scale
- Neon glow
- Smooth button feedback

Game:

- Squash / stretch
- Attack trails
- Green energy arcs
- Particle bursts
- Limited camera shake
- Hit flash
- Dash streaks

Avoid excessive camera shake.

---

## 26. Accessibility

Support:

- Keyboard
- Touch
- Large controls
- High contrast
- Clear text
- Reduced motion
- Pause
- Visual feedback independent of sound

Minimum touch target:

```text
44 × 44 px
```

---

## 27. Responsive Design

### Desktop

```text
960 × 540 game area
+
full HUD
+
keyboard controls
```

### Tablet

```text
Responsive 16:9 game
+
touch controls
```

### Mobile

```text
Landscape preferred
+
touch controls
+
simplified HUD
```

---

## 28. Project Structure

```text
nk-ninja-steam-game/
│
├── index.html
├── Design.md
├── game.js
│
├── assets/
│   ├── characters/
│   ├── enemies/
│   ├── environments/
│   ├── effects/
│   ├── ui/
│   ├── icons/
│   ├── audio/
│   └── backgrounds/
│
└── docs/
    ├── storyboard/
    └── steam-learning/
```

---

## 29. Photography Direction

For real-person assets:

### DO

- Use authentic team photographs when appropriate.
- Preserve recognizable facial characteristics.
- Use realistic lighting.
- Clearly separate photography from fictional artwork.
- Label real imagery as **REAL TEAM** when useful.

### DO NOT

- Present generated faces as documentary photographs.
- Create misleading real-world claims.
- Blur the distinction between actual students and fictional ninja avatars.

Recommended labels:

```text
REAL TEAM
```

and:

```text
VIRTUAL NINJA
```

---

## 30. Brand Composition

Preferred campaign structure:

```text
┌─────────────────────────────────────────┐
│              REAL WORLD                 │
│                                         │
│        REAL STUDENT PHOTOGRAPHY         │
│                  ↓                      │
│             STEAM EXPERIENCE            │
├─────────────────────────────────────────┤
│             VIRTUAL WORLD               │
│                                         │
│            CHIBI NINJA GAME             │
│                  ↓                      │
│          PLAY • LEARN • CREATE          │
├─────────────────────────────────────────┤
│              REAL IMPACT                │
│                                         │
│         KNOWLEDGE → SKILLS → FUTURE     │
└─────────────────────────────────────────┘
```

---

## 31. Audio

Music:

- Cinematic electronic
- Japanese-inspired percussion
- Futuristic synth
- Light orchestral layers

SFX:

- Jump
- Landing
- Footstep
- Sword slash
- Special attack
- Dash
- Shuriken
- Coin
- Enemy hit
- Boss alert
- Mission complete

---

## 32. Educational Framework

Every mission follows:

```text
LEARNING OBJECTIVE
        ↓
GAME MECHANIC
        ↓
PLAYER ACTION
        ↓
FEEDBACK
        ↓
REFLECTION
        ↓
KNOWLEDGE REWARD
```

Example:

```text
PHYSICS
  ↓
PROJECTILE MOTION
  ↓
ADJUST ANGLE
  ↓
HIT TARGET
  ↓
TRAJECTORY EXPLANATION
  ↓
SCIENCE XP
```

---

## 33. Future Analytics

Possible metrics:

- Mission completion
- Time per mission
- Retry count
- STEAM challenge accuracy
- Skill progression
- Interaction frequency
- Difficulty selection

Educational analytics should follow appropriate privacy, consent and data-minimization practices.

---

## 34. Technical Direction

Prototype:

```text
HTML5
CSS3
JavaScript
Canvas 2D
```

Suggested future modules:

```text
Game Engine
├── Input Manager
├── Physics Manager
├── Animation Manager
├── Collision Manager
├── Combat Manager
├── Mission Manager
├── STEAM Challenge Manager
├── Audio Manager
├── UI Manager
└── Save / Progress Manager
```

---

## 35. Development Roadmap

### PHASE 1 — PROTOTYPE

- Movement
- Jump
- Collision
- Character animation
- Attack
- Enemy
- Coin
- Score

### PHASE 2 — GAME

- Multiple levels
- Boss
- Checkpoints
- Sound
- Music
- Character selection

### PHASE 3 — STEAM

- Learning missions
- Questions
- Knowledge rewards
- Progress dashboard

### PHASE 4 — WEB PLATFORM

- Landing page
- Game portal
- Team page
- Mission map
- Learning dashboard

### PHASE 5 — ADVANCED

- Adaptive difficulty
- AI-assisted learning paths
- Educational analytics
- Cooperative mode
- Teacher dashboard

---

## 36. Master Brand Messages

### Primary

> **REAL LEARNING × VIRTUAL ADVENTURE × A BRIGHTER FUTURE**

### Secondary

> **PLAY • LEARN • CREATE • INNOVATE**

### Educational

> **Turn STEAM knowledge into action.**

### Game

> **Run. Jump. Think. Create.**

### Campaign

> **Small Steps. Big Future.**

---

## 37. Master Visual Prompt

Use this prompt for future visual generation:

> **Create a premium cinematic visual for “NK NINJA STEAM GAME,” combining authentic real student photography with clearly separated fictional chibi ninja game characters. The real-world layer must look photographic and credible, while the virtual layer must be a polished 2D chibi ninja side-scrolling game. Use a deep navy futuristic Japanese environment, neon cyan technology lighting, neon green ninja energy, subtle purple special-skill accents, cherry blossoms, moonlight, temples, futuristic laboratories and smart cities. Integrate Science, Technology, Engineering, Arts and Mathematics through elegant icons and holographic interfaces. Use English text only. Maintain a premium educational-game identity, strong visual hierarchy, cinematic lighting, consistent character design, readable game HUD, responsive web-game composition, and the brand message “REAL LEARNING × VIRTUAL ADVENTURE × A BRIGHTER FUTURE.” Clearly distinguish REAL PEOPLE from VIRTUAL NINJA characters. Do not present fictional/generated scenes as documentary photographs.**

---

## 38. Production Checklist

- [ ] English-first interface
- [ ] Consistent NK Ninja logo
- [ ] Consistent ninja character design
- [ ] Real photographs clearly separated from fictional characters
- [ ] Chibi game art consistently 2D
- [ ] 16:9 game canvas
- [ ] Responsive desktop/mobile layout
- [ ] STEAM categories represented
- [ ] Neon green reserved for ninja energy
- [ ] Cyan reserved for technology/UI
- [ ] Red reserved for damage/warning
- [ ] Gold reserved for rewards
- [ ] Accessible touch targets
- [ ] Keyboard support
- [ ] Clear mission feedback
- [ ] Learning content reviewed before deployment
- [ ] Real and fictional imagery clearly labeled where needed

---

## 39. One-Line Brand Definition

> **NK Ninja STEAM Game is a game-based learning experience where real students become virtual chibi ninjas and turn STEAM knowledge into action.**

---

# END
