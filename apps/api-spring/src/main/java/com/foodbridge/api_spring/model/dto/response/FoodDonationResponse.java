package com.foodbridge.api_spring.model.dto.response;

import com.foodbridge.api_spring.model.enums.DonationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodDonationResponse {

    private UUID id;
    private String title;
    private String description;

    private String category;

    private Integer quantity;
    private LocalDateTime expiryTime;
    private DonationStatus status;
    private Instant createdAt;

    private String donorName;
    private Double latitude;
    private Double longitude;

    private String distance;
}