package com.foodbridge.api_spring.model.dto.request;

import lombok.Data;

@Data
public class UserUpdateRequestDTO {
    private String name;
    private String phoneNumber;
    private Double longitude;
    private Double latitude;
}
