# Pokémon Battle Network

A grid-based, real-time Pokémon battle game inspired by Mega Man Battle Network.

## 🎮 Game Concept

Players control a Pokémon on a 6x3 grid battlefield, using their 4 moves (like Battle Chips) to defeat opponents in real-time combat. After each victory, choose rewards to power up for increasingly difficult battles.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ ([Download here](https://nodejs.org/))
- npm (comes with Node.js)

### Installation Steps

1. **Extract the project folder** to your desired location

2. **Open terminal/command prompt** in the `pokemon-battle-net` folder
   - Windows: Right-click in folder → "Open in Terminal"
   - Mac: Right-click → "New Terminal at Folder"
   - Or use `cd` to navigate: `cd path/to/pokemon-battle-net`

3. **Install dependencies:**
   ```bash
   npm install
   ```
   This will download Phaser and all required packages (may take 1-2 minutes)

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Your browser will automatically open** at `http://localhost:3000`
   - If it doesn't, manually open that URL in your browser

### What You'll See

1. **Title Screen** - Press SPACE to start
2. **Battle Scene** - 6x3 grid (blue=player, red=enemy)
3. **Press ENTER** - See reward screen
4. **Press SPACE** - Next round (difficulty increases!)

### Troubleshooting

**"npm: command not found"**
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart your terminal after installing

**"Cannot find module"**
- Make sure you're in the `pokemon-battle-net` folder
- Run `npm install` again

**Port 3000 already in use**
- Close other dev servers or change port in `vite.config.ts`

## 📁 Project Structure

```
pokemon-battle-net/
├── src/
│   ├── config/
│   │   └── gameConfig.ts      # Phaser configuration
│   ├── scenes/
│   │   ├── BootScene.ts       # Loading & title screen
│   │   ├── BattleScene.ts     # Main battle gameplay
│   │   └── RewardScene.ts     # Post-battle rewards
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   ├── utils/
│   │   └── constants.ts       # Game constants
│   └── main.ts                # Entry point
├── public/                     # Static assets (add later)
├── index.html                  # HTML entry
├── package.json                # Dependencies
├── vite.config.ts              # Vite configuration
└── tsconfig.json               # TypeScript config
```

## 🎯 What's Implemented

### ✅ Foundation Complete (Sprint 1: Sprites!)
- Vite + TypeScript + Phaser 3 setup
- Scene management (Boot → Battle → Reward)
- 6x3 battle grid visualization
- **🆕 20 Pokemon sprites loaded from PokeAPI CDN**
- **🆕 Player Pokemon (Pikachu) vs Random Enemy display**
- **🆕 Sprite animations (idle bouncing effect)**
- **🆕 Sprites persist across rounds (player stays, enemy changes)**
- Type system (Pokémon, Moves, Stats)
- Progression tracking
- Professional project structure

### 🎮 Testing The Sprites

When you run the game now:
1. **Title Screen** → Press SPACE
2. **Battle Grid** appears with **Pikachu on the left** vs **Random Pokemon on right**
3. Sprites **gently bounce** (idle animation)
4. Pokemon names shown below sprites
5. Press ENTER → Reward screen
6. Press SPACE → **Next round** (Pikachu stays, new enemy appears!)

### 🚧 Coming Next
1. Player movement on grid
2. Move selection UI
3. Enemy AI
4. Combat system
5. Reward selection

## 🛠️ Tech Stack

- **Phaser 3.80** - Game engine
- **TypeScript 5.3** - Type-safe JavaScript
- **Vite 5.0** - Lightning-fast build tool
- **WebGL/Canvas** - Hardware-accelerated rendering

## 📝 Development Commands

```bash
# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check (find TypeScript errors)
npm run typecheck
```

## 🎓 Understanding the Code

### Scene Flow
```
BootScene (loading, title)
    ↓ SPACE
BattleScene (gameplay)
    ↓ ENTER
RewardScene (choose rewards)
    ↓ SPACE
BattleScene (next round, harder)
```

### Key Phaser Concepts

**Scenes** are like different screens in your game:
- `preload()` - Load assets
- `create()` - Initialize scene (runs once)
- `update()` - Game loop (runs every frame ~60 FPS)

**Registry** stores global data:
```typescript
this.registry.set('key', value);  // Store
const data = this.registry.get('key');  // Retrieve
```

**Scene Switching**:
```typescript
this.scene.start('BattleScene');  // Start new scene
```

## 📚 Resources

- [Phaser 3 Docs](https://photonstorm.github.io/phaser3-docs/)
- [Phaser Examples](https://phaser.io/examples)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🎮 Next Steps

Once you have it running, we can add:
1. **Player sprite** that moves on the grid
2. **Move selection menu** (your 4 moves)
3. **Enemy Pokemon** with simple AI
4. **Combat mechanics** (attacks, damage, HP)
5. **Reward system** (new moves, stat boosts)

Ready to build the battle system? Let's do it! 🚀

## 📋 Quick Start Checklist

- [ ] Extract project folder
- [ ] Open terminal in folder
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Browser opens automatically
- [ ] See title screen
- [ ] Press SPACE to see grid
- [ ] It works! 🎉

---

**Having issues?** Make sure Node.js 18+ is installed and you're in the correct folder!
