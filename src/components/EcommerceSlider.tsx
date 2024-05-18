import { useState } from "react"

export default function EcommerceSlider() {
  const [progress, setProgress] = useState(0)
  const shippingState = [
    {
      id: 0,
      initalWidth: 0,

    },
    {
      id: 1,
      initalWidth: 30,
    },
    {
      id: 2,
      initalWidth: 60
    },
    {
      id: 3,
      initalWidth: 90
    }
  ]
  const totalSteps = shippingState.length;
  // This is used to calculate transitions, for instance:
  // going from 0-1, 1-2, 2-3 (requires 3 transitions) 100/3 ===> 33.33 (each step should take 33.33 percentage.)
  const stepIncrement = 100 / (totalSteps-1);

  const handleNext = () => {
    setProgress((prev) => Math.min(prev + stepIncrement, 100));
  };
  return <div>
    <div style={{ padding: '28px', position: 'relative' }}>
      <div style={{ width: '100%', height: '6px', background: 'lightgrey', position: 'relative' }}>
        <div style={{ position: 'absolute', height: '6px', background: 'green', bottom: '0', width: `${progress}%`, transition: 'all 0.2s ease-in' }}>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', position: 'absolute', bottom: 0, top: 0 }}>
          {shippingState.map((item, index) => (
            <div key={item.id} style={{ borderRadius: '30px', padding: '14px 20px', transition: 'all 0.6s ease-in', background: `${index*stepIncrement <= progress ? "green" : "lightgrey"}` }}>
              {item.id + 1}
            </div>
          ))}
        </div>
      </div>


    </div>
  {progress<100 &&  <div style={{ textAlign: 'center', margin: '20px' }}>
      <button onClick={handleNext}>Next</button>

    </div>}
  </div>

}