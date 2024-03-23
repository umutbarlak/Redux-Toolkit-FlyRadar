import { useEffect, useState } from "react";
import Header from "./components/Header";
import MapView from "./pages/MapView";
import ListView from "./pages/ListView";
import { useDispatch } from "react-redux";
import { getFlights } from "./redux/actions/flightActions";
import Modal from "./components/Modal";

const App = () => {
  const [isMapView, setMapView] = useState(true);
  const [detailId, setDetailId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlights());

    // setInterval(() => {
    //   dispatch(getFlights());
    // }, 20000);
  }, []);

  return (
    <div>
      <Header />
      <div className="view-buttons">
        <button
          onClick={() => setMapView(true)}
          className={isMapView ? "active" : ""}
        >
          Harita Görünümü
        </button>
        <button
          onClick={() => setMapView(false)}
          className={!isMapView ? "active" : ""}
        >
          Liste Görünümü
        </button>
      </div>

      {isMapView ? (
        <MapView setDetailId={setDetailId} />
      ) : (
        <ListView setDetailId={setDetailId} />
      )}

      {detailId && (
        <Modal close={() => setDetailId(null)} detailId={detailId} />
      )}
    </div>
  );
};

export default App;
