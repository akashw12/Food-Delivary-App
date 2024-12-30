import React, { useState } from 'react';
import burger from './images/burger.png';
import momos from './images/momos.png';
import pizza from './images/pizza.png';

export default function Carousel() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State to store fetched results

  const handleSearch = async () => {
    if (searchInput.trim()) {
      try {
        const response = await fetch(`/api/food-items?category=${searchInput}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data); // Update state with fetched data
        } else {
          alert('No items found for the given category!');
        }
      } catch (err) {
        console.error('Error fetching food items:', err);
        alert('Error fetching food items!');
      }
    } else {
      alert('Please enter a search term!');
    }
  };

  const imageStyle = {
    filter: 'brightness(50%)',
    height: '300px',
    objectFit: 'cover',
  };

  const searchBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    width: '80%',
  };

  const inputGroupStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  };

  const inputStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
  };

  const buttonStyle = {
    marginLeft: '10px',
    bgcolor: 'white',
    filter: 'brightness(100%)',
  };

  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={burger} className="d-block w-100" alt="Burger" style={imageStyle} />
          </div>
          <div className="carousel-item">
            <img src={pizza} className="d-block w-100" alt="Pizza" style={imageStyle} />
          </div>
          <div className="carousel-item">
            <img src={momos} className="d-block w-100" alt="Momos" style={imageStyle} />
          </div>
        </div>

        {/* Search box */}
        <div className="carousel-caption d-none d-md-block text-white" style={searchBoxStyle}>
          <div className="input-group text-white" style={inputGroupStyle}>
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              style={inputStyle}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-primary text-white bg-success"
              style={buttonStyle}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Display search results */}
      <div className="container mt-4">
        <h3>Search Results for: {searchInput}</h3>
        <div className="row">
          {searchResults.map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Category: {item.category}</p>
                  <p className="card-text">Price: ₹{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
