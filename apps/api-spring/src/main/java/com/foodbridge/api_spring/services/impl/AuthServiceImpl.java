package com.foodbridge.api_spring.services.impl;

import com.foodbridge.api_spring.dto.AuthResponse;
import com.foodbridge.api_spring.mapper.UserMapper;
import com.foodbridge.api_spring.model.dto.request.UserCreateRequestDTO;
import com.foodbridge.api_spring.model.dto.request.UserLoginRequestDTO;
import com.foodbridge.api_spring.model.dto.request.UserUpdateRequestDTO;
import com.foodbridge.api_spring.model.dto.response.GetUserDTO;
import com.foodbridge.api_spring.model.dto.response.UserUpdateResponse;
import com.foodbridge.api_spring.model.entity.RefreshToken;
import com.foodbridge.api_spring.model.entity.User;
import com.foodbridge.api_spring.model.enums.Roles;
import com.foodbridge.api_spring.repository.redis.RedisRepository;
import com.foodbridge.api_spring.repository.jpa.UserRepository;
import com.foodbridge.api_spring.security.JwtService;
import com.foodbridge.api_spring.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RedisRepository redisRepository;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public AuthResponse registerUser(UserCreateRequestDTO request) {
        GeometryFactory geometryFactory = new GeometryFactory();
        Point location = geometryFactory.createPoint(new Coordinate(request.getLongitude(), request.getLatitude()));
        location.setSRID(4326);


        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRoles(Roles.valueOf(request.getRole().toUpperCase()));
        user.setPhoneNumber(request.getPhoneNumber());
        user.setLocation(location);
        user.setActive(true);
        user.setVerified(false);
        user.setDeleted(false);

        userRepository.saveAndFlush(user);
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        RefreshToken redisRefreshToken = RefreshToken.builder()
                .token(refreshToken)
                .userEmail(user.getEmail())
                .expiration(604800L)
                .build();
        redisRepository.save(redisRefreshToken);
        return new AuthResponse(accessToken,refreshToken);
    }

    @Override
    public AuthResponse refreshToken(String refreshToken) {
        redisRepository.findById(refreshToken)
                .orElseThrow(()->new RuntimeException("refreshToken is Invalid"));

        String userEmail = jwtService.extractUsername(refreshToken);

        if(userEmail!=null){
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(()-> new RuntimeException("user not found Exception"));
            if(jwtService.isTokenValid(refreshToken,user)){
                String newAccessToken = jwtService.generateAccessToken(user);
                return new AuthResponse(newAccessToken,refreshToken);
            }
        }
        throw new RuntimeException("Invalid Refresh Token");
    }

    @Override
    public void logout(String refreshToken) {
        if (refreshToken != null) {
            redisRepository.deleteById(refreshToken);
        }
    }

    @Override
    @Transactional
    public UserUpdateResponse updateUser(User user,UserUpdateRequestDTO userUpdateRequestDTO) {
        if (userUpdateRequestDTO.getName() != null) user.setName(userUpdateRequestDTO.getName());
        if (userUpdateRequestDTO.getPhoneNumber() != null) user.setPhoneNumber(userUpdateRequestDTO.getPhoneNumber());

        if (userUpdateRequestDTO.getLatitude() != null && userUpdateRequestDTO.getLongitude() != null) {
            GeometryFactory geometryFactory = new GeometryFactory();
            Point location = geometryFactory.createPoint(new Coordinate(userUpdateRequestDTO.getLongitude(), userUpdateRequestDTO.getLatitude()));
            location.setSRID(4326);
            user.setLocation(location);
        }

        return userMapper
                .toUpdateResponse((userRepository.saveAndFlush(user)));
    }

    @Override
    @Transactional
    public void deleteUser(User user) {
        user.setActive(false);
        user.setDeleted(true);
        userRepository.saveAndFlush(user);
    }

    @Override
    public GetUserDTO getUser(User user) {
        return userMapper.toGetUserDTO(user);
    }

    @Override
    public AuthResponse login(UserLoginRequestDTO userLoginRequestDTO){
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userLoginRequestDTO.getEmail(),
                        userLoginRequestDTO.getPassword()
                )
        );
        User user = (User) authentication.getPrincipal();
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        RefreshToken redisToken = RefreshToken.builder()
                .token(refreshToken)
                .userEmail(user.getEmail())
                .expiration(604800L)
                .build();
        redisRepository.save(redisToken);

        return new AuthResponse(accessToken, refreshToken);
    }

}
