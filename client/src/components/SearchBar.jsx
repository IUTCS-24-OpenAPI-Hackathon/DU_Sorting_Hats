// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Toast from "../components/Validation Toast/Toast";
import InputSearch from "./Search Bar Components/InputSearch";
import SeacrhIcon from "./Search Bar Components/SeacrhIcon";
import SearchButton from "./Search Bar Components/SearchButton";
import SearchLabel from "./Search Bar Components/SearchLabel";
import useErrors2 from "../hooks/useErrors2";


SearchBar.propTypes = {
  onSubmitResult: PropTypes.func.isRequired,
  getErrors: PropTypes.func.isRequired,
};

function SearchBar({ onSubmitResult, getErrors }) {
  const [search, setSearch] = useState("");
  const {errors, addError} = useErrors2({getErrors})


  useEffect(() => {
    frontSideErrors();
  }, []);

  const frontSideErrors = () => {
    if (!search || search.trim() === "") {
      addError("Please enter a valid search field");
    } else if (search.length < 3) {
      addError("Try adding more than 3 characters into the search");
    }else{
      addError('');
    }
    
  };

  const handleSearch = () => {
    fetch(`http://localhost:8000/api/places/${search}/findnearbytxt`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 404) {
          addError("Search result was not found!");
        } else if (response.status === 500) {
          addError("Internal Server Error");
        } else if (response.status === 403) {
          addError("Unauthorized");
        }
        // console.log(response.status);
        return response.json();
      })
      .then((data) => {
       
        if(!data.json){
          addError("No Valid data from the API");
        }
        onSubmitResult(data.json);
        // console.log(data);
      })
      .catch((error) => {
        console.error(error);
        addError(error.message)
      });
  };



  return (
    <div className="container flex justify-center h-full w-full mx-auto mt-12">
      <form className="w-96" onSubmit={(e) => e.preventDefault()}>
        {errors.map((item, idx) => (
          <p key={idx} className="text-red-500 mt-2">{item}</p>
        ))}
        <SearchLabel labelText="Search" />
        <div className="relative">
          <SeacrhIcon />
          <InputSearch
            id="default-search"
            type="search"
            placeholder="Search for a place here"
            onChangeProp={(txt) => setSearch(txt)}
           
          />

          <SearchButton btnTxt="Search" onSubmitProp={handleSearch} />
        </div>
      </form>
      {errors && errors.map((item, idx) => <Toast key={idx} error={item} />)}
    </div>
  );
}

export default SearchBar;
