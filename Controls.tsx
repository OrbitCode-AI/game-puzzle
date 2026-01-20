import './Controls.css';

interface ControlsProps {
  moves: number;
  onReset: () => void;
}

function Controls({ moves, onReset }: ControlsProps) {
  return (
    <div className="controls">
      <div className="controls-stat">
        <span className="controls-label">Moves</span>
        <span className="controls-value">{moves}</span>
      </div>
      <button className="controls-button" onClick={onReset}>
        New Game
      </button>
    </div>
  );
}

// Default export renders component in isolation for preview
export default function ControlsPreview() {
  return (
    <div className="preview-container">
      <Controls moves={42} onReset={() => alert('Reset!')} />
    </div>
  );
}

export { Controls };
