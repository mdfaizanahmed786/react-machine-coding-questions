import { FormEvent, useEffect, useState } from "react";

export default function SearchUser() {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);

  const handleChange = (e: FormEvent) => {
    setValue(e.target.value);
  };

  const getUser = async () => {
    const response = await fetch(`https://dummyjson.com/users/search?q=${value}`);
    const data = await response.json();
    setUsers(data.users);
  };

  let debounceTimer;

  useEffect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      getUser();
    }, 700);
  }, [value]);
  return (
    <div>
      <input
        placeholder="Search for a user.."
        value={value}
        onChange={handleChange}
      />
      {users.length !== 0 &&
        users.map((user: any, i) => (
          <p key={user.id}>{user.firstName}</p>
        ))}
    </div>
  );
}
