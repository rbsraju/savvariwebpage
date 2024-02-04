// src/components/LocationSearch.tsx
import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

interface LocationSearchProps {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ address, setAddress }) => {
  const handleChange = (newAddress: string) => {
    setAddress(newAddress);
  };

  const handleSelect = async (selectedAddress: string) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      console.log('Selected Location:', latLng);
      setAddress(selectedAddress);
    } catch (error) {
      console.error('Error selecting location:', error);
    }
  };

  return (
    <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input {...getInputProps({ placeholder: 'Enter your destination' })} />
          <div>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => (
              <div  {...getSuggestionItemProps(suggestion)}>
                {suggestion.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearch;
