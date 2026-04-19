package com.foodbridge.api_spring.services;


import com.foodbridge.api_spring.model.dto.request.FoodDonationCreateRequest;
import com.foodbridge.api_spring.model.dto.response.FoodDonationCreateResponse;
import com.foodbridge.api_spring.model.dto.response.FoodDonationResponse;
import com.foodbridge.api_spring.model.dto.response.GetAllDonationsResponse;
import com.foodbridge.api_spring.model.entity.User;

import java.util.List;
import java.util.UUID;

public interface FoodDonationService {
    FoodDonationCreateResponse createDonation(User donor, FoodDonationCreateRequest request);
    List<GetAllDonationsResponse> getAllAvailableDonations(Double userLat, Double userLon, Double radiusInKm);
    FoodDonationResponse getDonationById(UUID id);
    void deleteDonation(User donor, UUID id);
}