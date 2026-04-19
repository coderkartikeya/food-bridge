package com.foodbridge.api_spring.services.impl;


import com.foodbridge.api_spring.mapper.FoodDonationMapper;
import com.foodbridge.api_spring.model.dto.request.FoodDonationCreateRequest;
import com.foodbridge.api_spring.model.dto.response.FoodDonationCreateResponse;
import com.foodbridge.api_spring.model.dto.response.FoodDonationResponse;
import com.foodbridge.api_spring.model.dto.response.GetAllDonationsResponse;
import com.foodbridge.api_spring.model.entity.FoodDonation;
import com.foodbridge.api_spring.model.entity.User;
import com.foodbridge.api_spring.model.enums.DonationStatus;
import com.foodbridge.api_spring.repository.jpa.FoodDonationRepository;
import com.foodbridge.api_spring.repository.jpa.UserRepository;
import com.foodbridge.api_spring.services.FoodDonationService;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DecimalFormat;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodDonationServiceImpl implements FoodDonationService {

    private final FoodDonationRepository donationRepository;
    private final FoodDonationMapper donationMapper;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public FoodDonationCreateResponse createDonation(User donor, FoodDonationCreateRequest request) {
        GeometryFactory geometryFactory = new GeometryFactory();
        Point location = geometryFactory.createPoint(new Coordinate(request.getLongitude(), request.getLatitude()));
        location.setSRID(4326);
        User managedDonor = userRepository.getReferenceById(donor.getId());
        FoodDonation newDonation = FoodDonation.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .quantity(request.getQuantity())
                .expiryTime(request.getExpiryTime())
                .donor(managedDonor)
                .pickupLocation(location)
                .status(DonationStatus.AVAILABLE)
                .build();

        FoodDonation savedDonation = donationRepository.saveAndFlush(newDonation);

        return donationMapper.toResponse(savedDonation);
    }

    @Override
    public List<GetAllDonationsResponse> getAllAvailableDonations(Double userLat, Double userLon, Double radiusInKm) {
        if (userLat == null || userLon == null) {
            return donationRepository.findAllByStatusOrderByCreatedAtDesc(DonationStatus.AVAILABLE)
                    .stream()
                    .map(donationMapper::toGetAllResponse)
                    .collect(Collectors.toList());
        }

        GeometryFactory geometryFactory = new GeometryFactory();
        Point userLocation = geometryFactory.createPoint(new Coordinate(userLon, userLat));
        userLocation.setSRID(4326);

        double defaultRadius = radiusInKm != null ? radiusInKm : 10.0;
        double radiusMeters = defaultRadius * 1000.0; // <-- Updated math


        List<FoodDonation> nearbyFood = donationRepository.findNearbyDonations(
                DonationStatus.AVAILABLE, userLocation, radiusMeters);

        DecimalFormat df = new DecimalFormat("#.#");

        return nearbyFood.stream().map(donation -> {
            GetAllDonationsResponse response = donationMapper.toGetAllResponse(donation);

            double distanceInMeters = calculateHaversineDistance(
                    userLat,
                    userLon,
                    donation.getPickupLocation().getY(),
                    donation.getPickupLocation().getX()
            );

            double distanceInKm = distanceInMeters / 1000.0;

            response.setDistance(df.format(distanceInKm) + " km");
            return response;
        }).collect(Collectors.toList());
    }

    @Override
    public FoodDonationResponse getDonationById(UUID id) {
        FoodDonation donation = donationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food donation not found with ID: " + id));

        return donationMapper.toDetailResponse(donation);
    }

    @Override
    public void deleteDonation(User donor, UUID id) {
        FoodDonation donation = donationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food donation not found"));

        if (!donation.getDonor().getId().equals(donor.getId())) {
            throw new RuntimeException("Unauthorized: You can only delete your own food listings");
        }

        donationRepository.delete(donation);
    }


    /**
     * Standard formula to calculate distance over the curve of the Earth.
     * Returns distance in meters.
     */
    private double calculateHaversineDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371000; // Radius of the earth in meters
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}