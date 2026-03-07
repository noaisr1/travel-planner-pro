package com.travel.planner.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity // Tells Spring Boot to create a table in the DB for this class
public class Trip {

    @Id // Marks this field as the Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    private Long id;

    private String title;
    private String destination;
    private String startDate; // For now, we use String for simplicity
    private String endDate; // Added End Date for duration calculations
    private double price; // Added for budget tracking

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlanItem> planItems = new ArrayList<>();

    // Default constructor is required by JPA
    public Trip() {
    }

    // Constructor for easy object creation
    public Trip(String title, String destination, String startDate, String endDate, double price) {
        this.title = title;
        this.destination = destination;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
    }

    // Getters and Setters (React needs these to "read" the data)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    
    // Helper method to add items safely
    public void addPlanItem(PlanItem item) {
        planItems.add(item);
        item.setTrip(this);
    }
}