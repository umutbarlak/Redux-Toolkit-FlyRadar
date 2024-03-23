import axios from "axios";
import { useEffect, useState } from "react";
import { headerOpt } from "../constants";
import SimpleSlider from "./Slider";
import "moment/locale/tr";
import { formatDate } from "../utils/formatDate";
import { clearPath, setPath } from "../redux/slices/flightSlice";
import { useDispatch } from "react-redux";

const Modal = ({ close, detailId }) => {
  const [d, setDetail] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setDetail("");
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        headerOpt
      )
      .then((res) => {
        dispatch(setPath(res.data.trail));
        setDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, [detailId]);

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close-area">
          <button
            onClick={() => {
              close();
              dispatch(clearPath());
            }}
          >
            X
          </button>
        </p>
        {!d ? (
          <div className="loader">
            <span></span>
            <p>Veriler Alınıyor</p>
          </div>
        ) : !d.aircraft?.model || !d.airport.origin ? (
          <div className=" text-center fw-bold fs-5">
            Bu uçuşun verileri gizlidir
          </div>
        ) : (
          <>
            <h2>{d.aircraft.model.text}</h2>
            <h2>{d.aircraft.model.code}</h2>

            <p>
              <span>Kuyruk Kodu</span>
              <span>{d.aircraft.registration}</span>
            </p>

            <div className="img-wrapper w-100 p-3">
              {d.aircraft.images.large && (
                <SimpleSlider data={d.aircraft.images.large} />
              )}
            </div>

            <p>
              <span>Şirket:</span>
              <span>{d.airline.short}</span>
            </p>

            <p>
              <span>Kalkış:</span>
              <a
                target="_blank"
                href={d.airport.origin?.website ? d.airport.origin.website : ""}
              >
                {d.airport.origin?.name}
                {""}({d.airport.origin?.position.country.name})
              </a>
            </p>

            <p>
              <span>Varış:</span>
              <a
                target="_blank"
                href={
                  d.airport.destination?.website
                    ? d.airport.destination?.website
                    : ""
                }
              >
                {d.airport.destination?.name && d.airport.destination.name}
                {""}(
                {d.airport.destination?.position.country.name &&
                  d.airport.destination.position.country.name}
                )
              </a>
            </p>

            <p>
              <span>Kalkış Zamanı:</span>
              <span>{formatDate(d.time.scheduled.departure)}</span>
            </p>
            <p>
              <span>İniş Zamanı:</span>
              <span>{formatDate(d.time.scheduled.arrival)}</span>
            </p>

            <p className={d.status.icon}>
              <span>{d.status.text}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
