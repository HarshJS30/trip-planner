import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

function TripForm() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [activities, setActivities] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !location || !budget || !activities) {
      alert('Please fill out all fields');
      return;
    }

    const activitiesArray = activities.split(",").map((item) => item.trim());

    const formData = {
      startDate,
      endDate,
      location,
      budget,
      activities: activitiesArray,
    };

    try {
      const response = await axios.post('http://localhost:5000/plans', formData);
      console.log(response.data); 
      alert('Form saved');
      navigate(`/trip/${response.data._id}`); 
    } catch (err) {
      alert('Error, not saved!');
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Create a New Trip</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Destination</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g New Delhi"
            />
          </div>

          <div className="mb-3 row">
            <div className="col-md-6">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Budget</label>
            <input
              type="number"
              className="form-control"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g $200"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Activities (Comma Seperated)</label>
            <input
              type="text"
              className="form-control form-control-lg"
              style={{ width: "100%" }}
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              placeholder="e.g Sunder Nursery, India Gate, Connaught Place"
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary me-2">Generate Itinerary</button>
            <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/trips')}>View All Trips</button>
            <button type="button" className="btn btn-success" onClick={() => navigate('/packinglist')}>Packing Checklist</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TripForm;
