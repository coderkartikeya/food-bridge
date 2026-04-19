package com.foodbridge.api_spring.repository.jpa;

import com.foodbridge.api_spring.model.dto.response.GetAllDonationsResponse;
import com.foodbridge.api_spring.model.entity.FoodDonation;
import com.foodbridge.api_spring.model.enums.DonationStatus;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.lang.management.GarbageCollectorMXBean;
import java.util.List;
import java.util.UUID;

@Repository
public interface FoodDonationRepository extends JpaRepository<FoodDonation, UUID> {
    List<FoodDonation> findAllByStatusOrderByCreatedAtDesc(DonationStatus status);

    @Query("SELECT d FROM FoodDonation d WHERE d.status = :status AND distance(d.pickupLocation, :userLoc) < :radiusMeters ORDER BY distance(d.pickupLocation, :userLoc) ASC")
    List<FoodDonation> findNearbyDonations(
            @Param("status") DonationStatus status,
            @Param("userLoc") Point userLoc,
            @Param("radiusMeters") double radiusMeters
    );
}
