import { useState } from "react"

export const items = [

  {
    id: 1,
    title: "Man",
    description: "Famous entity"
  },
  {
    id: 2,
    title: "Animal",
    description: "Were officially rulers on the earth"
  },
  {
    id: 3,
    title: "Friend",
    description: "A close human of you.."
  }
]



export default function CustomTab() {
  const [currentTab, setCurrentTab] = useState<undefined | string>(items[0].description);

  const handleSelect = (id: number) => {
    const findItem = items.find(item => item.id === id);
    setCurrentTab(findItem?.description)
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>

        {items.map((item: any, i) => (
          <div onClick={() => handleSelect(item.id)} key={item.id}>
            <p>{item.title}</p>
          </div>
        ))}

      </div>
      <p>{currentTab}</p>


    </div>
  )
}