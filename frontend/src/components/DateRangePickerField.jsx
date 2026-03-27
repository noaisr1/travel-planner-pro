import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import './TripCreate.css';

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
    <div className="tripWizardField">
      <label className="tripWizardLabel">
        {label}
        <button
          type="button"
          className="tripWizardDateBtn"
          onClick={() => !disabled && setOpen((v) => !v)}
          disabled={disabled}
          aria-expanded={open}
        >
          {displayValue || 'Select dates'}
        </button>
      </label>

      {open && !disabled && (
        <div className="tripWizardDatePopover">
          <DayPicker
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

          <div className="tripWizardDatePopoverActions">
            <button
              type="button"
              className="tripWizardBtn tripWizardBtn--ghost"
              onClick={() => {
                onChange({ startDate: '', endDate: '' });
              }}
            >
              Clear
            </button>
            <button type="button" className="tripWizardBtn" onClick={() => setOpen(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DateRangePickerField;

