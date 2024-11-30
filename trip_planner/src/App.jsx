import React from "react";
import TripForm from "./Components.jsx/Planform";
import TripList from "./Components.jsx/savedPlans";
import CurrentTrip from "./Components.jsx/planList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PackingList from "./Components.jsx/PackingList";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TripForm />} />
        <Route path="/trips" element={<TripList />} />
        <Route path="/trip/:tripId" element={<CurrentTrip />} />
        <Route path="/packinglist" element={<PackingList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
