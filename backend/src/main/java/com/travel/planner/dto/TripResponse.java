package com.travel.planner.dto;

import java.util.List;

public record TripResponse(
        Long id,
        String title,
        String destination,
        String startDate,
        String endDate,
        double price,
        List<PlanItemResponse> planItems
) {}

