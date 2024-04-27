import { useState, useEffect } from "react";

function useNearby() {
  const [nearby, setNearby] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const oldVal = await localStorage.getItem("coord");
    
      // @ts-ignore
      const parsedVal = JSON.parse(oldVal);
      if(parsedVal && Object.entries(parsedVal).length > 0){
        const { lat, long } = parsedVal;
        
        getNearbyValue(lat, long);
        localStorage.setItem("coord", JSON.stringify(parsedVal));
      }
    };

    fetchData();
  }, []);

  

  const getNearbyValue = (lat, long) => {
    
    fetch(`http://localhost:8000/api/nearby/${lat},${long}/findnearby`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("nearby", JSON.stringify(data));
        setNearby(data); // corrected this line
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return nearby;
}

export default useNearby;