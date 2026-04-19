package com.foodbridge.api_spring.model.dto.request;

import com.foodbridge.api_spring.model.enums.FoodCategory;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FoodDonationCreateRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1 person")
    private Integer quantity;

    @NotNull(message = "Expiry time is required")
    @Future(message = "Expiry time must be in the future")
    private LocalDateTime expiryTime;

    @NotNull(message = "Category is required")
    private FoodCategory category;

    @NotNull(message = "Latitude is required for pickup location")
    private Double latitude;

    @NotNull(message = "Longitude is required for pickup location")
    private Double longitude;
}
