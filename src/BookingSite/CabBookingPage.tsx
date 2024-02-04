import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

// Import your CSS file for styling

const CabBookingPage = () => {
  const [destination, setDestination] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleDestinationChange = (address: React.SetStateAction<string>) => {
    setDestination(address);
  };

  const handleDestinationSelect = async (address: string) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    console.log('Selected Destination:', latLng);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission and validation here
    console.log('Form Data:', { destination, currentLocation, date, time });
  };

  return (
    <div className="cab-booking-page">
      <h1>Cab Booking</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="destination">Destination</label>
        <PlacesAutocomplete
          value={destination}
          onChange={handleDestinationChange}
          onSelect={handleDestinationSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Enter destination...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => (
                  <div
                    {...getSuggestionItemProps(suggestion)}
                    key={suggestion.placeId}
                  >
                    {suggestion.description}
                  </div>
                ))}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <label htmlFor="currentLocation">Current Location</label>
        <input
          type="text"
          id="currentLocation"
          value={currentLocation}
          onChange={(e) => setCurrentLocation(e.target.value)}
          placeholder="Enter current location..."
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="time">Time</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button type="submit">Book Cab</button>
      </form>
    </div>
  );
};

export default CabBookingPage;
