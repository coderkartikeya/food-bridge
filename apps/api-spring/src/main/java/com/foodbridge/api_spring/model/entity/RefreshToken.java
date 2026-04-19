package com.foodbridge.api_spring.model.entity;

import jakarta.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.time.Instant;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@RedisHash("refresh_tokens")
public class RefreshToken {
    @Id
    private String token;

    private String userEmail;

    @TimeToLive
    private Long expiration;
}
