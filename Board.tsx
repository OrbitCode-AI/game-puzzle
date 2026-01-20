import { useState, useEffect, useCallback } from 'preact/hooks';
import { Tile } from './Tile';
import './Board.css';

interface BoardProps {
  size?: number;
  onMove?: () => void;
  onWin?: () => void;
}

function shuffle(array: number[]): number[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isSolvable(tiles: number[], size: number): boolean {
  let inversions = 0;
  for (let i = 0; i < tiles.length - 1; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] !== 0 && tiles[j] !== 0 && tiles[i] > tiles[j]) {
        inversions++;
      }
    }
  }
  const emptyRow = Math.floor(tiles.indexOf(0) / size);
  if (size % 2 === 1) {
    return inversions % 2 === 0;
  }
  return (inversions + emptyRow) % 2 === 1;
}

function createSolvablePuzzle(size: number): number[] {
  const solution = Array.from({ length: size * size }, (_, i) => (i + 1) % (size * size));
  let tiles: number[];
  do {
    tiles = shuffle(solution);
  } while (!isSolvable(tiles, size) || tiles.join() === solution.join());
  return tiles;
}

function Board({ size = 4, onMove, onWin }: BoardProps) {
  const [tiles, setTiles] = useState<number[]>(() => createSolvablePuzzle(size));

  const checkWin = useCallback((t: number[]) => {
    for (let i = 0; i < t.length - 1; i++) {
      if (t[i] !== i + 1) return false;
    }
    return t[t.length - 1] === 0;
  }, []);

  const handleTileClick = (index: number) => {
    const emptyIndex = tiles.indexOf(0);
    const row = Math.floor(index / size);
    const col = index % size;
    const emptyRow = Math.floor(emptyIndex / size);
    const emptyCol = emptyIndex % size;

    const isAdjacent =
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      onMove?.();

      if (checkWin(newTiles)) {
        setTimeout(() => onWin?.(), 300);
      }
    }
  };

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
      }}
    >
      {tiles.map((value, index) => (
        <Tile
          key={index}
          value={value}
          onClick={() => handleTileClick(index)}
        />
      ))}
    </div>
  );
}

// Default export renders component in isolation for preview
export default function BoardPreview() {
  return (
    <div className="preview-container">
      <Board
        size={3}
        onMove={() => console.log('Move!')}
        onWin={() => console.log('Win!')}
      />
    </div>
  );
}

export { Board };
