import { useState } from 'react';

function TripForm({ onAddTrip }) {
  const [formData, setFormData] = useState({
    title: '', destination: '', startDate: '', endDate: '', price: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      alert("End date cannot be before start date!");
      return;
    }
    onAddTrip(formData);
    setFormData({ title: '', destination: '', startDate: '', endDate: '', price: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="trip-form">
      <input name="title" placeholder="Event" value={formData.title} 
             onChange={e => setFormData({...formData, title: e.target.value})} required />
      <input name="destination" placeholder="Location" value={formData.destination} 
             onChange={e => setFormData({...formData, destination: e.target.value})} required />
      <input name="price" type="number" placeholder="Price ($)" value={formData.price} 
             onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} required />
      <div className="date-inputs">
        <input name="startDate" type="date" value={formData.startDate} 
               onChange={e => setFormData({...formData, startDate: e.target.value})} required />
        <input name="endDate" type="date" min={formData.startDate} value={formData.endDate} 
               onChange={e => setFormData({...formData, endDate: e.target.value})} required />
      </div>
      <button type="submit">Add to Flow</button>
    </form>
  );
}

export default TripForm;