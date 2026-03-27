package com.travel.planner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record TripUpdateRequest(
        @NotBlank String title,
        @NotBlank String destination,
        @NotBlank String startDate,
        @NotBlank String endDate,
        @PositiveOrZero double price
) {}

