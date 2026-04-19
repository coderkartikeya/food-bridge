package com.foodbridge.api_spring.repository.redis;

import com.foodbridge.api_spring.model.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedisRepository extends CrudRepository<RefreshToken,String> {
}
