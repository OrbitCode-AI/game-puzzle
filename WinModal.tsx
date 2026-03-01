import './WinModal.css'

interface WinModalProps {
  moves: number
  onPlayAgain: () => void
}

function WinModal({ moves, onPlayAgain }: WinModalProps) {
  return (
    <div className="win-overlay">
      <div className="win-modal">
        <span className="win-emoji">🎉</span>
        <h2 className="win-title">Congratulations!</h2>
        <p className="win-text">You solved it in {moves} moves</p>
        <button className="win-button" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  )
}

// Default export renders component in isolation for preview
export default function WinModalPreview() {
  return <WinModal moves={42} onPlayAgain={() => alert('Play again!')} />
}

export { WinModal }
