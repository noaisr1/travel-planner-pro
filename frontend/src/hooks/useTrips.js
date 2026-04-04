import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTripEvent, createTrip, deleteTrip, listTrips, updateTrip } from '../api/tripsApi';

const tripsKey = ['trips'];

export function useTrips() {
  const queryClient = useQueryClient();

  // useQuery fetches trips from the API and caches the result.
  // React Query automatically re-renders components when the data changes.
  const tripsQuery = useQuery({
    queryKey: tripsKey,
    queryFn: listTrips,
  });

  // Each mutation sends a write request to the API.
  // invalidateQueries tells React Query the cached trips are stale,
  // which triggers a refetch so the UI stays in sync with the server.
  const createTripMutation = useMutation({
    mutationFn: createTrip,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: tripsKey }),
  });

  const updateTripMutation = useMutation({
    mutationFn: ({ id, payload }) => updateTrip(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: tripsKey }),
  });

  const deleteTripMutation = useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: tripsKey }),
  });

  const addEventMutation = useMutation({
    mutationFn: ({ tripId, payload }) => addTripEvent(tripId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: tripsKey }),
  });

  return {
    tripsQuery,
    createTripMutation,
    updateTripMutation,
    deleteTripMutation,
    addEventMutation,
  };
}

