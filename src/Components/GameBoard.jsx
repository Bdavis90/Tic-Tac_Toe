import { useState } from "react"

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBorad({onSelectSquare, activePlayerSymbol}) {

    const [gameBoard, setGameBoard] = useState(initialGameBoard)

    function handleSelectSquare(rowIdx, colIdx) {

        setGameBoard((prevGameBoard) => {
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedBoard[rowIdx][colIdx] = activePlayerSymbol;
            return updatedBoard;
        })

        onSelectSquare();
    }

    return <ol id="game-board">
        {gameBoard.map((row, rowIdx) =>
            <li key={rowIdx}>
                <ol>
                    {row.map((playerSymbol, colIdx) => (
                        <li key={colIdx}>
                            <button onClick={() => handleSelectSquare(rowIdx, colIdx)}>{playerSymbol}</button>
                        </li>))}
                </ol>
            </li>)}

    </ol>
}