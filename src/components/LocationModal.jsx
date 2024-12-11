import React from 'react';

const LocationModal = ({ onEnable, onSearch }) => (
  <div className="modal">
    <p>Location permissions are turned off. Please enable it.</p>
    <button onClick={onEnable}>Enable Location</button>
    {/* <button onClick={onSearch}>Search Manually</button> */}
  </div>
);

export default LocationModal;

