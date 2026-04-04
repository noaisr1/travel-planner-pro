import { isNonEmptyString } from '../../utils/validation';
import DateRangePickerField from '../DateRangePickerField';
import styles from '../TripCreate.module.css';
import { useWizard } from './useWizard';

// Wizard step 1: destination input and date range picker.
export default function DestinationStep() {
  const { formData, updateFields, step1Valid } = useWizard();

  return (
    <div className={styles.tripWizardStep} aria-label="Basics">
      <label className={styles.tripWizardLabel}>
        Destination
        <input
          className={styles.tripWizardInput}
          name="destination"
          placeholder="Where are you going?"
          value={formData.destination}
          onChange={(e) => updateFields({ destination: e.target.value })}
          required
          autoFocus
        />
      </label>

      <div className={styles.tripWizardSpacer} />

      <DateRangePickerField
        label="Date range"
        value={{ startDate: formData.startDate, endDate: formData.endDate }}
        disabled={!isNonEmptyString(formData.destination)}
        onChange={({ startDate, endDate }) => updateFields({ startDate, endDate })}
      />

      {!step1Valid && isNonEmptyString(formData.startDate) && isNonEmptyString(formData.endDate) && (
        <div className={styles.tripWizardHint} role="alert">
          End date cannot be before start date.
        </div>
      )}
    </div>
  );
}
