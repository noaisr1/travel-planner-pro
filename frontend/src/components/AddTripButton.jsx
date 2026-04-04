import { useState } from 'react';
import TripCreateModal from './TripCreateModal';
import TripWizard from './TripWizard';
import styles from './TripCreate.module.css';

// The "+" button that opens a modal with the create-trip wizard.
export default function AddTripButton({ onAddTrip }) {
  const [open, setOpen] = useState(false);

  function handleSubmit(payload) {
    onAddTrip(payload);
    setOpen(false);
  }

  return (
    <>
      <button type="button" className={styles.tripFab} onClick={() => setOpen(true)} aria-label="Add trip">
        +
      </button>

      <TripCreateModal open={open} onOpenChange={setOpen} title="Add a trip">
        <TripWizard onSubmit={handleSubmit} onCancel={() => setOpen(false)} />
      </TripCreateModal>
    </>
  );
}
