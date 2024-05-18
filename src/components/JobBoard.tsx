import { useEffect, useState } from "react";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [slicedJobs, setSlicedJobs] = useState([]);
  const [error, setError] = useState('');
  const [fetchingStatus, setFetchingStatus]=useState(false)

  const fetchJobPostings = async () => {
    try {
      const fetchJobIds = await fetch(
        "https://hacker-news.firebaseio.com/v0/jobstories.json"
      );
      const responseIds = await fetchJobIds.json();
      if (responseIds.length) {
        const jobDetailsArray = await Promise.all(
          responseIds.map((item:any) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
              .then((response) => response.json())
              .catch((error) => {
                console.error("Error fetching job details:", error);
                throw error; 
              })
          )
        );

        setJobs(jobDetailsArray);
      }
    } catch (err) {
      console.error("Error fetching job IDs:", err);
      setError("Failed to fetch job postings. Please try again later.");
    }
  };

  useEffect(() => {
    fetchJobPostings();
  }, []);

  useEffect(() => {
    if (jobs.length !== 0) {
      const startIndex=(page-1)*6;
      const endIndex=startIndex+6;
      let slicedJobs2 = jobs.slice(startIndex, endIndex);
      setSlicedJobs([...slicedJobs, ...slicedJobs2]);
     
    }
  }, [jobs, page]);

  return (
    <div>
      <h1>Hacker News Jobs Board</h1>
      <div className="job-container">
        {error ? (
          <p>{error}</p>
        ) : (
          slicedJobs.length !== 0 &&
          slicedJobs.map((item:any) => (
            <div key={item.id} className="job-posting">
              <a target="_blank" href={item.url} className="job-title">
                {" "}
                <h3>{item.title}</h3>
              </a>
            </div>
          ))
        )}
      </div>
      { (slicedJobs.length !== 0 && slicedJobs.length!==jobs.length) &&  <button disabled={fetchingStatus} onClick={() => setPage((p) => p + 1)}>{fetchingStatus ? "Loading" : "Load More"}</button>}
    </div>
  );
}
