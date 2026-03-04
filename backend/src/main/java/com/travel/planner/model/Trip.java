package com.travel.planner.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // Tells Spring Boot to create a table in the DB for this class
public class Trip {

    @Id // Marks this field as the Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    private Long id;

    private String title;
    private String destination;
    private String startDate; // For now, we use String for simplicity

    // Default constructor is required by JPA
    public Trip() {}

    // Constructor for easy object creation
    public Trip(String title, String destination, String startDate) {
        this.title = title;
        this.destination = destination;
        this.startDate = startDate;
    }

    // Getters and Setters (React needs these to "read" the data)
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }
}