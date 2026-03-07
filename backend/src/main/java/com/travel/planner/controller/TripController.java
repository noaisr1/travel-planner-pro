package com.travel.planner.controller;

import com.travel.planner.model.PlanItem;
import com.travel.planner.model.Trip;
import com.travel.planner.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:5173")
public class TripController {

    @Autowired
    private TripRepository tripRepository; // Inject the repository to talk to the DB

    // GET all trips from the database
    @GetMapping
    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    // POST a new trip to the database
    @PostMapping
    public Trip addTrip(@RequestBody Trip newTrip) {
        // This saves the trip and returns the saved object (including the generated ID)
        return tripRepository.save(newTrip);
    }

    // New: Delete a trip by ID
    @DeleteMapping("/{id}")
    public void deleteTrip(@PathVariable Long id) {
        tripRepository.deleteById(id);
    }

    // New: Update an existing trip
    @PutMapping("/{id}")
    public Trip updateTrip(@PathVariable Long id, @RequestBody Trip updatedTrip) {
        return tripRepository.findById(id)
                .map(trip -> {
                    trip.setTitle(updatedTrip.getTitle());
                    trip.setDestination(updatedTrip.getDestination());
                    trip.setStartDate(updatedTrip.getStartDate());
                    trip.setEndDate(updatedTrip.getEndDate());
                    trip.setPrice(updatedTrip.getPrice());
                    return tripRepository.save(trip);
                })
                .orElseGet(() -> {
                    updatedTrip.setId(id);
                    return tripRepository.save(updatedTrip);
                });
    }

    /* Add this to your TripController.java */
    @PostMapping("/{id}/events")
    public Trip addEventToTrip(@PathVariable Long id, @RequestBody PlanItem newItem) {
        return tripRepository.findById(id).map(trip -> {
            trip.addPlanItem(newItem); // Using the helper method we defined in Trip.java
            return tripRepository.save(trip);
        }).orElseThrow(() -> new RuntimeException("Trip not found"));
    }
}