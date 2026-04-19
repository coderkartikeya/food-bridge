package com.foodbridge.api_spring.model.dto.response;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class UserUpdateResponse {
    private UUID id;
    private Instant updatedAt;
}
