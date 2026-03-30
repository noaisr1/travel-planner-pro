import { useMemo } from 'react';
import styles from './TripCreate.module.css';
import Step1Basics from './wizard/Step1Basics';
import Step2Budget from './wizard/Step2Budget';
import Step3Review from './wizard/Step3Review';
import { WizardProvider, useWizard } from './wizard/WizardContext';

function WizardInner({ onSubmit, onCancel }) {
  const {
    formData,
    currentStep,
    steps,
    nextStep,
    prevStep,
    canGoNext,
    canSubmit,
    step1Valid,
    step2Valid,
    priceNumber,
  } = useWizard();

  const progressLabel = useMemo(() => {
    if (currentStep === steps.basics) return 'Step 1 of 3';
    if (currentStep === steps.budgetAndTitle) return 'Step 2 of 3';
    return 'Step 3 of 3';
  }, [currentStep, steps.basics, steps.budgetAndTitle]);

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    onSubmit({
      title: formData.title.trim(),
      destination: formData.destination.trim(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      price: priceNumber ?? 0,
    });
  };

  return (
    <form className={styles.tripWizard} onSubmit={handleConfirm}>
      <div className={styles.tripWizardTop}>
        <div className={styles.tripWizardProgress} aria-label={progressLabel}>
          <div
            className={
              currentStep >= 1
                ? `${styles.tripWizardDot} ${styles['tripWizardDot--active']}`
                : styles.tripWizardDot
            }
          />
          <div
            className={
              currentStep >= 2
                ? `${styles.tripWizardDot} ${styles['tripWizardDot--active']}`
                : styles.tripWizardDot
            }
          />
          <div
            className={
              currentStep >= 3
                ? `${styles.tripWizardDot} ${styles['tripWizardDot--active']}`
                : styles.tripWizardDot
            }
          />
        </div>
        <div className={styles.tripWizardProgressText}>{progressLabel}</div>
      </div>

      {currentStep === steps.basics && <Step1Basics />}
      {currentStep === steps.budgetAndTitle && <Step2Budget />}
      {currentStep === steps.review && <Step3Review />}

      <div className={styles.tripWizardActions}>
        <button
          type="button"
          onClick={onCancel}
          className={`${styles.tripWizardBtn} ${styles['tripWizardBtn--ghost']}`}
        >
          Cancel
        </button>

        <div className={styles.tripWizardActionsRight}>
          {currentStep > steps.basics && (
            <button
              type="button"
              onClick={prevStep}
              className={`${styles.tripWizardBtn} ${styles['tripWizardBtn--ghost']}`}
            >
              Back
            </button>
          )}

          {currentStep < steps.review && (
            <button
              type="button"
              onClick={() => {
                if (!canGoNext) return;
                nextStep();
              }}
              className={styles.tripWizardBtn}
              disabled={!canGoNext || (currentStep === steps.budgetAndTitle && !step1Valid)}
            >
              Next
            </button>
          )}

          {currentStep === steps.review && (
            <button type="submit" className={styles.tripWizardBtn} disabled={!step1Valid || !step2Valid}>
              Create trip
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default function TripWizard({ onSubmit, onCancel }) {
  return (
    <WizardProvider>
      <WizardInner onSubmit={onSubmit} onCancel={onCancel} />
    </WizardProvider>
  );
}

