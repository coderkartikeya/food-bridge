package com.foodbridge.api_spring.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FoodDonationCreateResponse {
    private String id;
    private String title;
    private Instant createdAt;
}
