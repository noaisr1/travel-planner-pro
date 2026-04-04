import styles from '../TripCard.module.css';
import TripCardEvents from './TripCardEvents';
import { calculateDuration, formatDate } from './formatters';

// Read-only display of a trip: title, destination, dates, price, and activities list.
export default function TripCardView({ trip, onEdit, onDelete, onAddEvent }) {
  return (
    <div className={styles.tripNode}>
      <div className={styles.cardActions}>
        <button onClick={onEdit}>✎</button>
        <button onClick={() => onDelete(trip.id)}>×</button>
      </div>

      <div className={styles.durationBadge}>
        {calculateDuration(trip.startDate, trip.endDate)} Days
      </div>

      <h3>{trip.title}</h3>
      <p>📍 {trip.destination}</p>

      <TripCardEvents
        planItems={trip.planItems}
        onAddEvent={(event) => onAddEvent(trip.id, event)}
      />

      <div className={styles.priceTag}>${trip.price}</div>
      <div className={styles.dateRange}>
        <span>{formatDate(trip.startDate)}</span>
        <span>→</span>
        <span>{formatDate(trip.endDate)}</span>
      </div>
    </div>
  );
}
