package com.foodbridge.api_spring.mapper;

import com.foodbridge.api_spring.model.dto.response.FoodDonationCreateResponse;
import com.foodbridge.api_spring.model.dto.response.FoodDonationResponse;
import com.foodbridge.api_spring.model.dto.response.GetAllDonationsResponse;
import com.foodbridge.api_spring.model.entity.FoodDonation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FoodDonationMapper {

    FoodDonationCreateResponse toResponse(FoodDonation donation);
    FoodDonationResponse toDetailResponse(FoodDonation donation);
    GetAllDonationsResponse toGetAllResponse(FoodDonation donation);
}