export const flightOptions = {
  method: "GET",
  url: "https://flight-radar1.p.rapidapi.com/flights/list-in-boundary",
  params: {
    bl_lat: "35.052673 ",
    bl_lng: "26.054121",
    tr_lat: "42.105829 ",
    tr_lng: "44.476062",
    limit: "300",
  },
  headers: {
    "X-RapidAPI-Key": "6ea5fbf78bmsh21609d7b9090444p18b688jsn3148f5a181dc",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};

export const headerOpt = {
  headers: {
    "X-RapidAPI-Key": "6ea5fbf78bmsh21609d7b9090444p18b688jsn3148f5a181dc",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};
