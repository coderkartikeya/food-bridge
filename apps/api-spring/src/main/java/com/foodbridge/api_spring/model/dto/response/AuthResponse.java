package com.foodbridge.api_spring.model.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.foodbridge.api_spring.model.enums.Roles;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String accessToken;
    @JsonIgnore
    private String refreshToken;
    private String fullName;
    private Roles role;
    private Double lat;
    private Double lan;
}