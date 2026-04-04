import { useContext } from 'react';
import { WizardContext } from './wizardContext';

// Custom hook: reads wizard state from context. Must run under <WizardProvider>.
// Used in WizardForm.jsx and DestinationStep, BudgetStep, ReviewStep.
export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used within a WizardProvider');
  return ctx;
}
