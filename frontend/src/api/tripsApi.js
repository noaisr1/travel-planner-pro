import { apiFetch } from './client';

export function listTrips() {
  return apiFetch('/api/trips');
}

export function createTrip(payload) {
  return apiFetch('/api/trips', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateTrip(id, payload) {
  return apiFetch(`/api/trips/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteTrip(id) {
  return apiFetch(`/api/trips/${id}`, { method: 'DELETE' });
}

export function addTripEvent(tripId, payload) {
  return apiFetch(`/api/trips/${tripId}/events`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

