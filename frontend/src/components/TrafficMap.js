import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const TrafficMap = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch('https://api.tomtom.com/traffic/services/5/incidentDetails?bbox=74.0,31.4,74.5,31.6&key=YOUR_API_KEY')
      .then(response => response.json())
      .then(data => {
        if (data && data.incidents) {
          setIncidents(data.incidents);
        }
      })
      .catch(error => console.error('Error fetching traffic data:', error));
  }, []);

  return (
    <MapContainer center={[31.5, 74.25]} zoom={13} style={{ height: '80vh', width: '100%' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; OpenStreetMap contributors'
      />
      {incidents.map((incident, index) => (
        <Marker
          key={index}
          position={[incident.geometry.coordinates[1], incident.geometry.coordinates[0]]}
        >
          <Popup>
            <strong>{incident.properties.eventCode}</strong><br />
            <em>Type:</em> {incident.properties.eventType}<br />
            <em>Severity:</em> {incident.properties.severity}<br />
            <p>{incident.properties.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TrafficMap;