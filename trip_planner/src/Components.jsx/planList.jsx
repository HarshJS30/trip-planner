import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { FaPlaneDeparture, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";  // Example icons

function CurrentTrip() {
  const { tripId } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [activities, setActivities] = useState([]);
  const [daysWithActivities, setDaysWithActivities] = useState([]);

  useEffect(() => {
    const getTrip = async () => {
      try {
        const res = await axios.get(`https://trip-planner-1-6wx3.onrender.com/plans/${tripId}`);
        console.log(res.data); // Debugging API response

        const start = new Date(res.data.startDate);
        const end = new Date(res.data.endDate);
        const daysCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

        setLocation(res.data.location);
        setStartDate(start.toLocaleDateString());
        setEndDate(end.toLocaleDateString());
        setBudget(res.data.budget);
        setActivities(res.data.activities);

        const distributedActivities = Array.from({ length: daysCount }, () => []);
        res.data.activities.forEach((activity, index) => {
          const dayIndex = index % daysCount;
          distributedActivities[dayIndex].push(activity);
        });

        setDaysWithActivities(distributedActivities);
      } catch (err) {
        console.error("Error fetching trip:", err);
      }
    };

    if (tripId) {
      getTrip();
    }
  }, [tripId]);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-primary mb-4">Your Itinerary</h2>

          {/* Trip Details */}
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-secondary">{location}</h5>
              <p className="card-text">
                <FaPlaneDeparture /> <strong>Start Date:</strong> {startDate}
              </p>
              <p className="card-text">
                <FaPlaneDeparture /> <strong>End Date:</strong> {endDate}
              </p>
              <p className="card-text">
                <FaMoneyBillWave /> <strong>Budget:</strong> ${budget}
              </p>
            </div>
          </div>

          <h3 className="text-center text-success mt-4">Activities by Day</h3>
          {daysWithActivities.length > 0 ? (
            daysWithActivities.map((activities, index) => (
              <div key={index} className="card mb-3 shadow-sm">
                <div className="card-header bg-info text-white">
                  <h5 className="m-0">Day {index + 1}</h5>
                </div>
                <div className="card-body">
                  {activities.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {activities.map((activity, i) => (
                        <li key={i} className="list-group-item">
                          {activity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No activity planned for this day.</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">Loading activities...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrentTrip;
