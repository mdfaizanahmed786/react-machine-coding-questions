import { useState } from 'react'
import '../styles/password.css'
export default function GridLights() {
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ]

  const [order, setOrder] = useState<number[]>([])
  
  const deactivateCell=()=>{
   const timer=setInterval(()=>{
     
      setOrder((prevOrder)=>{
        const newOrder=prevOrder.slice();
        newOrder.pop();
        if(newOrder.length===0){
          clearInterval(timer)
        }
         return newOrder
      })
   
     
   },300)
  }


  const handleSelect = (index: number) => {
    const newOrder=[...order, index]
     setOrder([...order, index]);

     if(newOrder.length===config.flat(1).filter(Boolean).length){
       deactivateCell()
     }
  
  }


  return <div style={{ display: 'grid', maxWidth: '500px', margin: '0 auto', gridTemplateColumns: `repeat(${config[0].length}, 1fr)`, border: '2px solid black', gap: '10px', padding: '15px' }}>
    {config.flat(1).map((item, index) => {
      return item ? (<div key={index} onClick={() => handleSelect(index)} style={{ border: '2px solid black', height: '120px', background:`${order.includes(index) ? "green" : "transparent"}`, cursor:'pointer' }}>

      </div>) : (<span></span>)


    }
    )}
  </div>
}