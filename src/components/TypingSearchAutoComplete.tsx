import  { useEffect, useState } from "react"

export default function TypingSearchAutoComplete(){
  const [users, setUsers]=useState({
    users:[]
  })
  const [search, setSearch]=useState("")
  const [loading, setLoading]=useState(false)

  const fetchFruits=async()=>{
    if(!search) return;
    try{
      setLoading(true)
      const response=await fetch(`https://dummyjson.com/users/search?q=${search}`)
      
      if(!response.ok){
        throw Error("Error fetching the things..")
      }
      const data=await response.json();
      setUsers(prev=>({...prev, users: data.users}))
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

  useEffect(()=>{
    setUsers({users:[]})
  },[search])

const myDebounce=(callback: ()=>void, delay:number)=>{
    let timer:any;

    return function(...args){
      if(timer) clearTimeout(timer)
      timer=setTimeout(()=>{
        callback(...args);
      },delay)
    }
  }

  
const handleDebounceSearch=myDebounce((e:any)=>{
     setSearch(e.target.value)
  },300)
  return <div style={{display:'flex', maxWidth:'90%', margin:'0 auto', justifyContent:'center'}}>
    <div>
  <input style={{width:'300px'}}  onChange={handleDebounceSearch}/>
      {loading ? <div style={{height:'200px', overflowY:'auto', boxShadow:'3px 3px 3px lightgrey'}}>Loading...</div> : 

    <>
  {users.users.length!==0 && <div style={{height:'200px', overflowY:'auto', boxShadow:'3px 3px 3px lightgrey'}}>
    {users.users.length!==0 && users.users.map((user:any, i)=>(
    <HighlightedText key={i} text={user.firstName} highlight={search}/>
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

  return <div>{
    parts.map((part, i)=>{
      return <span key={i}>
        {part.toLowerCase()===highlight.toLowerCase() ? <strong style={{color:'blue'}}>{part}</strong> : <span>{part}</span>}
      </span>
    })
  }</div>
  
}
