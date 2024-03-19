import { useState } from "react"
import Player from "./Components/Player"
import GameBorad from "./Components/GameBoard"

function App() {

  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare() {
    setActivePlayer((currActivePlayer) => currActivePlayer === "X" ? "O" : "X")
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/>
         <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"}/>
        </ol>
        <GameBorad onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
      </div>
    </main>
  )
}

export default App
