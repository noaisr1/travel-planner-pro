package com.travel.planner.controller;

import com.travel.planner.dto.PlanItemCreateRequest;
import com.travel.planner.dto.PlanItemResponse;
import com.travel.planner.dto.TripCreateRequest;
import com.travel.planner.dto.TripResponse;
import com.travel.planner.dto.TripUpdateRequest;
import com.travel.planner.model.PlanItem;
import com.travel.planner.model.Trip;
import com.travel.planner.service.TripService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    // GET all trips from the database
    @GetMapping
    public List<TripResponse> getAllTrips() {
        return tripService.getAllTrips().stream().map(this::toTripResponse).toList();
    }

    // POST a new trip to the database
    @PostMapping
    public TripResponse addTrip(@Valid @RequestBody TripCreateRequest req) {
        Trip created = tripService.createTrip(new Trip(
                req.title(),
                req.destination(),
                req.startDate(),
                req.endDate(),
                req.price()
        ));
        return toTripResponse(created);
    }

    // New: Delete a trip by ID
    @DeleteMapping("/{id}")
    public void deleteTrip(@PathVariable long id) {
        tripService.deleteTrip(id);
    }

    // New: Update an existing trip
    @PutMapping("/{id}")
    public TripResponse updateTrip(@PathVariable long id, @Valid @RequestBody TripUpdateRequest req) {
        Trip updated = new Trip(req.title(), req.destination(), req.startDate(), req.endDate(), req.price());
        Trip saved = tripService.updateTrip(id, updated);
        return toTripResponse(saved);
    }

    @PostMapping("/{id}/events")
    public TripResponse addEventToTrip(@PathVariable long id, @Valid @RequestBody PlanItemCreateRequest req) {
        PlanItem newItem = new PlanItem();
        newItem.setActivityName(req.activityName());
        newItem.setType(req.type());
        newItem.setItemTime(req.itemTime());
        newItem.setItemPrice(req.itemPrice());

        Trip saved = tripService.addEventToTrip(id, newItem);
        return toTripResponse(saved);
    }

    private TripResponse toTripResponse(Trip trip) {
        List<PlanItemResponse> items = trip.getPlanItems()
                .stream()
                .map(i -> new PlanItemResponse(i.getId(), i.getActivityName(), i.getType(), i.getItemTime(), i.getItemPrice()))
                .toList();
        return new TripResponse(
                trip.getId(),
                trip.getTitle(),
                trip.getDestination(),
                trip.getStartDate(),
                trip.getEndDate(),
                trip.getPrice(),
                items
        );
    }
}