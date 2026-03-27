import { useMemo } from 'react';
import Header from './components/Header';
import TripCard from './components/TripCard';
import TripCreateFab from './components/TripCreateFab';
import { useTrips } from './hooks/useTrips';
import './App.css';

function App() {
  const { tripsQuery, createTripMutation, updateTripMutation, deleteTripMutation, addEventMutation } = useTrips();

  const sortedTrips = useMemo(() => {
    const trips = tripsQuery.data || [];
    return [...trips].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }, [tripsQuery.data]);

  const handleAddTrip = (newTrip) => {
    createTripMutation.mutate(newTrip);
  };

  const handleDeleteTrip = (id) => {
    deleteTripMutation.mutate(id);
  };

  const handleUpdateTrip = (id, updatedData) => {
    const payload = {
      title: updatedData.title,
      destination: updatedData.destination,
      startDate: updatedData.startDate,
      endDate: updatedData.endDate,
      price: updatedData.price,
    };
    updateTripMutation.mutate({ id, payload });
  };

  const handleAddEvent = (tripId, newEvent) => {
    const payload = {
      activityName: newEvent.activityName,
      itemTime: newEvent.itemTime,
      type: newEvent.type || 'ACTIVITY',
      itemPrice: typeof newEvent.itemPrice === 'number' ? newEvent.itemPrice : 0,
    };
    addEventMutation.mutate({ tripId, payload });
  };

  const totalBudget = sortedTrips.reduce((sum, trip) => sum + (trip.price || 0), 0);

  return (
    <div className="App">
      <Header totalBudget={totalBudget} />
      <TripCreateFab onAddTrip={handleAddTrip} />

      <div className="timeline-container">
        {sortedTrips.map((trip, index) => (
          <div key={trip.id} className="timeline-item">
            <TripCard trip={trip} onDelete={handleDeleteTrip} onUpdate={handleUpdateTrip} onAddEvent={handleAddEvent} />
            {index < sortedTrips.length - 1 && <div className="flow-arrow">➔</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;