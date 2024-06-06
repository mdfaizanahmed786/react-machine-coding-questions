import React, { useCallback, useEffect, useState } from "react"

export default function DisplayWithPagination() {
  const [user, setUser] = useState('');
  const [page, setPage]=useState(1)
  const skip=page*10-10;
  const [responseData, setResponseData]=useState({
    users:[] as any,
    total:0
  })
  
  const fetchUser = useCallback(async () => {
    try {
      let response;
      if (user) {
        response = await fetch(`https://dummyjson.com/users/search?q=${user}&limit=10&skip=${skip}`);
      } else {
        response = await fetch(`https://dummyjson.com/users?limit=10&skip=${skip}`);
      }
      if (!response.ok) {
        throw new Error("Error loading data");
      }
      const data = await response.json();
      setResponseData(prevData => ({
        ...prevData,
        total: data.total,
        users: page === 1 ? data.users : [...prevData.users, ...data.users]
      }));
    } catch (err) {
      console.log(err);
    }
  }, [user, page]);

  
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    setResponseData({ users: [], total: 0 });
    setPage(1);
  }, [user]);


  const myDebounce = (cb, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const handleDebounceSearch = myDebounce((e) => {
    setUser(e.target.value);
    setPage(1);  
  }, 800);


  // Requirements
  // 1. Display input box and users list
  // 2. Add pagination to users
  // 3. Search Users and display information
  // 4. Debounce the search.
  return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
    <div>
      <input placeholder="Search User" defaultValue={user} onChange={handleDebounceSearch} />

      {responseData.users.map((item:any, i)=>(
    <div key={item.id}>
    <p>{item.firstName}</p>
    
    </div>
      ))}

      {(responseData.total!==0 && responseData.users.length!==responseData.total) && <div>
      <button onClick={()=>setPage(p=>p+1)}>Load More</button>
      </div>}

    </div>
  </div>
}