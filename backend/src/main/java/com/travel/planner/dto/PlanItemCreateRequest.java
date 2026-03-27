package com.travel.planner.dto;

import jakarta.validation.constraints.NotBlank;

public record PlanItemCreateRequest(
        @NotBlank String activityName,
        @NotBlank String type,
        @NotBlank String itemTime,
        double itemPrice
) {}

