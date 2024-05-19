import { useState } from "react"

export default function TicTacToe({ rows, cols }: { rows: number, cols: number }) {

  const [turn, setTurn] = useState("X")
  const [turnWon, setTurnWon] = useState("")
  const [board, setBoard] = useState<string[]>([...Array(cols * rows).fill("")])

  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const handleChangeTurn = (index: number) => {
    if (board[index] !== "") {
      return;
    }

    setTurn(turn === "X" ? "O" : "X")

    const newBoard = board.map((item, i) => i === index ? turn : item)
    setBoard(newBoard)

    let findBoxes: number[] = [];

    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === turn) {
        findBoxes.push(i)
      }
    }

    for (let i = 0; i < winningPositions.length; i++) {
      let check = winningPositions[i].every(item => findBoxes.includes(item))
      if (check) {  
        setTurnWon(`${turn} won!`)
        break;
      }
    }

    let checkFillAllEntries=newBoard.every(item=>item && !turnWon)
    if(checkFillAllEntries){
      setTurnWon("DRAW!!")
    }

  }


  const handleReset=()=>{
    setTurnWon("")
    setBoard([...Array(cols * rows).fill("")])
  }
  return <div style={{ maxWidth: "300px", margin: '0 auto' }}>
    <h2 style={{ textAlign: 'center' }}>Tic Tac Toe</h2>
    {turnWon && <h3 style={{ textAlign: 'center' }}>{turnWon}</h3>}
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '10px' }}>
      {board.map((item, i) => (
        <div key={i} style={{ background: 'lightgrey', height: "70px", padding: '10px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontSize: "40px", pointerEvents: `${turnWon ? "none" : "auto"}` }} onClick={() => handleChangeTurn(i)}>
          {item}
        </div>
      ))}

    </div>

    {turnWon && <div style={{display:"flex", justifyContent:'center', margin:"40px"}}> <button onClick={handleReset}>Reset Game</button></div>}

  </div>
}