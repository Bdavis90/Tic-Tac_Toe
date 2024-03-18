import { useState } from "react"

export default function Player({ initialName, symbol }) {

    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false)

    function handleOnClick() {
        setIsEditing((editing) => !editing)
    }

    function handleOnChange(e) {
        console.log(e)
        setPlayerName(e.target.value)
    }
    return (
        <li>
            <span className="player">
            {!isEditing ?   <span className="player-name">{playerName}</span>
                 :<input type="text" required onChange={handleOnChange} value={playerName}/>}
                <span className="player-symbol">{symbol}</span>
                <button onClick={handleOnClick}>{isEditing ? "Save" : "Edit"}</button>
            </span>
        </li>
    )
}