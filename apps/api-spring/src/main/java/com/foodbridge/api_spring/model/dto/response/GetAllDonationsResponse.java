package com.foodbridge.api_spring.model.dto.response;

import com.foodbridge.api_spring.model.enums.DonationStatus;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class GetAllDonationsResponse {
    private UUID id;
    private String title;
    private String description;
    private String category;

    private Integer quantity;
    private LocalDateTime expiryTime;
    private DonationStatus status;

    private String distance;
}
