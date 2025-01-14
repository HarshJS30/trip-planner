import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TripList() {
  const [trips, setTrips] = useState([]);
  const [doneState, setDoneState] = useState({});

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('https://trip-planner-1-6wx3.onrender.com/plans');
        setTrips(response.data);
        
        const initialState = response.data.reduce((acc, trip) => {
          acc[trip._id] = false;
          return acc;
        }, {});
        setDoneState(initialState);
        
      } catch (err) {
        console.error('Error fetching trips:', err);
      }
    };
    fetchTrips();
  }, []);

  const toggleDone = (tripId) => {
    setDoneState(prevState => ({
      ...prevState,
      [tripId]: !prevState[tripId],  
    }));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{ fontSize: '1.5rem' }}>All Trips</h2>
      {trips.length === 0 ? (
        <p style={{ fontSize: '1rem' }}>No trips found. Please add a trip!</p>
      ) : (
        <ul className="list-group">
          {trips.map((trip) => (
            <li key={trip._id} className="list-group-item mb-3 p-4" style={{ backgroundColor: doneState[trip._id] ? '#e0f7e0' : '#fff', border: doneState[trip._id] ? '2px solid green' : '1px solid #ddd' }}>
              <h3 style={{ color: doneState[trip._id] ? 'green' : 'black', fontSize: '1.25rem' }}>Location: {trip.location}</h3>
              <h4 style={{ color: doneState[trip._id] ? 'green' : 'black', fontSize: '1.125rem' }}>Start Date: {new Date(trip.startDate).toLocaleDateString()}</h4>
              <h4 style={{ color: doneState[trip._id] ? 'green' : 'black', fontSize: '1.125rem' }}>End Date: {new Date(trip.endDate).toLocaleDateString()}</h4>
              <h4 style={{ color: doneState[trip._id] ? 'green' : 'black', fontSize: '1.125rem' }}>Budget: ${trip.budget}</h4>
              <h4 style={{ color: doneState[trip._id] ? 'green' : 'black', fontSize: '1.125rem' }}>Activities: {trip.activities.join(', ')}</h4>
              
              <Link to={`/trip/${trip._id}`} className="btn btn-primary" style={{ fontWeight: 'bold' }}>
                View Trip
              </Link>

              <button 
                onClick={() => toggleDone(trip._id)} 
                className={`btn ${doneState[trip._id] ? 'btn-secondary' : 'btn-success'}`}
                style={{ fontWeight: 'bold', marginLeft: '10px' }}
              >
                {doneState[trip._id] ? 'Mark as Undone' : 'Mark as Done'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TripList;
