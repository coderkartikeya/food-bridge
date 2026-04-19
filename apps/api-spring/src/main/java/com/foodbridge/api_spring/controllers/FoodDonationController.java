package com.foodbridge.api_spring.controllers;

import com.foodbridge.api_spring.model.dto.request.FoodDonationCreateRequest;
import com.foodbridge.api_spring.model.dto.response.ApiResponse;
import com.foodbridge.api_spring.model.dto.response.FoodDonationCreateResponse;
import com.foodbridge.api_spring.model.dto.response.FoodDonationResponse;
import com.foodbridge.api_spring.model.dto.response.GetAllDonationsResponse;
import com.foodbridge.api_spring.model.entity.User;
import com.foodbridge.api_spring.services.FoodDonationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/donations")
@RequiredArgsConstructor
public class FoodDonationController {

    private final FoodDonationService foodDonationService;

    @PostMapping
    public ResponseEntity<ApiResponse<FoodDonationCreateResponse>> createDonation(@RequestBody FoodDonationCreateRequest foodDonationCreateRequest
    , @AuthenticationPrincipal User donar, HttpServletRequest request
                                                                                  ){
        return ResponseEntity.ok(
                new ApiResponse<>(
                        foodDonationService.createDonation(donar,foodDonationCreateRequest),
                        request.getRequestURI(),
                        "Donation is created"
                )
        );
    }
    @GetMapping
    public ResponseEntity<ApiResponse<List<GetAllDonationsResponse>>> getAvailableDonations(
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lon,
            @RequestParam(required = false, defaultValue = "10.0") Double radiusInKM,
            HttpServletRequest request
    ) {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        foodDonationService.getAllAvailableDonations(lat, lon, radiusInKM),
                        request.getRequestURI(),
                        "Available donations fetched successfully"
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FoodDonationResponse>> getDonationById(
            @PathVariable UUID id,
            HttpServletRequest request
    ) {
        return ResponseEntity.ok(
                new ApiResponse<>(
                        foodDonationService.getDonationById(id),
                        request.getRequestURI(),
                        "Donation details fetched successfully"
                )
        );
    }
}
