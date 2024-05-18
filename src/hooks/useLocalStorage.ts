import { useState } from "react";

export default function useLocalStorage(){
  const [theme, setTheme]=useState(()=>localStorage.getItem("theme"))

return [theme, setTheme] as const;

}