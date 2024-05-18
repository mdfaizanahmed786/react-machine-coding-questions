import {useState} from "react"

export default function Accordion(){
  const [multiSelect, setMultiSelect]=useState(false)
  const [accordionItemsState, setAccordionItemsState]=useState([
    {
      id:1,
      title:"1st question",
      description:"This is some random",
      open:false
    },
    {
      id:2,
      title:"2nd question",
      description:"This is some random",
      open:false
    },
    {
      id:3,
      title:"3rd question",
      description:"This is some random",
      open:false
    }
  ])
  const handleOpen=(id: number)=>{
    const updatedItems=accordionItemsState.map(item=>{
      if(item.id===id){
        item.open=!item.open;
        return item
      }
      return !multiSelect ? {...item, open:false} : item
    })
    setAccordionItemsState(updatedItems) 
  }
  return (
    <div>
      <div style={{textAlign:"center", marginBottom:"15px"}}>
      <button onClick={()=>setMultiSelect(!multiSelect)} >{!multiSelect ? "Enable" : "Disable" } multiselect</button>
      
      </div>
      {accordionItemsState.map(item=>(
      <div className="accordion" style={{background:"blue", color:"white", padding:"20px" , marginBottom:"10px", cursor:"pointer"}} onClick={()=>handleOpen(item.id)}>
      <div className="accordion-title" style={{display:"flex", justifyContent:"space-between"}}>
        <div>{item.title}</div>
        <div>+</div>
      </div>
     {item.open && <div className="accordion-description">
          {item.description}
        </div>}
      </div>
      ))}

   
    </div>
  )
}