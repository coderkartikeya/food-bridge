package com.foodbridge.api_spring.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserLoginRequestDTO {
    @NotBlank (message = "Email Should not be blank")
    @Email (message =  "Email must be in valid format")
    private String email;

    @NotBlank(message = "Password should not be blank")
    private String password;
}
