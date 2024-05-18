import Spinner from "../Spinner"
import { useState } from "react"


export default function LikeButton() {
  const [like, setLike] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErroMessage]=useState("")
  async function handleCall() {
    setLoading(true)
    try {
      const response = await fetch("https://www.greatfrontend.com/api/questions/like-button", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: like ? 'unlike' : 'like'
        })

      })
      const data = await response.json();
      console.log(data)
      console.log(response)
      if (!response.ok) {       
       setErroMessage(data.message)
        return;
      }
      setErroMessage("")
      setLike(m => !m)

    }
    catch (e) {
      console.log(e)
    }
    finally {
      setLoading(false)
    }
  }
  return(
    <>
    <button disabled={loading} onClick={handleCall}>{like ? "Liked" : "Like"}</button>
      {errorMessage}
      </>
  
  )
}