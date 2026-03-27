package com.travel.planner.dto;

public record PlanItemResponse(
        Long id,
        String activityName,
        String type,
        String itemTime,
        double itemPrice
) {}

