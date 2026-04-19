package com.foodbridge.api_spring.controllers;

import com.foodbridge.api_spring.model.dto.request.UserUpdateRequestDTO;
import com.foodbridge.api_spring.model.dto.response.ApiResponse;
import com.foodbridge.api_spring.model.dto.response.GetUserDTO;
import com.foodbridge.api_spring.model.entity.User;
import com.foodbridge.api_spring.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final AuthService authService;
    @GetMapping("/test")
    public String test(Authentication auth) {
        return auth.getAuthorities().toString();
    }
    @GetMapping
    public ResponseEntity<ApiResponse<GetUserDTO>> getUser(@AuthenticationPrincipal User currentUser, HttpServletRequest request){
        return ResponseEntity.ok(
                new ApiResponse<>(
                        authService.getUser(currentUser),
                        request.getRequestURI(),
                        "This is the current User Data"
                )
        );
    }
    @PutMapping
    public ResponseEntity<String> updateMyProfile(
            @AuthenticationPrincipal User currentUser,
            @RequestBody UserUpdateRequestDTO request
    ) {
        authService.updateUser(currentUser, request);
        return ResponseEntity.ok("Profile updated successfully");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteMyAccount(
            @AuthenticationPrincipal User currentUser
    ) {
        authService.deleteUser(currentUser);
        return ResponseEntity.ok("Account deleted successfully");
    }
}
