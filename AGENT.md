# Game Puzzle (Slide Puzzle) - Agent Guide

## Architecture

- **App.tsx** — Entry point. Manages `moves` count, `won` flag, and a `key` counter (used to force `Board` remount on reset) via `useVar` from `orbitcode`. Renders `Board`, `Controls`, and conditionally `WinModal`.
- **Board.tsx** — Core puzzle logic. Generates a solvable N x N sliding puzzle using Fisher-Yates shuffle with inversion-count solvability check. Uses `useState` for tile array. Handles tile clicks: swaps with adjacent empty cell, calls `onMove`, checks win condition.
- **Tile.tsx** — Renders a single tile as a `<button>`, or an empty `<div>` for the blank space (value 0).
- **Controls.tsx** — Displays move counter and "New Game" reset button.
- **WinModal.tsx** — Overlay modal shown on win, displays move count and "Play Again" button.
- **styles.css** — Global styles. Each component also imports its own CSS file.

Data flow: `App` owns persistent state (`moves`, `won`, `key`) and passes `onMove`/`onWin`/`onReset` callbacks down. `Board` owns transient tile state internally via `useState`. The `key` prop on `Board` forces a full remount (re-shuffle) on reset.

## Styling

- Separate `.css` files per component: `Board.css`, `Tile.css`, `Controls.css`, `WinModal.css`, plus `styles.css` for globals.
- Plain CSS class selectors (e.g., `.board`, `.tile`, `.win-overlay`). Not CSS modules.
- Board uses inline `gridTemplateColumns`/`gridTemplateRows` for dynamic grid sizing.

## Extension Points

- Change puzzle size by passing a different `size` prop to `Board` (default is 4). The shuffle/solvability logic is already generic.
- Add difficulty levels by introducing a timer, move limits, or varying grid size from `App`.
- Add tile animations by extending `Tile.tsx` with CSS transitions on position changes.

## Constraints

- The solvability algorithm assumes a standard N-puzzle; custom tile layouts must maintain the inversion-count invariant or the puzzle may be unsolvable.
