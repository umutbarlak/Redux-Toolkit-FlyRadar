import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const ListView = ({ setDetailId }) => {
  const flightState = useSelector((store) => store.flightReducer);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = flightState.flights.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(flightState.flights.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % flightState.flights.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="p-4">
      <table className="table table-dark table-striped table-hover table-responsive mt-5">
        <thead>
          <tr>
            <th>id</th>
            <th>Kuyruk Kodu</th>
            <th>Enlem</th>
            <th>Boylam</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((i) => (
            <tr key={i.id}>
              <th>{i.id}</th>
              <td>{i.code}</td>
              <td>{i.lat}</td>
              <td>{i.lng}</td>
              <td>
                <button
                  onClick={() => setDetailId(i.id)}
                  className="btn btn-sm btn-info"
                >
                  Detay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        className="pagination"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        pageRangeDisplayed={5}
        previousLabel="< Önceki"
        nextLabel="Sonraki >"
      />
    </div>
  );
};

export default ListView;
