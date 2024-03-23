import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";

const MapView = ({ setDetailId }) => {
  const flightState = useSelector((store) => store.flightReducer);

  const planeIcon = L.icon({
    iconUrl: "plane-icon.png",
    iconSize: [30, 30],
  });

  const position = [38.949101, 35.41935];

  return (
    <MapContainer center={position} zoom={6} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {flightState.flights?.map((i) => (
        <Marker key={i.id} icon={planeIcon} position={[i.lat, i.lng]}>
          <Popup>
            <div className="d-flex flex-column">
              <span>Kod: {i.code}</span>
              <button
                onClick={() => {
                  setDetailId(i.id);
                }}
                className="btn btn-sm btn-info mt-1 w-100"
              >
                Detay
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      <Polyline positions={flightState?.path} />
    </MapContainer>
  );
};

export default MapView;
