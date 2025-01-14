import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TripList() {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
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
      } finally {
        setIsLoading(false); // Stop loading once data is fetched
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
      {isLoading ? (
        // Render skeletons while loading
        <ul className="list-group">
          {[1, 2, 3, 4].map((_, index) => (
            <li key={index} className="list-group-item mb-3 p-4">
              <Skeleton height={30} width={200} />
              <Skeleton height={20} width={300} style={{ marginTop: '10px' }} />
              <Skeleton height={20} width={250} style={{ marginTop: '10px' }} />
              <Skeleton height={20} width={300} style={{ marginTop: '10px' }} />
              <Skeleton height={40} width={120} style={{ marginTop: '20px' }} />
            </li>
          ))}
        </ul>
      ) : trips.length === 0 ? (
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
