import { useMemo, useState } from 'react';
import DateRangePickerField from './DateRangePickerField';
import './TripCreate.css';

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
    <form className="tripWizard" onSubmit={handleConfirm}>
      <div className="tripWizardTop">
        <div className="tripWizardProgress" aria-label={progressLabel}>
          <div className={step >= 1 ? 'tripWizardDot tripWizardDot--active' : 'tripWizardDot'} />
          <div className={step >= 2 ? 'tripWizardDot tripWizardDot--active' : 'tripWizardDot'} />
          <div className={step >= 3 ? 'tripWizardDot tripWizardDot--active' : 'tripWizardDot'} />
        </div>
        <div className="tripWizardProgressText">{progressLabel}</div>
      </div>

      {step === STEPS.basics && (
        <div className="tripWizardStep" aria-label="Basics">
          <label className="tripWizardLabel">
            Destination
            <input
              className="tripWizardInput"
              name="destination"
              placeholder="Where are you going?"
              value={values.destination}
              onChange={(e) => setValues((v) => ({ ...v, destination: e.target.value }))}
              required
              autoFocus
            />
          </label>

          <div className="tripWizardSpacer" />

          <DateRangePickerField
            label="Date range"
            value={{ startDate: values.startDate, endDate: values.endDate }}
            disabled={!isNonEmptyString(values.destination)}
            onChange={({ startDate, endDate }) => setValues((v) => ({ ...v, startDate, endDate }))}
          />

          {!step1Valid && isNonEmptyString(values.startDate) && isNonEmptyString(values.endDate) && (
            <div className="tripWizardHint" role="alert">
              End date cannot be before start date.
            </div>
          )}
        </div>
      )}

      {step === STEPS.budgetAndTitle && (
        <div className="tripWizardStep" aria-label="Budget and title">
          {!step1Valid && (
            <div className="tripWizardHint" role="alert">
              Complete Step 1 to continue.
            </div>
          )}

          <label className="tripWizardLabel">
            Budget / price (USD)
            <input
              className="tripWizardInput"
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
            <label className="tripWizardLabel">
              Trip title
              <input
                className="tripWizardInput"
                name="title"
                placeholder="e.g. Summer in Lisbon"
                value={values.title}
                onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
                required
              />
            </label>
          )}

          {priceNumber !== null && priceNumber < 0 && (
            <div className="tripWizardHint" role="alert">
              Price must be 0 or greater.
            </div>
          )}
        </div>
      )}

      {step === STEPS.confirm && (
        <div className="tripWizardStep" aria-label="Confirmation">
          <div className="tripWizardReview">
            <div className="tripWizardReviewRow">
              <span className="tripWizardReviewKey">Destination</span>
              <span className="tripWizardReviewVal">{values.destination || '—'}</span>
            </div>
            <div className="tripWizardReviewRow">
              <span className="tripWizardReviewKey">Dates</span>
              <span className="tripWizardReviewVal">
                {values.startDate && values.endDate ? `${values.startDate} → ${values.endDate}` : '—'}
              </span>
            </div>
            <div className="tripWizardReviewRow">
              <span className="tripWizardReviewKey">Price</span>
              <span className="tripWizardReviewVal">
                {priceNumber !== null ? `$${priceNumber.toLocaleString()}` : '—'}
              </span>
            </div>
            <div className="tripWizardReviewRow">
              <span className="tripWizardReviewKey">Title</span>
              <span className="tripWizardReviewVal">{values.title || '—'}</span>
            </div>
          </div>

          {(!step1Valid || !step2Valid) && (
            <div className="tripWizardHint" role="alert">
              Some details are missing or invalid. Go back to fix them.
            </div>
          )}
        </div>
      )}

      <div className="tripWizardActions">
        <button type="button" onClick={onCancel} className="tripWizardBtn tripWizardBtn--ghost">
          Cancel
        </button>

        <div className="tripWizardActionsRight">
          {step > STEPS.basics && (
            <button type="button" onClick={handleBack} className="tripWizardBtn tripWizardBtn--ghost">
              Back
            </button>
          )}

          {step < STEPS.confirm && (
            <button
              type="button"
              onClick={handleNext}
              className="tripWizardBtn"
              disabled={!canGoNext || (step === STEPS.budgetAndTitle && !step1Valid)}
            >
              Next
            </button>
          )}

          {step === STEPS.confirm && (
            <button type="submit" className="tripWizardBtn" disabled={!step1Valid || !step2Valid}>
              Create trip
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default TripWizard;

