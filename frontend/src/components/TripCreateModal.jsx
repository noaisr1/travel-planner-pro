import * as Dialog from '@radix-ui/react-dialog';
import './TripCreate.css';

function TripCreateModal({ open, onOpenChange, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="tripModalOverlay" />
        <Dialog.Content className="tripModalContent" aria-describedby={undefined}>
          <div className="tripModalHeader">
            <Dialog.Title className="tripModalTitle">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button type="button" className="tripModalCloseBtn" aria-label="Close">
                ×
              </button>
            </Dialog.Close>
          </div>
          <div className="tripModalBody">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default TripCreateModal;

