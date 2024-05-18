import { useCallback, useState } from "react"

export default function GridSelect({ rows, cols }: {
  rows: number
  cols: number
}) {

  const [isMouseDown, setIsMouseDown] = useState(false)
  const [boxes, setBoxes] = useState<number[]>([])
  const [startIndex, setStartIndex] = useState(0)

  const handleMouseUp = () => {
    // decolor the object here...
    console.log("MOUSEUP")
    setIsMouseDown(false)
    setStartIndex(0)
  }
  const handleElementDown = (index: number) => {
    setIsMouseDown(true)
    setStartIndex(index)

  }


  const handleElementEnter = useCallback((index: number) => {
    // coloring logic I need to write here.
    if (isMouseDown) {

      // I have the index: 50, totalRows:15, totalCols:15
      let row = Math.floor(index / cols)
      let col = index % cols;
      let startingRow = Math.floor(startIndex / cols);
      let startingCol = startIndex % cols;
      let boxesArray = []
      let rowStart = Math.min(startingRow, row)
      let rowEnd = Math.max(startingRow, row)
      let colStart = Math.min(startingCol, col)
      let colEnd = Math.max(startingCol, col)

      for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = colStart; j <= colEnd; j++) {
          // this is useful to get back index from rows and columns
          let index = i * cols + j
          boxesArray.push(index)
        }
      }
      setBoxes(boxesArray)
      console.log(boxesArray, "TIS IS S>>>>")
    }
  }, [isMouseDown])


  console.log(boxes, "BOOXX")


  return <div style={{ maxWidth: '300px' }}><div onMouseUp={handleMouseUp} style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '2px', userSelect: 'none' }}>


    {[...Array(rows * cols).keys()].map((_, i) => (
      <div key={i} onMouseEnter={() => handleElementEnter(i)} onMouseDown={() => handleElementDown(i)} style={{ border: '1px solid black', background: `${boxes.includes(i) ? "blue" : "transparent"}`, padding: '8px', textAlign: 'center' }}>
        {i + 1}
      </div>
    ))}




  </div>
  </div>
}