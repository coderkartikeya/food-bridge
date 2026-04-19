package com.foodbridge.api_spring.services;
import com.foodbridge.api_spring.dto.AuthResponse;
import com.foodbridge.api_spring.model.dto.request.UserCreateRequestDTO;
import com.foodbridge.api_spring.model.dto.request.UserLoginRequestDTO;
import com.foodbridge.api_spring.model.dto.request.UserUpdateRequestDTO;
import com.foodbridge.api_spring.model.dto.response.GetUserDTO;
import com.foodbridge.api_spring.model.dto.response.UserUpdateResponse;
import com.foodbridge.api_spring.model.entity.User;

public interface AuthService {
    AuthResponse registerUser(UserCreateRequestDTO userCreateRequestDTO);
    AuthResponse refreshToken(String refreshToken);

    AuthResponse login(UserLoginRequestDTO userLoginRequestDTO);
    void logout(String refreshToken);

    UserUpdateResponse updateUser(User user, UserUpdateRequestDTO userUpdateRequestDTO);
    void deleteUser(User user);
    GetUserDTO getUser(User user);

}
