import React from 'react';
import { MapContainer, GeoJSON, Marker, Popup } from 'react-leaflet'; // Import Marker and Popup components
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet library
import karnatakaBoundary from './Bang.json'; // Import Karnataka boundary GeoJSON

// Define marker positions (example coordinates)
const markerPositions = [
  { lat:  12.9592, lng:77.6245, name: 'Koramangala' },
  { lat: 12.9784, lng:  77.6408, name: 'Indiranagar' },
  { lat:  12.9293, lng: 77.5825, name: 'Jayanagar' },
  { lat:  12.8455, lng: 77.6602, name: 'Electronic City' },
  { lat:  13.0068, lng: 77.5692, name: 'Malleswaram' },
  { lat:  13.0024, lng: 77.6523, name: 'Anugondanahalli' },
  { lat:  12.9698, lng: 77.6896, name: 'Attible' },
  { lat:  12.8745, lng:77.6724, name: 'Abalahally' },
  { lat:  12.8188, lng: 77.6873, name: 'Hebbagodi' },
];

const karnataka = () => {
  // Define custom icon for markers
  const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/11206/11206712.png', // URL to your custom marker icon
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <MapContainer center={[12.9716, 77.5946]} zoom={11} style={{ height: '420px'}}>
      <GeoJSON data={karnatakaBoundary} />
      
      {/* Add markers */}
      {markerPositions.map((position, index) => (
        <Marker key={index} position={[position.lat, position.lng]} icon={customIcon}>
          <Popup>{position.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default karnataka;