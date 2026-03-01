import './Tile.css'

interface TileProps {
  value: number
  onClick: () => void
}

function Tile({ value, onClick }: TileProps) {
  if (value === 0) {
    return <div className="tile empty" />
  }

  return (
    <button className="tile" onClick={onClick}>
      {value}
    </button>
  )
}

// Default export renders component in isolation for preview
export default function TilePreview() {
  return (
    <div className="preview-container">
      <div className="preview-tiles">
        <Tile value={1} onClick={() => {}} />
        <Tile value={8} onClick={() => {}} />
        <Tile value={15} onClick={() => {}} />
        <Tile value={0} onClick={() => {}} />
      </div>
    </div>
  )
}

export { Tile }
