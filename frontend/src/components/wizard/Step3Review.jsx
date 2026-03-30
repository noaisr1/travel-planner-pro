import styles from '../TripCreate.module.css';
import { useWizard } from './WizardContext';

export default function Step3Review() {
  const { formData, priceNumber, step1Valid, step2Valid } = useWizard();

  return (
    <div className={styles.tripWizardStep} aria-label="Confirmation">
      <div className={styles.tripWizardReview}>
        <div className={styles.tripWizardReviewRow}>
          <span className={styles.tripWizardReviewKey}>Destination</span>
          <span className={styles.tripWizardReviewVal}>{formData.destination || '—'}</span>
        </div>
        <div className={styles.tripWizardReviewRow}>
          <span className={styles.tripWizardReviewKey}>Dates</span>
          <span className={styles.tripWizardReviewVal}>
            {formData.startDate && formData.endDate ? `${formData.startDate} → ${formData.endDate}` : '—'}
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
          <span className={styles.tripWizardReviewVal}>{formData.title || '—'}</span>
        </div>
      </div>

      {(!step1Valid || !step2Valid) && (
        <div className={styles.tripWizardHint} role="alert">
          Some details are missing or invalid. Go back to fix them.
        </div>
      )}
    </div>
  );
}

