import styles from '../TripCreate.module.css';
import { useWizard } from './useWizard';

// Wizard step 2: budget/price input and trip title.
export default function BudgetStep() {
  const { formData, updateFields, step1Valid, priceNumber } = useWizard();

  const showTitleField = priceNumber !== null && priceNumber >= 0;

  return (
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
          value={formData.price}
          onChange={(e) => updateFields({ price: e.target.value })}
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
            value={formData.title}
            onChange={(e) => updateFields({ title: e.target.value })}
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
  );
}
