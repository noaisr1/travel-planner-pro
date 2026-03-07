import { useState, useEffect } from 'react';
import Header from './components/Header';
import TripForm from './components/TripForm';
import TripCard from './components/TripCard';
import './App.css';

function App() {
  const [trips, setTrips] = useState([]);

  useEffect(() => { fetchTrips(); }, []);

  const fetchTrips = () => {
    fetch("http://localhost:8080/api/trips")
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        setTrips(sorted);
      });
  };

  const handleAddTrip = (newTrip) => {
    fetch("http://localhost:8080/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTrip)
    }).then(() => fetchTrips());
  };

  /* Adding delete logic to the main orchestrator */
  const handleDeleteTrip = (id) => {
    fetch(`http://localhost:8080/api/trips/${id}`, {
      method: "DELETE",
    }).then(() => {
      // Optimization: Filter out the deleted trip from state without re-fetching everything
      setTrips(trips.filter(trip => trip.id !== id));
    }).catch(err => console.error("Error deleting trip:", err));
  };

  /* Adding the update logic to communicate with Java */
  const handleUpdateTrip = (id, updatedData) => {
    fetch(`http://localhost:8080/api/trips/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    })
      .then(res => res.json())
      .then(updatedTrip => {
        // Update the local state by replacing the old trip object with the new one
        setTrips(trips.map(t => t.id === id ? updatedTrip : t));
      })
      .catch(err => console.error("Error updating trip:", err));
  };

  const totalBudget = trips.reduce((sum, trip) => sum + trip.price, 0);

  return (
    <div className="App">
      <Header totalBudget={totalBudget} />
      <TripForm onAddTrip={handleAddTrip} />

      <div className="timeline-container">
        {trips.map((trip, index) => (
          <div key={trip.id} className="timeline-item">
            <TripCard trip={trip} onDelete={handleDeleteTrip} onUpdate={handleUpdateTrip} />
            {index < trips.length - 1 && <div className="flow-arrow">➔</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;