package com.foodbridge.api_spring.model.dto.response;

import com.foodbridge.api_spring.model.enums.Roles;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.stream.Location;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetUserDTO {
    private String name;
    private String email;
    private String phoneNumber;
    private Roles roles;
    private LocationDTO location;
}
