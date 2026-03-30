import { useState } from 'react';
import styles from './TripCard.module.css';

function TripCard({ trip, onDelete, onUpdate, onAddEvent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [tempData, setTempData] = useState({ ...trip });
  
  // Local state for the new plan item form
  const [newEvent, setNewEvent] = useState({
    activityName: '',
    itemTime: '',
    type: 'ACTIVITY',
    itemPrice: 0,
  });

  /* Helper function to calculate days between two dates.
     It must be defined inside the component or outside the function.
  */
  const calculateDuration = (start, end) => {
    if (!start || !end) return 0;
    const diffTime = Math.abs(new Date(end) - new Date(start));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: name === 'price' ? parseFloat(value) : value });
  };

  const handleSave = () => {
    onUpdate(trip.id, tempData);
    setIsEditing(false);
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    onAddEvent(trip.id, newEvent);
    setNewEvent({ activityName: '', itemTime: '', type: 'ACTIVITY', itemPrice: 0 });
    setShowAddEvent(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isEditing) {
    return (
      <div className={`${styles.tripNode} ${styles.editing}`}>
        <input className={styles.tripNodeEditingInput} name="title" value={tempData.title} onChange={handleChange} />
        <input
          className={styles.tripNodeEditingInput}
          name="destination"
          value={tempData.destination}
          onChange={handleChange}
        />
        <input className={styles.tripNodeEditingInput} name="price" type="number" value={tempData.price} onChange={handleChange} />
        <input
          className={styles.tripNodeEditingInput}
          name="startDate"
          type="date"
          value={tempData.startDate}
          onChange={handleChange}
        />
        <input className={styles.tripNodeEditingInput} name="endDate" type="date" value={tempData.endDate} onChange={handleChange} />
        <div className={styles.editActions}>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tripNode}>
      <div className={styles.cardActions}>
        <button onClick={() => setIsEditing(true)}>✎</button>
        <button onClick={() => onDelete(trip.id)}>×</button>
      </div>

      {/* Usage of calculateDuration */}
      <div className={styles.durationBadge}>{calculateDuration(trip.startDate, trip.endDate)} Days</div>
      
      <h3>{trip.title}</h3>
      <p>📍 {trip.destination}</p>
      
      <div className={styles.planItemsSection}>
        <div>
          <h4>Daily Flow</h4>
          <button onClick={() => setShowAddEvent(!showAddEvent)}>
            {showAddEvent ? '-' : '+'}
          </button>
        </div>

        {showAddEvent && (
          <form className={styles.miniEventForm} onSubmit={handleEventSubmit}>
            <input 
              placeholder="Activity (e.g. Flight)" 
              value={newEvent.activityName}
              onChange={e => setNewEvent({...newEvent, activityName: e.target.value})}
              required 
            />
            <input 
              type="time" 
              value={newEvent.itemTime}
              onChange={e => setNewEvent({...newEvent, itemTime: e.target.value})}
              required 
            />
            <button type="submit">Add</button>
          </form>
        )}

        <ul>
          {trip.planItems && trip.planItems.map(item => (
            <li key={item.id} className={styles.planItem}>
              <span className={styles.itemTime}>{item.itemTime}</span>
              <span>{item.activityName}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.priceTag}>${trip.price}</div>
      <div className={styles.dateRange}>
        <span>{formatDate(trip.startDate)}</span>
        <span>→</span>
        <span>{formatDate(trip.endDate)}</span>
      </div>
    </div>
  );
}

export default TripCard;