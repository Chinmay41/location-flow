import React, { useState } from 'react';
import LocationModal from './components/LocationModal';
import Map from './components/Map';
import AddressForm from './components/AddressForm';
import './App.css'
const App = () => {
  const [showModal, setShowModal] = useState(true);

  const [isManualAddress, setIsManualAddress] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null); 

  const handleManualAddress = () => {
    setIsManualAddress(true);
  };

  const handleSaveAddress = (address) => {
    setSavedAddress(address); 
  };

  const handleEnableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      () => setShowModal(false),
      () => alert('Please enable location permissions.')
    );
  };

  return (
    <div>
      {showModal && (
        <LocationModal
          onEnable={handleEnableLocation}
        />
      )}
      <button onClick={handleManualAddress}>Enter Address Manually</button>
       <Map />
       {isManualAddress && <AddressForm onSave={handleSaveAddress} />}
      {savedAddress && (
        <div>
          <h3>Saved Address:</h3>
          <p>{savedAddress.flat}, {savedAddress.area} ({savedAddress.category})</p>
        </div>
      )}
    </div>
  );
};

export default App;
