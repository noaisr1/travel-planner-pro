import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { addTripEvent, createTrip, deleteTrip, listTrips, updateTrip } from '../api/tripsApi';

export const TRIPS_QUERY_KEY = ['trips'];

export function useTrips() {
  const queryClient = useQueryClient();

  // useSuspenseQuery loads trips before render; Suspense shows a fallback until ready.
  const tripsQuery = useSuspenseQuery({
    queryKey: TRIPS_QUERY_KEY,
    queryFn: listTrips,
  });

  // Each mutation sends a write request to the API.
  // invalidateQueries tells React Query the cached trips are stale,
  // which triggers a refetch so the UI stays in sync with the server.
  const createTripMutation = useMutation({
    mutationFn: createTrip,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TRIPS_QUERY_KEY }),
  });

  const updateTripMutation = useMutation({
    mutationFn: ({ id, payload }) => updateTrip(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TRIPS_QUERY_KEY }),
  });

  const deleteTripMutation = useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TRIPS_QUERY_KEY }),
  });

  const addEventMutation = useMutation({
    mutationFn: ({ tripId, payload }) => addTripEvent(tripId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TRIPS_QUERY_KEY }),
  });

  return {
    tripsQuery,
    createTripMutation,
    updateTripMutation,
    deleteTripMutation,
    addEventMutation,
  };
}

