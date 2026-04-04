export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function formatItemTime(itemTime) {
  if (typeof itemTime !== 'string' || itemTime.trim() === '') return '';
  const trimmed = itemTime.trim();
  if (/^\d{1,2}:\d{2}$/.test(trimmed)) return trimmed;

  const d = new Date(trimmed);
  if (Number.isNaN(d.getTime())) return trimmed;

  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

export function calculateDuration(start, end) {
  if (!start || !end) return 0;
  const diffTime = Math.abs(new Date(end) - new Date(start));
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}
