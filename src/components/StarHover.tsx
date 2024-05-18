import React, { useState, useRef } from "react";
import { styles } from "./Star.module.css"

export default function StarHover() {
  const [recentlyClicked, setRecentlyClicked] = useState(false);
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

  const boxReference = useRef<HTMLDivElement>(null)
  const handleMouseEnter = (indx: number) => {
    console.log(indx, "Index for mouse enter")
    setHover(indx)
  }

  const handleMouseLeave = (indx: number) => {
    console.log(indx, "Index for mouse leave...")
    setHover(rating)
  }

  const handleClick = (indx: number) => {
    setRating(indx)
  }


  return (
    <div>
      {/* <div style={{ display: "flex", gap: "10px" }}>
      {memoizedBoxes.map((box) => (
        <div
          className="box"
          key={box.id}
 
          style={{
            backgroundColor: box.isHovered ? "yellow" : "black",
            height: "50px",
            width: "50px"
          }}
        ></div>
      ))}
    </div> */}
      <br />

      <div style={{ display: "flex", gap: "10px" }}>
        {Array(5).fill(false).map((_, i) => {
          i = i + 1
          return (

            <div

              key={i}
              onClick={() => handleClick(i)}
              onMouseMove={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}

              style={{
                backgroundColor: i <= (rating || hover) ? "yellow" : "black",
                height: "50px",
                width: "50px"
              }}
            ></div>
          )
        })}
      </div>

    </div>
  );
}