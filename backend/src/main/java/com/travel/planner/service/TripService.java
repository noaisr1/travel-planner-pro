package com.travel.planner.service;

import com.travel.planner.model.PlanItem;
import com.travel.planner.model.Trip;
import com.travel.planner.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripService {
    private final TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public Trip createTrip(Trip newTrip) {
        return tripRepository.save(newTrip);
    }

    public void deleteTrip(long id) {
        if (!tripRepository.existsById(id)) {
            throw new TripNotFoundException(id);
        }
        tripRepository.deleteById(id);
    }

    public Trip updateTrip(long id, Trip updatedTrip) {
        return tripRepository.findById(id)
                .map(trip -> {
                    trip.setTitle(updatedTrip.getTitle());
                    trip.setDestination(updatedTrip.getDestination());
                    trip.setStartDate(updatedTrip.getStartDate());
                    trip.setEndDate(updatedTrip.getEndDate());
                    trip.setPrice(updatedTrip.getPrice());
                    return tripRepository.save(trip);
                })
                .orElseThrow(() -> new TripNotFoundException(id));
    }

    public Trip addEventToTrip(long id, PlanItem newItem) {
        return tripRepository.findById(id)
                .map(trip -> {
                    trip.addPlanItem(newItem);
                    return tripRepository.save(trip);
                })
                .orElseThrow(() -> new TripNotFoundException(id));
    }

    public static class TripNotFoundException extends RuntimeException {
        private final long tripId;

        public TripNotFoundException(long tripId) {
            super("Trip not found: " + tripId);
            this.tripId = tripId;
        }

        public long getTripId() {
            return tripId;
        }
    }
}

