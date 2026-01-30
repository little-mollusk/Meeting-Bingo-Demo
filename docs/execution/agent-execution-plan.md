# Agent Execution Plan - Meeting Bingo MVP

**Execution Method**: Claude-Flow Specialist Agents
**Issue Tracker**: Linear (MOL-11 through MOL-23)
**Effort Metric**: Tokens (not time)

---

## Execution Waves Overview

```
Wave 1: Infrastructure     → Wave 2: Foundation     → Wave 3: Core Logic
   │                            │                         │
   └─ system-architect          └─ coder                  └─ coder (parallel)
      ~30k tokens                  ~50k tokens               ~60k tokens
                                                             (3 sub-issues)

Wave 4: UI Components      → Wave 5: Integration    → Wave 6: Speech
   │                            │                         │
   └─ coder (parallel)          └─ coder                  └─ coder
      ~70k tokens                  ~20k tokens               ~60k tokens
      (2 sub-issues)

Wave 7: Polish            → Wave 8: Testing        → Wave 9: Deploy
   │                            │                         │
   └─ coder                     └─ tester                 └─ cicd-engineer
      ~40k tokens                  ~30k tokens               ~20k tokens

                                            TOTAL: ~380k tokens
```

---

## Wave 1: Infrastructure Setup

**Agent**: `system-architect`
**Linear Issue**: [MOL-11](https://linear.app/mollys-space/issue/MOL-11)
**Estimated Tokens**: ~30,000
**Parallelism**: Sequential (blocks all other waves)

### Tasks

| Task | Tokens | Output |
|------|--------|--------|
| Create Dockerfile | ~8k | `Dockerfile` |
| Create docker-compose.yml | ~10k | `docker-compose.yml` |
| Create .dockerignore | ~2k | `.dockerignore` |
| Validate container builds | ~10k | Container running |

### Agent Prompt

```
Execute MOL-11: Docker Environment Setup

Create Docker development environment:
1. Dockerfile with Node 20-slim base image
2. docker-compose.yml with dev profile
3. Container name: my-project-dev-1
4. Port 3000 mapped, node_modules volume

Validate with:
- docker compose --profile dev build
- docker compose --profile dev up -d
- docker ps --filter "name=my-project-dev-1"

Mark MOL-11 as Done when container is running.
```

### Completion Criteria

- [ ] Container `my-project-dev-1` running
- [ ] Port 3000 accessible
- [ ] Volume mounts working

---

## Wave 2: Project Foundation

**Agent**: `coder`
**Linear Issue**: [MOL-12](https://linear.app/mollys-space/issue/MOL-12)
**Estimated Tokens**: ~50,000
**Parallelism**: Sequential (depends on Wave 1)

### Tasks

| Task | Tokens | Output |
|------|--------|--------|
| Initialize Vite project | ~5k | `package.json`, configs |
| Install dependencies | ~5k | `node_modules` |
| Configure Tailwind | ~10k | `tailwind.config.js`, `postcss.config.js` |
| Create TypeScript types | ~15k | `src/types/index.ts` |
| Create category data | ~10k | `src/data/categories.ts` |
| Create utils | ~5k | `src/lib/utils.ts` |

### Agent Prompt

```
Execute MOL-12: Project Foundation

All commands via Docker:
docker exec my-project-dev-1 <command>

1. Initialize Vite + React + TypeScript
2. Install: react, react-dom, canvas-confetti
3. Install dev: tailwindcss, postcss, autoprefixer, @types/canvas-confetti
4. Configure Tailwind with custom animations
5. Create src/types/index.ts with interfaces from architecture doc
6. Create src/data/categories.ts with 3 buzzword categories (45+ words each)
7. Create src/lib/utils.ts with cn() helper

Validate: docker exec my-project-dev-1 npm run typecheck

Mark MOL-12 as Done when typecheck passes.
```

### Completion Criteria

- [ ] `npm run typecheck` passes
- [ ] `npm run dev` starts server
- [ ] Types defined for BingoSquare, BingoCard, GameState

---

## Wave 3: Core Logic (Parallel)

**Agents**: 3x `coder` (parallel execution)
**Linear Issues**: [MOL-18](https://linear.app/mollys-space/issue/MOL-18), [MOL-19](https://linear.app/mollys-space/issue/MOL-19), [MOL-20](https://linear.app/mollys-space/issue/MOL-20)
**Estimated Tokens**: ~60,000 total (~20k each)
**Parallelism**: 3 agents in parallel

### Agent 3A: Card Generator

**Issue**: MOL-18
**Tokens**: ~20,000

```
Execute MOL-18: Implement card generator logic

Create src/lib/cardGenerator.ts:
- Fisher-Yates shuffle algorithm
- generateCard(categoryId) function
- Build 5x5 grid with FREE space at center (row 2, col 2)
- Return BingoCard with squares array and words list

Test: Import and call generateCard('agile'), verify 24 unique words + FREE.

Mark MOL-18 as Done.
```

### Agent 3B: Bingo Checker

**Issue**: MOL-19
**Tokens**: ~20,000

```
Execute MOL-19: Implement bingo checker logic

Create src/lib/bingoChecker.ts:
- checkForBingo(card) → WinningLine | null
- Check all 5 rows
- Check all 5 columns
- Check both diagonals
- countFilled(card) → number
- getClosestToWin(card) → { needed, line } | null

Test: Create mock card with filled row, verify detection.

Mark MOL-19 as Done.
```

### Agent 3C: Word Detector

**Issue**: MOL-20
**Tokens**: ~20,000

```
Execute MOL-20: Implement word detector logic

Create src/lib/wordDetector.ts:
- normalizeText(text) for comparison
- escapeRegex(string) for special chars
- detectWords(transcript, cardWords, alreadyFilled) → string[]
- WORD_ALIASES map for common variations
- detectWordsWithAliases() for enhanced detection

Test: detectWords("let's circle back", ["circle back"]) returns ["circle back"]

Mark MOL-20 as Done.
```

### Completion Criteria

- [ ] All 3 lib files created
- [ ] Each function exported and typed
- [ ] Unit logic verifiable

---

## Wave 4: UI Components (Parallel)

**Agents**: 2x `coder` (parallel execution)
**Linear Issues**: [MOL-21](https://linear.app/mollys-space/issue/MOL-21), [MOL-22](https://linear.app/mollys-space/issue/MOL-22)
**Estimated Tokens**: ~70,000 total
**Parallelism**: 2 agents in parallel

### Agent 4A: Bingo Card Components

**Issue**: MOL-21
**Tokens**: ~30,000

```
Execute MOL-21: Build BingoCard and BingoSquare components

Create src/components/BingoSquare.tsx:
- Props: square, isWinningSquare, onClick
- Visual states: default, filled, auto-filled, free-space, winning
- Tailwind classes for each state
- Click handler (disabled for free space)

Create src/components/BingoCard.tsx:
- Props: card, winningSquares, onSquareClick
- Render 5x5 grid using CSS Grid
- Map squares to BingoSquare components
- Pass winning state to relevant squares

Mark MOL-21 as Done.
```

### Agent 4B: Page Components

**Issue**: MOL-22
**Tokens**: ~40,000

```
Execute MOL-22: Build page components

Create src/components/LandingPage.tsx:
- Welcome message with game title
- Brief description
- "Start Playing" button
- Props: onStart callback

Create src/components/CategorySelect.tsx:
- Display 3 category cards (agile, corporate, tech)
- Show icon, name, description for each
- Props: onSelect(categoryId), onBack

Create src/components/GameBoard.tsx:
- Container for BingoCard
- Slot for GameControls
- Slot for TranscriptPanel
- Props: game state, handlers

Create src/components/GameControls.tsx:
- Start/Stop listening toggle button
- New card button
- Props: isListening, onToggle, onNewCard

Mark MOL-22 as Done.
```

### Completion Criteria

- [ ] All components render without errors
- [ ] Props typed with TypeScript
- [ ] Tailwind styling applied

---

## Wave 5: App Integration

**Agent**: `coder`
**Linear Issue**: [MOL-23](https://linear.app/mollys-space/issue/MOL-23)
**Estimated Tokens**: ~20,000
**Parallelism**: Sequential (depends on Waves 3-4)

### Agent Prompt

```
Execute MOL-23: Wire up App routing and state

Modify src/App.tsx:
- Screen state: 'landing' | 'category' | 'game' | 'win'
- GameState management with useState
- handleStart() → category screen
- handleCategorySelect(id) → generate card, game screen
- handleWin(line, word) → win screen
- handlePlayAgain() → category screen
- handleBackToHome() → reset state, landing screen

Import and render:
- LandingPage (screen === 'landing')
- CategorySelect (screen === 'category')
- GameBoard (screen === 'game')
- WinScreen placeholder (screen === 'win')

Validate: Full navigation flow works without speech.

Mark MOL-23 as Done, then mark parent MOL-13 as Done.
```

### Completion Criteria

- [ ] Navigation between all screens works
- [ ] Card generates on category select
- [ ] Manual tap fills squares
- [ ] BINGO detection triggers win screen

---

## Wave 6: Speech Recognition

**Agent**: `coder`
**Linear Issue**: [MOL-14](https://linear.app/mollys-space/issue/MOL-14)
**Estimated Tokens**: ~60,000
**Parallelism**: Sequential (depends on Wave 5)

### Agent Prompt

```
Execute MOL-14: Speech Recognition

Create src/hooks/useSpeechRecognition.ts:
- Check for Web Speech API support
- SpeechRecognition instance management
- State: isSupported, isListening, transcript, interimTranscript, error
- startListening(onResult?) function
- stopListening() function
- resetTranscript() function
- Auto-restart on end if still listening

Create src/hooks/useGame.ts:
- Combine game state management
- Wire speech results to word detection
- Auto-fill squares on match

Create src/hooks/useBingoDetection.ts:
- Watch for filled squares
- Check for BINGO after each fill
- Trigger win callback

Create src/components/TranscriptPanel.tsx:
- Display listening indicator (red dot when active)
- Show last 100 chars of transcript
- Show interim transcript in gray
- Display recently detected words as chips

Wire into GameBoard:
- Connect useSpeechRecognition
- Connect word detection to card
- Show TranscriptPanel

Mark MOL-14 as Done.
```

### Completion Criteria

- [ ] Microphone permission requested on start
- [ ] Transcript displays spoken text
- [ ] Buzzwords auto-fill squares
- [ ] Works in Chrome/Edge

---

## Wave 7: Polish & Win Screen

**Agent**: `coder`
**Linear Issue**: [MOL-15](https://linear.app/mollys-space/issue/MOL-15)
**Estimated Tokens**: ~40,000
**Parallelism**: Sequential (depends on Wave 6)

### Agent Prompt

```
Execute MOL-15: Win Screen & Polish

Create src/components/WinScreen.tsx:
- Confetti animation on mount (canvas-confetti)
- Display "BINGO!" celebration
- Show winning word that triggered win
- Show game stats: squares filled, time elapsed
- "Play Again" button
- "Share" button

Create src/lib/shareUtils.ts:
- generateShareText(game) → string
- shareResult(game) using Web Share API
- Fallback to clipboard copy

Create src/components/ui/Button.tsx:
- Reusable button with variants: primary, secondary, ghost
- Size variants: sm, md, lg

Create src/components/ui/Card.tsx:
- Reusable card wrapper with padding and shadow

Add animations:
- Winning line pulse animation
- Square fill animation
- Confetti on BINGO

Mark MOL-15 as Done.
```

### Completion Criteria

- [ ] Confetti plays on win
- [ ] Share button works (or copies to clipboard)
- [ ] Animations smooth

---

## Wave 8: Testing & Validation

**Agent**: `tester`
**Linear Issue**: [MOL-16](https://linear.app/mollys-space/issue/MOL-16)
**Estimated Tokens**: ~30,000
**Parallelism**: Sequential (depends on Wave 7)

### Agent Prompt

```
Execute MOL-16: Testing & Validation

Run validation commands:
docker exec my-project-dev-1 npm run lint
docker exec my-project-dev-1 npm run typecheck
docker exec my-project-dev-1 npm run build

Manual test checklist (verify each):

Core Functionality:
- [ ] App loads without console errors
- [ ] All 3 categories display with correct words
- [ ] Card generates 24 unique words + FREE
- [ ] Manual tap toggles square fill state
- [ ] BINGO triggers on row completion
- [ ] BINGO triggers on column completion
- [ ] BINGO triggers on diagonal completion

Speech Recognition:
- [ ] Microphone permission requested
- [ ] Listening indicator shows red dot
- [ ] Transcript updates with spoken text
- [ ] Buzzwords auto-fill squares
- [ ] Multi-word phrases detected

Win Experience:
- [ ] Confetti animation plays
- [ ] Winning line highlighted
- [ ] Game stats displayed
- [ ] Share button works
- [ ] Play Again restarts correctly

Fix any issues found, then mark MOL-16 as Done.
```

### Completion Criteria

- [ ] All lint checks pass
- [ ] TypeScript compiles
- [ ] Production build succeeds
- [ ] Manual checklist complete

---

## Wave 9: Deployment

**Agent**: `cicd-engineer`
**Linear Issue**: [MOL-17](https://linear.app/mollys-space/issue/MOL-17)
**Estimated Tokens**: ~20,000
**Parallelism**: Sequential (depends on Wave 8)

### Agent Prompt

```
Execute MOL-17: Vercel Deployment

Create vercel.json:
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}

Build production locally:
docker exec my-project-dev-1 npm run build

Deploy to Vercel (run on host, not in container):
vercel --prod

Post-deployment validation:
- [ ] Site loads at Vercel URL
- [ ] HTTPS certificate valid
- [ ] All screens navigate correctly
- [ ] Speech recognition works
- [ ] Share URLs function

Mark MOL-17 as Done.
Mark project status as Completed.
```

### Completion Criteria

- [ ] Live URL accessible
- [ ] Full game flow works in production

---

## Token Budget Summary

| Wave | Issues | Agent(s) | Tokens | Cumulative |
|------|--------|----------|--------|------------|
| 1 | MOL-11 | system-architect | 30k | 30k |
| 2 | MOL-12 | coder | 50k | 80k |
| 3 | MOL-18,19,20 | 3x coder | 60k | 140k |
| 4 | MOL-21,22 | 2x coder | 70k | 210k |
| 5 | MOL-23 | coder | 20k | 230k |
| 6 | MOL-14 | coder | 60k | 290k |
| 7 | MOL-15 | coder | 40k | 330k |
| 8 | MOL-16 | tester | 30k | 360k |
| 9 | MOL-17 | cicd-engineer | 20k | **380k** |

---

## Parallel Execution Opportunities

| Wave | Agents | Max Parallelism |
|------|--------|-----------------|
| 1 | 1 | Sequential |
| 2 | 1 | Sequential |
| 3 | 3 | **3 parallel** |
| 4 | 2 | **2 parallel** |
| 5 | 1 | Sequential |
| 6 | 1 | Sequential |
| 7 | 1 | Sequential |
| 8 | 1 | Sequential |
| 9 | 1 | Sequential |

**Maximum concurrent agents**: 3 (Wave 3)
**Total agent invocations**: 13

---

## Claude-Flow Execution Commands

```bash
# Initialize swarm
npx @claude-flow/cli@latest swarm init --topology hierarchical --max-agents 3 --strategy specialized

# Wave 1
npx @claude-flow/cli@latest task create --issue MOL-11 --agent system-architect

# Wave 2
npx @claude-flow/cli@latest task create --issue MOL-12 --agent coder

# Wave 3 (parallel)
npx @claude-flow/cli@latest task create --issues MOL-18,MOL-19,MOL-20 --agent coder --parallel

# Wave 4 (parallel)
npx @claude-flow/cli@latest task create --issues MOL-21,MOL-22 --agent coder --parallel

# Wave 5
npx @claude-flow/cli@latest task create --issue MOL-23 --agent coder

# Wave 6
npx @claude-flow/cli@latest task create --issue MOL-14 --agent coder

# Wave 7
npx @claude-flow/cli@latest task create --issue MOL-15 --agent coder

# Wave 8
npx @claude-flow/cli@latest task create --issue MOL-16 --agent tester

# Wave 9
npx @claude-flow/cli@latest task create --issue MOL-17 --agent cicd-engineer
```

---

## Linear Status Updates

After each wave, update Linear:

```bash
# Mark issues done
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts done MOL-XX

# Update project status
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts project-status "Meeting Bingo MVP" in-progress

# Create progress update
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts create-project-update "Meeting Bingo MVP" "Wave X complete..."
```

---

*Generated for claude-flow execution with Linear integration*
