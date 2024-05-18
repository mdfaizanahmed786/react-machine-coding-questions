import { useEffect, useState } from "react";


const ImageSlider = () => {
  const [photos, setPhotos] = useState([]);
  const [sliced, setSliced] = useState(0);
  const [limit, setLimit]=useState(1);

  useEffect(() => {
  
    fetch(`https://picsum.photos/v2/list?page=1&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
      });
  }, [limit]);

  const handlePrevClick = () => {
    
    setSliced((prev) => Math.max(0, prev - 1));
 
  };

  const handleNextClick = () => {
    
    setSliced((prev) => Math.min(photos.length - 1, prev + 1));
    if(limit>photos.length) return;
    setLimit(prev=>prev+1)
  };

  return (
    <div>
      <div style={{
      display: "flex",
      gap: "5px",
      width: "598px",
      margin: "auto",
      overflow: "hidden",
      position: "relative"

      
      }}>
        {photos.length !== 0 &&
          photos.map((photo:any, i) => (
            <div
              key={photo.id}
           
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                transition: "transform 0.5s ease-in-out",
                transform: `translateX(-${sliced * 600}px)` }}
            >
              <div onClick={handlePrevClick} >
                Previous
              </div>
              <img style={{ width: "500px" }} src={photo.download_url} alt={`Slide ${i}`} />
              <div onClick={handleNextClick} >
                Next
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageSlider;
