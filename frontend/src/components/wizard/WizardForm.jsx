import styles from '../TripCreate.module.css';
import DestinationStep from './DestinationStep';
import BudgetStep from './BudgetStep';
import ReviewStep from './ReviewStep';
import { useWizard } from './useWizard';

// The wizard's <form>: progress dots, the current step component, and Back/Next/Create buttons.
function getProgressLabel(currentStep, steps) {
  if (currentStep === steps.basics) return 'Step 1 of 3';
  if (currentStep === steps.budgetAndTitle) return 'Step 2 of 3';
  return 'Step 3 of 3';
}

export default function WizardForm({ onSubmit, onCancel }) {
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

  const progressLabel = getProgressLabel(currentStep, steps);

  function handleConfirm(e) {
    e.preventDefault();
    if (!canSubmit) return;

    onSubmit({
      title: formData.title.trim(),
      destination: formData.destination.trim(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      price: priceNumber ?? 0,
    });
  }

  return (
    <form className={styles.tripWizard} onSubmit={handleConfirm}>
      <div className={styles.tripWizardTop}>
        <div className={styles.tripWizardProgress} aria-label={progressLabel}>
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={
                currentStep >= step
                  ? `${styles.tripWizardDot} ${styles['tripWizardDot--active']}`
                  : styles.tripWizardDot
              }
            />
          ))}
        </div>
        <div className={styles.tripWizardProgressText}>{progressLabel}</div>
      </div>

      {currentStep === steps.basics && <DestinationStep />}
      {currentStep === steps.budgetAndTitle && <BudgetStep />}
      {currentStep === steps.review && <ReviewStep />}

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
              onClick={nextStep}
              className={styles.tripWizardBtn}
              disabled={!canGoNext}
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
