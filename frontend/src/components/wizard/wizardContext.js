import { createContext } from 'react';

// Not a hook: this is the shared "mailbox" for wizard state. WizardProvider puts
// values in; useWizard reads them. Used only in WizardProvider.jsx and useWizard.js.
export const WizardContext = createContext(null);
