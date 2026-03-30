import { createContext, useContext, useMemo, useState } from 'react';

const WizardContext = createContext(null);

function toNumberOrNull(value) {
  if (value === '' || value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isIsoDateString(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidDateRange(startDate, endDate) {
  if (!isIsoDateString(startDate) || !isIsoDateString(endDate)) return false;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false;
  return end >= start;
}

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
  const [currentStep, setCurrentStep] = useState(STEPS.basics);
  const [formData, setFormData] = useState(() => ({
    ...DEFAULT_FORM_DATA,
    ...(initialValues || {}),
  }));

  const updateFields = (partial) => {
    setFormData((prev) => ({ ...prev, ...(partial || {}) }));
  };

  const priceNumber = useMemo(() => toNumberOrNull(formData.price), [formData.price]);

  const step1Valid = useMemo(() => {
    return isNonEmptyString(formData.destination) && isValidDateRange(formData.startDate, formData.endDate);
  }, [formData.destination, formData.startDate, formData.endDate]);

  const step2Valid = useMemo(() => {
    return priceNumber !== null && priceNumber >= 0 && isNonEmptyString(formData.title);
  }, [priceNumber, formData.title]);

  const canGoNext = useMemo(() => {
    if (currentStep === STEPS.basics) return step1Valid;
    if (currentStep === STEPS.budgetAndTitle) return step2Valid;
    return false;
  }, [currentStep, step1Valid, step2Valid]);

  const canSubmit = useMemo(() => {
    return currentStep === STEPS.review && step1Valid && step2Valid;
  }, [currentStep, step1Valid, step2Valid]);

  const nextStep = () => {
    setCurrentStep((s) => Math.min(STEPS.review, s + 1));
  };

  const prevStep = () => {
    setCurrentStep((s) => Math.max(STEPS.basics, s - 1));
  };

  const value = useMemo(() => {
    return {
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
    };
  }, [formData, currentStep, priceNumber, step1Valid, step2Valid, canGoNext, canSubmit]);

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used within a WizardProvider');
  return ctx;
}

