import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { flightOptions } from "../../constants";

export const getFlights = createAsyncThunk("flights/getFlights", async () => {
  const res = await axios.request(flightOptions);

  const formatted = res.data.aircraft.map((i) => ({
    id: i[0],
    code: i[1],
    lat: i[2],
    lng: i[3],
  }));

  return formatted;
});
