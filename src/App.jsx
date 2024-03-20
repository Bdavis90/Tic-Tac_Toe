import { useState } from "react"
import Player from "./Components/Player"
import GameBorad from "./Components/GameBoard"
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./Components/WinningCombinations";
import GameOver from "./Components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if(gameTurns.length > 0 && gameTurns[0].player === "X")
  {
    currentPlayer = "O"
  };

  return currentPlayer;
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveWinner(gameBoard, players) {

  let winner = null;
  for(const combination of WINNING_COMBINATIONS)
  {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSymbol && firstSymbol === secondSymbol && secondSymbol == thirdSymbol)
    {
        winner = players[firstSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {

  
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {

  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIdx, colIdx) {
    setGameTurns(prevTurns => {

      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        {square: {row: rowIdx, col: colIdx},
        player: currentPlayer
      },...prevTurns];

      return updatedTurns;
    })
  }

  function handlePlayerNameChange(symbol, newName) {

    setPlayers(prevPlayers => {
      return {...prevPlayers,
        [symbol]: newName
      }
    })
  }


  function handleRestart() {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"}/>
         <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"}/>
        </ol>
        {(winner || hasDraw) && <GameOver onRestart={handleRestart} winner={winner}/>}
        <GameBorad onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
