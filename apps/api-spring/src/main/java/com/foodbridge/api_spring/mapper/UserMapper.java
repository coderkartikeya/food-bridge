package com.foodbridge.api_spring.mapper;

import com.foodbridge.api_spring.model.dto.response.GetUserDTO;
import com.foodbridge.api_spring.model.dto.response.LocationDTO;
import com.foodbridge.api_spring.model.dto.response.UserUpdateResponse;
import com.foodbridge.api_spring.model.entity.User;

import org.locationtech.jts.geom.Point;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    GetUserDTO toGetUserDTO(User user);
    UserUpdateResponse toUpdateResponse(User user);
    default LocationDTO mapPointToLocationDTO(Point point) {
        if (point == null) {
            return null;
        }
        return new LocationDTO(point.getY(), point.getX());
    }
}
