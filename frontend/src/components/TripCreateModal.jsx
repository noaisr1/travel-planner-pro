import * as Dialog from '@radix-ui/react-dialog';
import styles from './TripCreate.module.css';

function TripCreateModal({ open, onOpenChange, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.tripModalOverlay} />
        <Dialog.Content className={styles.tripModalContent} aria-describedby={undefined}>
          <div className={styles.tripModalHeader}>
            <Dialog.Title className={styles.tripModalTitle}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button type="button" className={styles.tripModalCloseBtn} aria-label="Close">
                ×
              </button>
            </Dialog.Close>
          </div>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default TripCreateModal;

