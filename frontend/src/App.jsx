import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Initialize state as an empty array to hold trip objects
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetching the list of trips from the updated Java endpoint
    fetch("http://localhost:8080/api/trips")
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setTrips(data); // Update the state with the array of trips
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>My Travel Planner</h1>
      
      <div className="trip-list">
        {/* If the array is empty, show a message */}
        {trips.length === 0 && <p>No trips found. Start planning!</p>}
        
        {/* Use .map() to iterate through the array and render each trip */}
        {trips.map((trip) => (
          <div key={trip.id} className="trip-card">
            <h3>{trip.title}</h3>
            <p><strong>Destination:</strong> {trip.destination}</p>
            <p><strong>Start Date:</strong> {trip.startDate}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App