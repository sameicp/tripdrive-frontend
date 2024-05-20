import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import Routing from "./Routing";
import { useState, useEffect } from "react";

export default function Map({request}) {
  const [position, setPosition] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) =>
      setPosition([pos.coords.latitude, pos.coords.longitude])
    );
  }, []);

  return (
    <div className="w-full min-h-72">
      {position && (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          className="min-h-72"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Routing request={request}/>;
        </MapContainer>
      )}
    </div>
  );
}
