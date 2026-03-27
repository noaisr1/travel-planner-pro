import { useState } from 'react';

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
      <div className="trip-node editing">
        <input name="title" value={tempData.title} onChange={handleChange} />
        <input name="destination" value={tempData.destination} onChange={handleChange} />
        <input name="price" type="number" value={tempData.price} onChange={handleChange} />
        <input name="startDate" type="date" value={tempData.startDate} onChange={handleChange} />
        <input name="endDate" type="date" value={tempData.endDate} onChange={handleChange} />
        <div className="edit-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="trip-node">
      <div className="card-actions">
        <button className="edit-icon-btn" onClick={() => setIsEditing(true)}>✎</button>
        <button className="delete-btn" onClick={() => onDelete(trip.id)}>×</button>
      </div>

      {/* Usage of calculateDuration */}
      <div className="duration-badge">{calculateDuration(trip.startDate, trip.endDate)} Days</div>
      
      <h3>{trip.title}</h3>
      <p>📍 {trip.destination}</p>
      
      <div className="plan-items-section">
        <div className="plan-items-header">
          <h4>Daily Flow</h4>
          <button className="mini-add-btn" onClick={() => setShowAddEvent(!showAddEvent)}>
            {showAddEvent ? '-' : '+'}
          </button>
        </div>

        {showAddEvent && (
          <form className="mini-event-form" onSubmit={handleEventSubmit}>
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

        <ul className="plan-items-list">
          {trip.planItems && trip.planItems.map(item => (
            <li key={item.id} className="plan-item">
              <span className="item-time">{item.itemTime}</span>
              <span className="item-name">{item.activityName}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="price-tag">${trip.price}</div>
      <div className="date-range">
        <span>{formatDate(trip.startDate)}</span>
        <span>→</span>
        <span>{formatDate(trip.endDate)}</span>
      </div>
    </div>
  );
}

export default TripCard;