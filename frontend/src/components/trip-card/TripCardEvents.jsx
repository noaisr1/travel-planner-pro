import { useState } from 'react';
import styles from '../TripCard.module.css';
import { formatItemTime } from './formatters';

// Displays the sorted list of plan activities and an inline form to add a new one.
export default function TripCardEvents({ planItems, onAddEvent }) {
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    activityName: '',
    itemTime: new Date().toTimeString().slice(0, 5),
    type: 'ACTIVITY',
    itemPrice: 0,
  });

  const sortedItems = [...planItems].sort(
    (a, b) => new Date(a.itemTime) - new Date(b.itemTime),
  );

  function handleSubmit(e) {
    e.preventDefault();
    onAddEvent(newEvent);
    setNewEvent({ activityName: '', itemTime: '', type: 'ACTIVITY', itemPrice: 0 });
    setShowForm(false);
  }

  return (
    <div className={styles.planItemsSection}>
      <div>
        <h4>Daily Flow</h4>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? '-' : '+'}
        </button>
      </div>

      {showForm && (
        <form className={styles.miniEventForm} onSubmit={handleSubmit}>
          <input
            placeholder="Activity (e.g. Flight)"
            value={newEvent.activityName}
            onChange={(e) => setNewEvent({ ...newEvent, activityName: e.target.value })}
            required
          />
          <input
            type="time"
            value={newEvent.itemTime}
            onChange={(e) => setNewEvent({ ...newEvent, itemTime: e.target.value })}
            required
          />
          <button type="submit">Add</button>
        </form>
      )}

      <ul>
        {sortedItems.map((item) => (
          <li key={item.id} className={styles.planItem}>
            <span className={styles.itemTime}>{formatItemTime(item.itemTime)}</span>
            <span>{item.activityName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
