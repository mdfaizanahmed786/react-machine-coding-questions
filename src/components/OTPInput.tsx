import React, { FormEvent, useEffect, useReducer, useRef, useState } from "react"

export default function OTPInput({ inputFields }: { inputFields: number }) {
  const [inputBoxes, setInputBoxes] = useState(new Array(inputFields).fill(""))
  const [checkNumberSubmitted, setCheckNumberSubmitted] = useState(false)
  const [numInput, setNumInput] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCheckNumberSubmitted(true)

  }
  return <div style={{ display: 'flex', justifyContent: 'center' }}>

    {!checkNumberSubmitted && <div>
      <h2 style={{ textAlign: 'center' }}>OTP Input</h2>
      <form onSubmit={handleSubmit}>

        <input value={numInput} maxLength={10} onChange={e => setNumInput(e.target.value)} />
        <button disabled={numInput.length < 10} type="submit">Submit</button>
      </form>

    </div>}

    {checkNumberSubmitted && <OTPInputBox inputBoxes={inputBoxes} setInputBoxes={setInputBoxes} otpNum={numInput} />}

  </div>
}

type OTPInputBoxProps = {
  inputBoxes: string[]
  setInputBoxes: React.Dispatch<React.SetStateAction<string[]>>
  otpNum: string
}

function OTPInputBox({ inputBoxes, setInputBoxes, otpNum }: OTPInputBoxProps) {

  const inputRefs = useRef<HTMLInputElement[] | any[]>([])
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [])

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newInputBoxes = [...inputBoxes];
   
    newInputBoxes[index] = e.target.value.substring(e.target.value.length - 1)
    const otpInputBoxesLength = newInputBoxes.length
    if (e.target.value && index < otpInputBoxesLength && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()

    }
    setInputBoxes(newInputBoxes)
  }

  const handlePress = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {  
   if(e.key==="Backspace" && !inputBoxes[index] && index>0 && inputRefs.current[index-1]){
        inputRefs.current[index-1].focus();
         } 
  }

  const handleClick=(index:number)=>{
    inputRefs.current[index].setSelectionRange(1,1)
    if(index>=0 && inputBoxes[index-1]===""){
      inputRefs.current[index-1].focus();
    }
    if(index<inputBoxes.length && inputBoxes[index+1]===""){
      inputRefs.current[index+1].focus();
    }
  }

  const checkForFilledValue=()=> inputBoxes.every(box=>box);


  const handleSubmitOTP=()=>{
    if(checkForFilledValue()){
      const OTP=inputBoxes.join("")
      alert(`Your OTP is: ${OTP}`)
    }
  }
  return <div style={{ textAlign: 'center' }}>
    <h3>OTP send to this number:</h3>
    <h4>{otpNum}</h4>

    <div style={{ display: 'flex', gap: "20px", alignItems: 'center' }}>
      {inputBoxes.map((value, index) => (
        <input onClick={()=>handleClick(index)} onKeyDown={(e) => handlePress(e, index)} ref={(el) => inputRefs.current[index] = el} value={value} style={{ width: "40px", textAlign: 'center', fontSize: '30px', padding: '10px' }} key={index} type="text" onChange={e => handleChange(e, index)} />
      ))}

    </div>

    <button disabled={!checkForFilledValue()} onClick={handleSubmitOTP}>Submit</button>
  </div>
}