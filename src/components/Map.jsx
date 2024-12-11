import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js'; // Import geocoder control

const Map = () => {
  const [position, setPosition] = useState([51.505, -0.09]); // Default position (London)
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]); // Default marker position
  const [address, setAddress] = useState(""); // To store manually entered address

  // Get user's current position on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPosition = [position.coords.latitude, position.coords.longitude];
        setPosition(userPosition);
        setMarkerPosition(userPosition);
      },
      (error) => console.error('Geolocation error:', error)
    );
  }, []);

  // Hook to update map's center position
  const UpdateMapCenter = ({ newPosition }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(newPosition, map.getZoom()); // Change map center to new position
    }, [newPosition, map]);

    return null;
  };

  // Function to handle "Locate Me" button click
  const handleLocateMe = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPosition = [position.coords.latitude, position.coords.longitude];
        setPosition(userPosition);
        setMarkerPosition(userPosition);
      },
      (error) => console.error('Geolocation error:', error)
    );
  };

  // Function to handle manual address entry using leaflet geocoder
  const handleAddressSearch = () => {
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.geocode(address, (results) => {
      if (results.length > 0) {
        const { lat, lng } = results[0].center;
        setPosition([lat, lng]);
        setMarkerPosition([lat, lng]);
      } else {
        alert('Address not found!');
      }
    });
  };

  return (
    <div>
      {/* Locate Me Button */}
      <button onClick={handleLocateMe} style={{ margin: '10px', padding: '10px' }}>
        Locate Me
      </button>

      {/* Address Search Input */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Enter address manually"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ padding: '10px', width: '300px' }}
        />
        <button onClick={handleAddressSearch} style={{ padding: '10px' }}>
          Search Address
        </button>
      </div>

      {/* Map Rendering */}
      <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <UpdateMapCenter newPosition={position} />
        <Marker position={markerPosition} draggable={true} eventHandlers={{
          dragend: (e) => {
            const { lat, lng } = e.target.getLatLng();
            setMarkerPosition([lat, lng]);
          }
        }}>
          <Popup>Selected Location</Popup>
        </Marker>
      </MapContainer>

      {/* Display Selected Location */}
      <div>
        <h3>Selected Location:</h3>
        <p>Latitude: {markerPosition[0]}</p>
        <p>Longitude: {markerPosition[1]}</p>
      </div>
    </div>
  );
};

export default Map;
