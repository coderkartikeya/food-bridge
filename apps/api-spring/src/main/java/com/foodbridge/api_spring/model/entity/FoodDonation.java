package com.foodbridge.api_spring.model.entity;

import com.foodbridge.api_spring.model.enums.DonationStatus;
import com.foodbridge.api_spring.model.enums.FoodCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.locationtech.jts.geom.Point;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Basic Entity representing the food donations.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "food_donations")
public class FoodDonation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer quantity;

    @Column(name = "expiry_time", nullable = false)
    private LocalDateTime expiryTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FoodCategory category = FoodCategory.OTHER;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id", nullable = false)
    private User donor;


    @Column(columnDefinition = "geography(Point, 4326)", nullable = false)
    private Point pickupLocation;

    @Column(nullable = false)
    @Builder.Default
    private DonationStatus status = DonationStatus.AVAILABLE;

    @Column(name = "is_deleted")
    private boolean isDeleted = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @CreationTimestamp
    @Column(name = "updated_at", updatable = false)
    private Instant updatedAt;
}