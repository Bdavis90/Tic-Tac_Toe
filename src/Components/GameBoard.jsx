

export default function GameBorad({ onSelectSquare, board }) {

    return <ol id="game-board">
        {board.map((row, rowIdx) =>
            <li key={rowIdx}>
                <ol>
                    {row.map((playerSymbol, colIdx) => (
                        <li key={colIdx}>
                            <button onClick={() => onSelectSquare(rowIdx, colIdx)} disabled={playerSymbol === null ? false : true}>{playerSymbol}</button>
                        </li>))}
                </ol>
            </li>)}

    </ol>
}