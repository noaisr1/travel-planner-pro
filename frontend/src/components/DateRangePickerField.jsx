import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import styles from './TripCreate.module.css';

function pad2(n) {
  return String(n).padStart(2, '0');
}

function toIsoDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
}

// A button that opens a calendar popover for picking a start-to-end date range.
function DateRangePickerField({ label, value, onChange, disabled = false }) {
  const [open, setOpen] = useState(false);

  const selected = {
    from: value?.startDate ? new Date(value.startDate) : undefined,
    to: value?.endDate ? new Date(value.endDate) : undefined,
  };

  const displayValue =
    value?.startDate && value?.endDate
      ? `${value.startDate} → ${value.endDate}`
      : value?.startDate
        ? `${value.startDate} → …`
        : '';

  return (
    <div className={styles.tripWizardField}>
      <label className={styles.tripWizardLabel}>
        {label}
        <button
          type="button"
          className={styles.tripWizardDateBtn}
          onClick={() => !disabled && setOpen((v) => !v)}
          disabled={disabled}
          aria-expanded={open}
        >
          {displayValue || 'Select dates'}
        </button>
      </label>

      {open && !disabled && (
        <div className={styles.tripWizardDatePopover}>
          <DayPicker
            className={styles.tripDatePicker}
            mode="range"
            selected={selected}
            onSelect={(range) => {
              const startDate = range?.from ? toIsoDate(range.from) : '';
              const endDate = range?.to ? toIsoDate(range.to) : '';
              onChange({ startDate, endDate });
            }}
            numberOfMonths={2}
            fixedWeeks
          />

          <div className={styles.tripWizardDatePopoverActions}>
            <button
              type="button"
              className={`${styles.tripWizardBtn} ${styles['tripWizardBtn--ghost']}`}
              onClick={() => {
                onChange({ startDate: '', endDate: '' });
              }}
            >
              Clear
            </button>
            <button type="button" className={styles.tripWizardBtn} onClick={() => setOpen(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DateRangePickerField;

