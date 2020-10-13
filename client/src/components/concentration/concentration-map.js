import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Map, TileLayer, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ENDPOINT = 'http://127.0.0.1:5000';

export function ConcentrationMap(props) {
  const [data, setData] = useState([]);
  const [polyline, setPolyline] = useState([]);

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on('data', (data) => {
      setData((allData) => [...allData, data]);
      let lat = data.latitude;
      let long = data.longitude;
      setPolyline((latLong) => [...latLong, [lat, long]]);
    });
  }, []);

  const center = [51.505, -0.09];

  return (
    <div id='concentration-map-container'>
      <Map center={center} zoom={1} style={{ height: '400px' }}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polyline color='lime' positions={polyline} />
      </Map>
    </div>
  );
}
