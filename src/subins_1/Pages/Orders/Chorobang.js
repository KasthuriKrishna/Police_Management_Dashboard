import React, { useState, useEffect } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import bangalore from './Mapjson.json';

const KarnatakaChoropleth = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/ksp');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const styleFeature = (feature) => {
    const districtData = data.find(item => item.UnitName === feature.properties.area_name);

    const defaultStyle = {
      fillColor: 'gray',
      fillOpacity: 0.7,
      color: 'black',
      weight: 1,
    };

    if (districtData) {
      const value = districtData.Count;
      const colorScale = ['#00FF00','#006600','#FFFF66','#FFFF00','#FFA500','#FF6600','#FF0000','#B30000'];
      const thresholds = [500, 1000,1500, 2000,2500, 3000,3500,4000];
      let colorIndex = 0;
      for (let i = 0; i < thresholds.length; i++) {
        if (value <= thresholds[i]) {
          colorIndex = i;
          break;
        }
      }
      defaultStyle.fillColor = colorScale[colorIndex];
    }

    return defaultStyle;
  };

  return (
    <MapContainer center={[12.9716, 77.5946]} zoom={11} style={{ height: '800px' }}>
      {data.length > 0 && (
        <GeoJSON
          data={bangalore}
          style={(feature) => styleFeature(feature)}
          onEachFeature={(feature, layer) => {
            const districtName = feature.properties.area_name;
            const districtData = data.find((item) => item.UnitName === districtName);

            if (districtData) {
              const popupContent = `
                <div>
                  <strong>District:</strong> ${districtName}<br>
                  <strong>Police Station:</strong> ${districtData.UnitName}<br>
                  <strong>Number of Cases:</strong> ${districtData.Count}
                </div>
              `;
              layer.bindPopup(popupContent);
            } else {
              layer.bindPopup(`<div><strong>District:</strong> ${districtName}</div>`);
            }
          }}
        />
      )}
    </MapContainer>
  );
};

export default KarnatakaChoropleth;
