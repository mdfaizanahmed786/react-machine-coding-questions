import { useEffect, useState } from "react"

export default function ProgressBar() {

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let validId:any;
    if (progress < 100) {
      validId = setInterval(() => {
        setProgress(p=>p+10);
      }, 1000);
    }
    else{
      clearInterval(validId)
    }
    

   
  
    

    return () =>{
     
      clearInterval(validId);
    } 
  }, [progress]);
 


  return <div>
    <div style={{ borderRadius: '10px', position: 'relative', background: 'gray', border: '2px solid gray', height: '20px' }}>
       <p style={{ color: 'white', zIndex:'999', margin:'0', textAlign:'center' }}> {progress}</p>
      <div style={{ width: `${progress}%`, background: 'green', color: 'green', position: "absolute", top: '0', bottom: '0', height: '100%', borderRadius: '10px' }}>
 
      </div>

    </div>

  </div>
}