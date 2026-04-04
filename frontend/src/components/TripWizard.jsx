import { WizardProvider } from './wizard/WizardProvider';
import WizardForm from './wizard/WizardForm';

// WizardProvider holds all wizard state in memory. Any component below it in the tree
// can read that state with useWizard() without passing props through each layer.
export default function TripWizard({ onSubmit, onCancel }) {
  return (
    <WizardProvider>
      <WizardForm onSubmit={onSubmit} onCancel={onCancel} />
    </WizardProvider>
  );
}
