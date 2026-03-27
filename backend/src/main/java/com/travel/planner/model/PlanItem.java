package com.travel.planner.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class PlanItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String activityName; // e.g., "Flight to Paris"
    private String type;         // e.g., "FLIGHT", "HOTEL", "FOOD"
    private String itemTime;     // e.g., "10:30"
    private double itemPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    @JsonIgnore // Prevents infinite recursion during JSON serialization
    private Trip trip;

    public PlanItem() {}

    // Getters and Setters (Omitted for brevity, but you need them!)
    public Long getId() { return id; }
    public String getActivityName() { return activityName; }
    public void setActivityName(String name) { this.activityName = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getItemTime() { return itemTime; }
    public void setItemTime(String time) { this.itemTime = time; }
    public double getItemPrice() { return itemPrice; }
    public void setItemPrice(double itemPrice) { this.itemPrice = itemPrice; }
    public Trip getTrip() { return trip; }
    public void setTrip(Trip trip) { this.trip = trip; }
}