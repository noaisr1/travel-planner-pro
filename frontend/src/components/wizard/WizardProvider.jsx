import { useMemo, useState } from 'react';
import { isNonEmptyString, isValidDateRange, toNumberOrNull } from '../../utils/validation';
import { WizardContext } from './wizardContext';

/**
 * WizardProvider = one place that owns the multi-step form:
 * - which step you are on (currentStep)
 * - all field values (formData)
 * - rules for "can go Next?" and "can submit?"
 *
 * It passes that bundle down through React Context so DestinationStep, WizardForm, etc.
 * can call useWizard() instead of receiving dozens of props from TripWizard.
 *
 * useMemo here keeps derived values and the context `value` object stable when inputs
 * have not changed, so step components do not re-render more than necessary.
 */
const STEPS = {
  basics: 1,
  budgetAndTitle: 2,
  review: 3,
};

const DEFAULT_FORM_DATA = {
  destination: '',
  startDate: '',
  endDate: '',
  price: '',
  title: '',
};

export function WizardProvider({ children, initialValues }) {
  // --- state ---
  const [currentStep, setCurrentStep] = useState(STEPS.basics);
  const [formData, setFormData] = useState(() => ({
    ...DEFAULT_FORM_DATA,
    ...(initialValues || {}),
  }));

  function updateFields(partial) {
    setFormData((prev) => ({ ...prev, ...(partial || {}) }));
  }

  function nextStep() {
    setCurrentStep((s) => Math.min(STEPS.review, s + 1));
  }

  function prevStep() {
    setCurrentStep((s) => Math.max(STEPS.basics, s - 1));
  }

  // --- derived from formData (each memo only re-runs when its inputs change) ---
  const priceNumber = useMemo(() => toNumberOrNull(formData.price), [formData.price]);

  const step1Valid = useMemo(
    () =>
      isNonEmptyString(formData.destination) &&
      isValidDateRange(formData.startDate, formData.endDate),
    [formData.destination, formData.startDate, formData.endDate],
  );

  const step2Valid = useMemo(
    () => priceNumber !== null && priceNumber >= 0 && isNonEmptyString(formData.title),
    [priceNumber, formData.title],
  );

  const canGoNext = useMemo(() => {
    if (currentStep === STEPS.basics) return step1Valid;
    if (currentStep === STEPS.budgetAndTitle) return step2Valid;
    return false;
  }, [currentStep, step1Valid, step2Valid]);

  const canSubmit = useMemo(
    () => currentStep === STEPS.review && step1Valid && step2Valid,
    [currentStep, step1Valid, step2Valid],
  );

  // --- single object passed to every useWizard() consumer ---
  const value = useMemo(
    () => ({
      formData,
      updateFields,
      currentStep,
      nextStep,
      prevStep,
      steps: STEPS,
      priceNumber,
      step1Valid,
      step2Valid,
      canGoNext,
      canSubmit,
    }),
    [formData, currentStep, priceNumber, step1Valid, step2Valid, canGoNext, canSubmit],
  );

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}
