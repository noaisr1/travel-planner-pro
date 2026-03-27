import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTripEvent, createTrip, deleteTrip, listTrips, updateTrip } from '../api/tripsApi';

const tripsKey = ['trips'];

export function useTrips() {
  const queryClient = useQueryClient();

  const tripsQuery = useQuery({
    queryKey: tripsKey,
    queryFn: listTrips,
  });

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

