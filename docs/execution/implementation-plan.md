# Meeting Bingo - Implementation Plan

**Execution Method**: Claude-Flow with Specialist Agents
**Local Build**: Docker (container: `my-project-dev-1`)
**Deployment**: Vercel
**Target**: 90-minute MVP

---

## Pre-Execution Checklist

- [ ] Docker daemon running
- [ ] Container `my-project-dev-1` available
- [ ] Vercel CLI installed (`npm i -g vercel`)
- [ ] GitHub repo connected

---

## Phase 0: Docker Environment Setup

**Agent**: `system-architect`
**Duration**: 10 min
**Priority**: CRITICAL

### Tasks

1. Create `Dockerfile` for Node 20 development
2. Create `docker-compose.yml` with dev profile
3. Configure volume mounts for hot reload
4. Verify container builds and runs

### Deliverables

```
project-root/
├── Dockerfile
├── docker-compose.yml
└── .dockerignore
```

### Docker Configuration

```yaml
# docker-compose.yml
version: '3.8'
services:
  dev:
    build: .
    container_name: my-project-dev-1
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - node_modules:/app/node_modules
    command: npm run dev
    profiles:
      - dev

volumes:
  node_modules:
```

### Validation Commands

```bash
docker compose --profile dev build
docker compose --profile dev up -d
docker ps --filter "name=my-project-dev-1"
```

---

## Phase 1: Project Foundation

**Agent**: `coder`
**Duration**: 20 min
**Depends On**: Phase 0

### Tasks

1. Initialize Vite + React + TypeScript project
2. Install dependencies (in container)
3. Configure Tailwind CSS
4. Create project structure
5. Define TypeScript interfaces

### Commands (All in Docker)

```bash
# Initialize project
docker exec my-project-dev-1 npm create vite@latest . -- --template react-ts

# Install dependencies
docker exec my-project-dev-1 npm install
docker exec my-project-dev-1 npm install canvas-confetti
docker exec my-project-dev-1 npm install -D tailwindcss postcss autoprefixer @types/canvas-confetti

# Initialize Tailwind
docker exec my-project-dev-1 npx tailwindcss init -p
```

### Files to Create

| File | Agent | Description |
|------|-------|-------------|
| `src/types/index.ts` | coder | TypeScript interfaces |
| `src/data/categories.ts` | coder | Buzzword data (3 categories) |
| `src/lib/utils.ts` | coder | Utility functions (cn helper) |
| `tailwind.config.js` | coder | Tailwind configuration |
| `src/index.css` | coder | Tailwind imports |

### Validation

```bash
docker exec my-project-dev-1 npm run typecheck
docker exec my-project-dev-1 npm run dev
# Verify http://localhost:3000 loads
```

---

## Phase 2: Core Game Logic

**Agent**: `coder`
**Duration**: 30 min
**Depends On**: Phase 1

### Tasks

1. Implement card generation algorithm
2. Implement BINGO detection logic
3. Implement word detection logic
4. Build UI components

### Files to Create

| File | Priority | Description |
|------|----------|-------------|
| `src/lib/cardGenerator.ts` | P0 | Fisher-Yates shuffle, 5x5 grid |
| `src/lib/bingoChecker.ts` | P0 | Row/col/diagonal win detection |
| `src/lib/wordDetector.ts` | P0 | Transcript word matching |
| `src/components/LandingPage.tsx` | P1 | Welcome screen |
| `src/components/CategorySelect.tsx` | P1 | Category picker (3 options) |
| `src/components/BingoCard.tsx` | P0 | 5x5 game grid |
| `src/components/BingoSquare.tsx` | P0 | Individual square component |
| `src/components/GameBoard.tsx` | P0 | Main game container |
| `src/components/GameControls.tsx` | P1 | Start/stop listening buttons |
| `src/App.tsx` | P0 | Root component with routing |

### Component Hierarchy

```
App
├── LandingPage
├── CategorySelect
├── GameBoard
│   ├── BingoCard
│   │   └── BingoSquare (x25)
│   ├── GameControls
│   └── TranscriptPanel
└── WinScreen
```

### Validation

```bash
docker exec my-project-dev-1 npm run typecheck
docker exec my-project-dev-1 npm run build
# Manual: Select category → Card generates → Manual tap works → BINGO triggers
```

---

## Phase 3: Speech Recognition

**Agent**: `coder`
**Duration**: 25 min
**Depends On**: Phase 2

### Tasks

1. Create Web Speech API hook
2. Wire transcript to word detection
3. Auto-fill squares on word match
4. Build TranscriptPanel component
5. Handle microphone permissions

### Files to Create

| File | Description |
|------|-------------|
| `src/hooks/useSpeechRecognition.ts` | Web Speech API wrapper |
| `src/hooks/useGame.ts` | Game state management |
| `src/hooks/useBingoDetection.ts` | Win condition watcher |
| `src/components/TranscriptPanel.tsx` | Live transcript display |

### Browser Compatibility Note

Web Speech API requires:
- Chrome (full support)
- Edge (full support)
- Safari (partial)
- Firefox (no support)

### Validation

```bash
# Manual testing required
# 1. Click "Start Listening"
# 2. Speak a buzzword from the card
# 3. Verify square auto-fills
# 4. Verify transcript displays
```

---

## Phase 4: Polish & Win Screen

**Agent**: `coder`
**Duration**: 15 min
**Depends On**: Phase 3

### Tasks

1. Add confetti celebration (canvas-confetti)
2. Build WinScreen component
3. Implement share functionality
4. Add winning line highlight animation
5. Calculate and display game stats

### Files to Create

| File | Description |
|------|-------------|
| `src/components/WinScreen.tsx` | Victory celebration screen |
| `src/lib/shareUtils.ts` | Native Share API wrapper |
| `src/components/ui/Button.tsx` | Reusable button component |
| `src/components/ui/Card.tsx` | Card wrapper component |

### Confetti Implementation

```typescript
import confetti from 'canvas-confetti';

function celebrate() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}
```

### Validation

```bash
docker exec my-project-dev-1 npm run build
docker exec my-project-dev-1 npm run preview
# Full end-to-end test: Start → Select → Play → Win → Share
```

---

## Phase 5: Testing

**Agent**: `tester`
**Duration**: 10 min
**Depends On**: Phase 4

### Test Checklist

```markdown
## Core Functionality
- [ ] App loads without errors
- [ ] All 3 categories display correctly
- [ ] Card generates 24 unique words + FREE space
- [ ] Manual tap toggles square state
- [ ] BINGO triggers on row completion
- [ ] BINGO triggers on column completion
- [ ] BINGO triggers on diagonal completion

## Speech Recognition
- [ ] Microphone permission requested
- [ ] Listening indicator visible when active
- [ ] Transcript updates in real-time
- [ ] Buzzwords auto-fill corresponding squares
- [ ] Multiple words detected in single sentence

## Win Experience
- [ ] Confetti animation plays
- [ ] Winning line highlighted
- [ ] Game stats displayed (time, words detected)
- [ ] Share button generates correct text
- [ ] "Play Again" restarts game

## Edge Cases
- [ ] App works without microphone (manual mode)
- [ ] Long phrases detected ("circle back")
- [ ] Refresh preserves nothing (stateless OK for MVP)
```

### Commands

```bash
docker exec my-project-dev-1 npm run lint
docker exec my-project-dev-1 npm run typecheck
docker exec my-project-dev-1 npm run build
```

---

## Phase 6: Vercel Deployment

**Agent**: `cicd-engineer`
**Duration**: 10 min
**Depends On**: Phase 5

### Tasks

1. Create Vercel configuration
2. Connect GitHub repository
3. Deploy to production
4. Verify live site

### Files to Create

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Deployment Commands

```bash
# Build locally first
docker exec my-project-dev-1 npm run build

# Deploy (run on host, not in container)
vercel --prod
```

### Post-Deployment Validation

- [ ] Site loads at `https://meeting-bingo.vercel.app`
- [ ] HTTPS certificate valid
- [ ] All features work in production
- [ ] Share URLs work correctly

---

## Agent Assignment Summary

| Phase | Agent | Tasks |
|-------|-------|-------|
| 0 | `system-architect` | Docker setup, compose config |
| 1 | `coder` | Project init, types, structure |
| 2 | `coder` | Game logic, UI components |
| 3 | `coder` | Speech recognition, hooks |
| 4 | `coder` | Win screen, polish, share |
| 5 | `tester` | Manual testing, validation |
| 6 | `cicd-engineer` | Vercel deployment |

---

## Claude-Flow Execution Command

```bash
# Initialize swarm with anti-drift config
npx @claude-flow/cli@latest swarm init --topology hierarchical --max-agents 6 --strategy specialized

# Execute phases sequentially with dependency tracking
npx @claude-flow/cli@latest task create --name "meeting-bingo-mvp" --phases 7
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Docker build fails | Use node:20-slim base image |
| Web Speech API unsupported | Fallback to manual-only mode |
| Vercel deploy fails | Build locally first, check logs |
| Time overrun | Phase 4 polish is droppable |

---

## Success Criteria

1. **Local**: App runs in Docker at `http://localhost:3000`
2. **Functional**: Complete game flow works (start → play → win)
3. **Speech**: Auto-detection fills squares
4. **Deployed**: Live on Vercel with working URL
5. **Time**: Completed within 90 minutes

---

*Generated from architecture plan: `docs/architecture/meeting-bingo-architecture.md`*
