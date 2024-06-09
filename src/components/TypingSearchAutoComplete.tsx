import  { useEffect, useRef, useState } from "react"

export default function TypingSearchAutoComplete(){
  const [users, setUsers]=useState({
    users:[]
  })
  const [search, setSearch]=useState("")
  const [loading, setLoading]=useState(false)
  const [selectedIndex, setSelectedIndex]=useState(-1)
  const suggestedRefs=useRef([])

  const fetchFruits=async()=>{
    if(!search){
      setUsers({users:[]})
      
      return;
    }
    try{
      setLoading(true)
      const response=await fetch(`https://dummyjson.com/users/search?q=${search}`)
      
      if(!response.ok){
        throw Error("Error fetching the things..")
      }
      const data=await response.json();
      setUsers(prev=>({...prev, users: data.users}))
      setSelectedIndex(-1)
    }
    catch(err){
      console.log(err, "Error in this code")
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    
    fetchFruits();
  },[search])

  useEffect(() => {
    if (selectedIndex >= 0 && suggestedRefs.current[selectedIndex]) {
      suggestedRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);


const myDebounce=(callback: ()=>void, delay:number)=>{
    let timer:any;

    return function(...args){
      if(timer) clearTimeout(timer)
      timer=setTimeout(()=>{
        callback(...args);
      },delay)
    }
  }

  const handleKeyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{

    if(e.key==="ArrowDown"){
      setSelectedIndex(prev=>prev>=users.users.length-1 ? prev : prev+1)
      
    }
    else if(e.key==="ArrowUp"){
       setSelectedIndex(prev=>prev<=0 ? 0 : prev-1)
    }

    else if(e.key==="Enter"){
      setSearch(users.users[selectedIndex].firstName);
      setUsers({users:[]});
    }
    
  }

const handleMouseEnter=(index:number)=>{
  setSelectedIndex(index)
}
const handleDebounceSearch=myDebounce((e:any)=>{
     setSearch(e.target.value)
  },300)
  return <div style={{display:'flex', maxWidth:'90%', margin:'0 auto', justifyContent:'center'}}>
    <div>
  <input defaultValue={search} style={{width:'300px'}} onKeyDown={handleKeyDown}   onChange={handleDebounceSearch}/>
      {loading ? <div style={{height:'200px', overflowY:'auto', boxShadow:'3px 3px 3px lightgrey'}}>Loading...</div> : 

    <>
  {users.users.length!==0 && <div style={{height:'200px', overflowY:'auto', boxShadow:'3px 3px 3px lightgrey'}}>
    {users.users.length!==0 && users.users.map((user:any, i)=>(
      <div key={i} onClick={() => setSearch(user.firstName)}
        ref={(el)=>suggestedRefs.current[i]=el}
        style={{
          backgroundColor: i === selectedIndex ? "lightgray" : "white",
          padding: "5px",
          cursor: "pointer",
        }}
        
        onMouseEnter={()=>handleMouseEnter(i)}
        >
         <HighlightedText  text={user.firstName} highlight={search}/>
      </div>
   
    ))}
   </div>}
      </>  
      } 
 </div>
</div>
}




const HighlightedText=({text, highlight}: {text:string| any, highlight: string})=>{
  if (!highlight.trim()) {
    return <div>{text}</div>;
  }
    const highlightedRegex=new RegExp(`(${highlight})`, "gi");
    const parts=text.split(highlightedRegex)

  return <>{
    parts.map((part, i)=>{
      return <span key={i}>
        {part.toLowerCase()===highlight.toLowerCase() ? <strong style={{color:'blue'}}>{part}</strong> : <span>{part}</span>}
      </span>
    })
  }</>
  
}
