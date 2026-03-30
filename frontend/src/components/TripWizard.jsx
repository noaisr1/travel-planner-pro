import { useMemo, useState } from 'react';
import DateRangePickerField from './DateRangePickerField';
import styles from './TripCreate.module.css';

const STEPS = {
  basics: 1,
  budgetAndTitle: 2,
  confirm: 3,
};

function toNumberOrNull(value) {
  if (value === '' || value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function TripWizard({ onSubmit, onCancel }) {
  const [step, setStep] = useState(STEPS.basics);
  const [values, setValues] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    price: '',
    title: '',
  });

  const step1Valid = useMemo(() => {
    return (
      isNonEmptyString(values.destination) &&
      isNonEmptyString(values.startDate) &&
      isNonEmptyString(values.endDate) &&
      new Date(values.endDate) >= new Date(values.startDate)
    );
  }, [values.destination, values.startDate, values.endDate]);

  const priceNumber = useMemo(() => toNumberOrNull(values.price), [values.price]);

  const step2Valid = useMemo(() => {
    return priceNumber !== null && priceNumber >= 0 && isNonEmptyString(values.title);
  }, [priceNumber, values.title]);

  const canGoNext = useMemo(() => {
    if (step === STEPS.basics) return step1Valid;
    if (step === STEPS.budgetAndTitle) return step2Valid;
    return false;
  }, [step, step1Valid, step2Valid]);

  const handleNext = () => {
    if (!canGoNext) return;
    setStep((s) => Math.min(STEPS.confirm, s + 1));
  };

  const handleBack = () => {
    setStep((s) => Math.max(STEPS.basics, s - 1));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!step1Valid || !step2Valid) return;

    onSubmit({
      title: values.title.trim(),
      destination: values.destination.trim(),
      startDate: values.startDate,
      endDate: values.endDate,
      price: priceNumber ?? 0,
    });
  };

  const progressLabel = useMemo(() => {
    if (step === STEPS.basics) return 'Step 1 of 3';
    if (step === STEPS.budgetAndTitle) return 'Step 2 of 3';
    return 'Step 3 of 3';
  }, [step]);

  const showTitleField = priceNumber !== null && priceNumber >= 0;

  return (
    <form className={styles.tripWizard} onSubmit={handleConfirm}>
      <div className={styles.tripWizardTop}>
        <div className={styles.tripWizardProgress} aria-label={progressLabel}>
          <div className={step >= 1 ? `${styles.tripWizardDot} ${styles['tripWizardDot--active']}` : styles.tripWizardDot} />
          <div className={step >= 2 ? `${styles.tripWizardDot} ${styles['tripWizardDot--active']}` : styles.tripWizardDot} />
          <div className={step >= 3 ? `${styles.tripWizardDot} ${styles['tripWizardDot--active']}` : styles.tripWizardDot} />
        </div>
        <div className={styles.tripWizardProgressText}>{progressLabel}</div>
      </div>

      {step === STEPS.basics && (
        <div className={styles.tripWizardStep} aria-label="Basics">
          <label className={styles.tripWizardLabel}>
            Destination
            <input
              className={styles.tripWizardInput}
              name="destination"
              placeholder="Where are you going?"
              value={values.destination}
              onChange={(e) => setValues((v) => ({ ...v, destination: e.target.value }))}
              required
              autoFocus
            />
          </label>

          <div className={styles.tripWizardSpacer} />

          <DateRangePickerField
            label="Date range"
            value={{ startDate: values.startDate, endDate: values.endDate }}
            disabled={!isNonEmptyString(values.destination)}
            onChange={({ startDate, endDate }) => setValues((v) => ({ ...v, startDate, endDate }))}
          />

          {!step1Valid && isNonEmptyString(values.startDate) && isNonEmptyString(values.endDate) && (
            <div className={styles.tripWizardHint} role="alert">
              End date cannot be before start date.
            </div>
          )}
        </div>
      )}

      {step === STEPS.budgetAndTitle && (
        <div className={styles.tripWizardStep} aria-label="Budget and title">
          {!step1Valid && (
            <div className={styles.tripWizardHint} role="alert">
              Complete Step 1 to continue.
            </div>
          )}

          <label className={styles.tripWizardLabel}>
            Budget / price (USD)
            <input
              className={styles.tripWizardInput}
              name="price"
              type="number"
              min="0"
              step="1"
              placeholder="0"
              value={values.price}
              onChange={(e) => setValues((v) => ({ ...v, price: e.target.value }))}
              required
              disabled={!step1Valid}
              autoFocus
            />
          </label>

          {showTitleField && (
            <label className={styles.tripWizardLabel}>
              Trip title
              <input
                className={styles.tripWizardInput}
                name="title"
                placeholder="e.g. Summer in Lisbon"
                value={values.title}
                onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
                required
              />
            </label>
          )}

          {priceNumber !== null && priceNumber < 0 && (
            <div className={styles.tripWizardHint} role="alert">
              Price must be 0 or greater.
            </div>
          )}
        </div>
      )}

      {step === STEPS.confirm && (
        <div className={styles.tripWizardStep} aria-label="Confirmation">
          <div className={styles.tripWizardReview}>
            <div className={styles.tripWizardReviewRow}>
              <span className={styles.tripWizardReviewKey}>Destination</span>
              <span className={styles.tripWizardReviewVal}>{values.destination || '—'}</span>
            </div>
            <div className={styles.tripWizardReviewRow}>
              <span className={styles.tripWizardReviewKey}>Dates</span>
              <span className={styles.tripWizardReviewVal}>
                {values.startDate && values.endDate ? `${values.startDate} → ${values.endDate}` : '—'}
              </span>
            </div>
            <div className={styles.tripWizardReviewRow}>
              <span className={styles.tripWizardReviewKey}>Price</span>
              <span className={styles.tripWizardReviewVal}>
                {priceNumber !== null ? `$${priceNumber.toLocaleString()}` : '—'}
              </span>
            </div>
            <div className={styles.tripWizardReviewRow}>
              <span className={styles.tripWizardReviewKey}>Title</span>
              <span className={styles.tripWizardReviewVal}>{values.title || '—'}</span>
            </div>
          </div>

          {(!step1Valid || !step2Valid) && (
            <div className={styles.tripWizardHint} role="alert">
              Some details are missing or invalid. Go back to fix them.
            </div>
          )}
        </div>
      )}

      <div className={styles.tripWizardActions}>
        <button
          type="button"
          onClick={onCancel}
          className={`${styles.tripWizardBtn} ${styles['tripWizardBtn--ghost']}`}
        >
          Cancel
        </button>

        <div className={styles.tripWizardActionsRight}>
          {step > STEPS.basics && (
            <button
              type="button"
              onClick={handleBack}
              className={`${styles.tripWizardBtn} ${styles['tripWizardBtn--ghost']}`}
            >
              Back
            </button>
          )}

          {step < STEPS.confirm && (
            <button
              type="button"
              onClick={handleNext}
              className={styles.tripWizardBtn}
              disabled={!canGoNext || (step === STEPS.budgetAndTitle && !step1Valid)}
            >
              Next
            </button>
          )}

          {step === STEPS.confirm && (
            <button type="submit" className={styles.tripWizardBtn} disabled={!step1Valid || !step2Valid}>
              Create trip
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default TripWizard;

