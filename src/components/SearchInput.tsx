import { useEffect, useRef, useState } from "react"

export default function SearchInput() {
  const [searchUser, setSearchUser] = useState("")
  const [users, setUsers] = useState([])
  const [selectedId, setSelectedId] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [pills, setPills] = useState<string[]>([])
  const getUsers = async () => {
    const response = await fetch(`https://dummyjson.com/users/search?q=${searchUser}`);
    if (!response.ok) {
      return;
    }
    const data = await response.json()
    setUsers(data.users)
    console.log(data, "This is data")
  }
  useEffect(() => {
    if (searchUser)
      getUsers()
    else {
      setUsers([])
    }
  }, [searchUser])


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && searchUser === '' && pills.length > 0) {
      
      setPills((prev) => prev.slice(0, -1));
    }
  };

  const handleClick = (id: number, firstName: string) => {
    if (!pills.includes(firstName))
      setPills(prev => [...prev, firstName])
    else {
      const removeNamePills = pills.filter(pill => pill !== firstName)
      setPills(removeNamePills)
    }

  }

  const handleMouseOver = (id: number, firstName: string) => {
    if (!pills.includes(firstName))
      setSelectedId(id)
  }




  return <div style={{ maxWidth: '75%', margin: '0 auto' }}>
    <div className="input-container" style={{ width: '100%', height: '40px', fontSize: '20px', padding:'3px 4px', border: '2px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
      {pills.length > 0 &&
        <div style={{ display: 'flex', gap: '5px', }}>
          {pills.map(pill => (<Pill pills={pills} setPills={setPills} firstName={pill} />
          ))}

        </div>
      }
      <input ref={inputRef} style={{ border: 'none', fontSize: '20px', padding: '3px 20px', flex: '1', outline: 'none', }} onChange={e => setSearchUser(e.target.value)} placeholder={`${(pills.length === 0 && !searchUser) ? "Enter something to search" : ""}`} 
        onKeyDown={handleKeyDown}
        />

    </div>

    <div onMouseLeave={() => setSelectedId(0)} style={{ maxHeight: '600px', overflowY: 'auto' }}>
      {users.map((user: any) => (
        <div onMouseOver={() => handleMouseOver(user.id, user.firstName)} onClick={() => handleClick(user.id, user.firstName)} key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: `${selectedId === user.id ? "lightgray" : `${pills.includes(user.firstName) ? "lightblue" : "transparent"}`}`, cursor: 'pointer', padding: '4px', margin: '10px 0px' }}>
          <img style={{ width: '30px' }} src={user.image} alt={user.image} />
          <p>{user.firstName}</p>
        </div>
      ))}
    </div>
  </div>
}


function Pill({ firstName, pills, setPills }: { firstName: string, pills: string[], setPills: React.Dispatch<React.SetStateAction<string[]>> }) {
  const handleRemove = () => {
    const filterPills = pills.filter(name => name !== firstName)
    setPills(filterPills)
  }
  return <div style={{
    display: 'flex', alignItems: 'center', gap: '10px', background: 'lightgreen', height: '33px',
    padding: '0px 5px'
  }}>
    <p>{firstName}</p>
    <p onClick={handleRemove} style={{ cursor: 'pointer', color: 'white', fontWeight: 'bold' }}>X</p>
  </div>
}