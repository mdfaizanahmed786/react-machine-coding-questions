import { useEffect, useState } from 'react'
import '../styles/password.css'
const passwordStrengths = [{
  strength: 'Poor',
  start: 0,
  end: 7
},
{
  strength: 'Strong',
  start: 8,
  end: 13

},
{
  strength: 'Very Strong',
  start: 13,
  end: 21
}]

function DisplayLevel({ level }: { level: number }) {
  const [strength, setStrength] = useState('Poor')

  useEffect(() => {
    const filterArray = passwordStrengths.find(item => (level - item.start) * (level - item.end) <= 0)
    if (filterArray) {
      setStrength(filterArray.strength)

    }
  }, [level])
  return <div style={{ fontWeight: 'bold' }}>{strength}</div>

}

export default function PasswordGenerator() {


  const [inputRange, setInputRange] = useState(5);
  const [password, setPassword] = useState('')
  const [configurePassword, setConfigurePassword] = useState({
    includeUpperCase: false,
    includeLowerCase: false,
    includeNumbers: false,
    includeSymbols: false
  })

  // function getCharCodeFromNumber(start:number, end:number):string {
  //   return String.fromCharCode(Math.floor(Math.random()*end)+start)
  // }

  const generatePassword = () => {
    if (inputRange <= 0) {
      alert("Please select range")
      return

    }
    const checkAllFalse = Object.values(configurePassword).every(item => !item)
    if (checkAllFalse) {
      alert("Please enter alteast one condition")
      return;
    }
    let password = "";
    let charSet = ""

    if (configurePassword.includeLowerCase) {
      charSet += "abcdefghijklmnopqrstuvwxyz"
    }
    if (configurePassword.includeUpperCase) {
      charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    if (configurePassword.includeSymbols) {
      charSet += '@#()*+-!><'
    }
    if (configurePassword.includeNumbers) {
      charSet += '0123456789'
    }

    for (let i = 0; i < inputRange; i++) {
      password += charSet[Math.floor(Math.random() * charSet.length)]
    }

    setPassword(password)

  };



  const copyToClipBoard = () => {
    navigator.clipboard.writeText(password)
    alert("Copied to clipboard")
  }






  return <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
    <div className="parent-container">
      {password && <div className="character-container">
        <div>{password}</div>
        <button className="copy-btn" onClick={copyToClipBoard}>Copy</button>
      </div>}
      <div className="character-length">
        <div style={{ fontWeight: 'bold' }}>Character Length</div>
        <div>{inputRange}</div>
      </div>
      <div className="slider-container">
        <input min={5} max={20} value={inputRange} onChange={e => setInputRange(parseInt(e.target.value))} type="range" style={{ width: '100%' }} />
      </div>

      <div className="configure-options">
        <div className='include-options'>
          <div>
            <input type="checkbox" id="uppercase" name="uppercase" defaultChecked={configurePassword.includeUpperCase} onChange={e => setConfigurePassword({ ...configurePassword, includeUpperCase: !configurePassword.includeUpperCase })} />
            <label htmlFor="uppercase">Include Uppercase</label>

          </div>
          <div>
            <input type="checkbox" id="lowercase" name="lowercase" defaultChecked={configurePassword.includeLowerCase} onChange={e => setConfigurePassword({ ...configurePassword, includeLowerCase: !configurePassword.includeLowerCase })} />
            <label htmlFor="lowercase">Include Lowercase</label>

          </div>
          <div>
            <input type="checkbox" id="numbers" name="numbers" defaultChecked={configurePassword.includeNumbers} onChange={e => setConfigurePassword({ ...configurePassword, includeNumbers: !configurePassword.includeNumbers })} />
            <label htmlFor="numbers">Include Numbers</label>

          </div>
          <div>
            <input type="checkbox" id="symbol" name="symbol" defaultChecked={configurePassword.includeSymbols} onChange={e => setConfigurePassword({ ...configurePassword, includeSymbols: !configurePassword.includeSymbols })} />
            <label htmlFor="symbol">Include Symbols</label>

          </div>
        </div>
      </div>

      {password && <div className="strength-indicator">
        <div>Strength:</div>
        <DisplayLevel level={inputRange} />
      </div>}

      <div>
        <button onClick={generatePassword} className="generate-password">Generate Password</button>
      </div>
    </div>
  </div>

}