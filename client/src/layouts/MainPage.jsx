// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import Display from "../components/Display";
// import SearchBar from "../components/SearchBar";
import SignedOutNav from "../components/SignedOutNav";
//import axios from "axios";
// import Toast from "../components/Validation Toast/Toast";
// import useCoordinates from "../hooks/useCoordinates";
// import useNearby from "../hooks/useNearby";

function MainPage() {
  // added the useCoordinates hook to extract user coordinate.
  // const coordinates = useCoordinates();
  // // added useNearby to extract nearby data
  // const nearby = useNearby();
  // const [results, setResults] = useState({ data: [] });
  // const [error, setError] = useState([]);

  // const [isResults, setISResults] = useState(false);

  // useEffect(() => {
  //   if (Object.entries(results).length > 0) {
  //     setISResults(true);
  //   } else {
  //     setISResults(false);
  //   }
  // }, [results]);

  // useEffect(() => {
  //   localStorage.setItem("coord", JSON.stringify(coordinates));
  // }, [coordinates]);

  

  const [searchText, setSearchText] = useState('');
  const [nearby, setNearby] = useState(null);
  const [results, setResults] = useState(null);
  const [query, setQuery] = useState('');
  const [near, setNear] = useState('');
  const [radius, setRadius] = useState('');
  

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const getNearbyValue = (lat, lon) => {
    fetch(`http://localhost:8000/api/nearby/${lat},${lon}/findnearby`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message); // Print the message

        data.json.features.forEach((feature) => {
          const { address_line1, address_line2, city, categories } = feature.properties;
          console.log(`Address Line 1: ${address_line1}`);
          console.log(`Address Line 2: ${address_line2}`);
          console.log(`City: ${city}`);
          console.log(`First Category: ${categories[0]}`);
        });
        localStorage.setItem("nearby", JSON.stringify(data));
        setNearby(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(searchText);
  
  //   const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(searchText)}&format=json&apiKey=64b729f0cd984ae19c2aee543731c05e`;
  
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data && data.results && data.results[0]) {
  //         const { lat, lon } = data.results[0];
  //         getNearbyValue(lat, lon);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const baseUrl = 'https://api.foursquare.com/v2/venues/explore?';
    const clientId = 'client_id=B55KYNY4FGNGHGW4QVRGXVDY02BLHBNXSUSHVG2542D410E1';
    const cs = 'client_secret=L4HFGBEDB0TLHS24TC1A3VIZIC2N3YUVLZXTJOLDJOKJPGFY';
    const version = 'v=20151020';
    const venuePhotos = 'venuePhotos=1';
    const nearPlace = 'near=' + near.replace(" ", "+");
    const category = 'query=' + query;
    const limit = 'limit=10';
    const and = '&';
  
    const url = baseUrl + clientId + and + cs + and + version + and + venuePhotos + and + limit + and + nearPlace + and + category;
  
    fetch(url)
    .then(response => response.json())
    .then(data => {
      const groups = data.response.groups;
      if (groups.length > 0) {
        const items = groups[0].items;
        items.slice(0, 4).forEach(item => {
          
          console.log('Venue Name:', item.venue.name);
          console.log('Venue Location Address:', item.venue.location.address);
        });
        setResults(items);
      }
    })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      {/* {error ? error.map((item, idx) => <Toast key={idx} error={item} />) : ""} */}
      <SignedOutNav />
      <div className="flex flex-col items-center justify-center min-h-screen">
  <h3 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl my-5">
    Search Any Place
  </h3>

  <form onSubmit={handleSubmit} className="w-full max-w-sm">
    <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
      <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Place" />
      <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" value={near} onChange={(e) => setNear(e.target.value)} placeholder="Category" />
      <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" value={radius} onChange={(e) => setRadius(e.target.value)} placeholder="Radius" />
      <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
        Search
      </button>
    </div>
  </form>

  {results && results.map((item, index) => (
  <div key={index} className="max-w-sm rounded overflow-hidden shadow-2xl my-2">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 text-white">{item.venue.name}</div>
      <p className="text-white text-base">
        {item.venue.location.address || 'Address not available'}
      </p>
    </div>
  </div>
))}
</div>

      
    </div>
  );
}

export default MainPage;
