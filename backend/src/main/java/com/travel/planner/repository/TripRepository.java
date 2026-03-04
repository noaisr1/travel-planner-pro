package com.travel.planner.repository;

import com.travel.planner.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

// This interface gives us methods like save(), findAll(), deleteById() for free!
public interface TripRepository extends JpaRepository<Trip, Long> {
}