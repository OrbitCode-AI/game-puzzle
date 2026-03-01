import { useVar } from 'orbitcode'
import { Board } from './Board'
import { Controls } from './Controls'
import { WinModal } from './WinModal'
import './styles.css'

export default function App() {
  const [moves, setMoves] = useVar('puzzleMoves', 0)
  const [won, setWon] = useVar('puzzleWon', false)
  const [key, setKey] = useVar('puzzleKey', 0)

  const handleMove = () => {
    setMoves(m => m + 1)
  }

  const handleWin = () => {
    setWon(true)
  }

  const handleReset = () => {
    setMoves(0)
    setWon(false)
    setKey(k => k + 1)
  }

  return (
    <div className="puzzle-game">
      <header className="puzzle-header">
        <h1>Slide Puzzle</h1>
        <p>Arrange the numbers in order</p>
      </header>

      <Board key={key} onMove={handleMove} onWin={handleWin} />
      <Controls moves={moves} onReset={handleReset} />

      {won && <WinModal moves={moves} onPlayAgain={handleReset} />}
    </div>
  )
}
