package com.travel.planner.controller;

import com.travel.planner.model.Trip;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:5173")
public class TripController {

    @GetMapping
    public List<Trip> getAllTrips() {
        // Returning a mock list of trips to test the connection
        return Arrays.asList(
            new Trip("Summer Vacation", "Tel Aviv", "2026-06-01"),
            new Trip("Winter Ski", "Swiss Alps", "2026-12-15")
        );
    }
}