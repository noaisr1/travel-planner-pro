import { useState } from 'react';
import styles from '../TripCard.module.css';

// Inline editing form for a trip's title, destination, price, and dates.
export default function TripCardEdit({ trip, onSave, onCancel }) {
  const [tempData, setTempData] = useState({ ...trip });

  function handleChange(e) {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: name === 'price' ? parseFloat(value) : value });
  }

  return (
    <div className={`${styles.tripNode} ${styles.editing}`}>
      <input className={styles.tripNodeEditingInput} name="title" value={tempData.title} onChange={handleChange} />
      <input className={styles.tripNodeEditingInput} name="destination" value={tempData.destination} onChange={handleChange} />
      <input className={styles.tripNodeEditingInput} name="price" type="number" value={tempData.price} onChange={handleChange} />
      <input className={styles.tripNodeEditingInput} name="startDate" type="date" value={tempData.startDate} onChange={handleChange} />
      <input className={styles.tripNodeEditingInput} name="endDate" type="date" value={tempData.endDate} onChange={handleChange} />
      <div className={styles.editActions}>
        <button onClick={() => onSave(tempData)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
