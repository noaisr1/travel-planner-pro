import { useState } from 'react';
import TripCardEdit from './trip-card/TripCardEdit';
import TripCardView from './trip-card/TripCardView';

// Switches between read-only view and inline editing for a single trip.
export default function TripCard({ trip, onDelete, onUpdate, onAddEvent }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <TripCardEdit
        trip={trip}
        onSave={(updatedData) => {
          onUpdate(trip.id, updatedData);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <TripCardView
      trip={trip}
      onEdit={() => setIsEditing(true)}
      onDelete={onDelete}
      onAddEvent={onAddEvent}
    />
  );
}
