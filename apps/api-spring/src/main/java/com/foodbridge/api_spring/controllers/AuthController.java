package com.foodbridge.api_spring.controllers;


import com.foodbridge.api_spring.model.dto.request.UserLoginRequestDTO;
import com.foodbridge.api_spring.model.dto.response.ApiResponse;
import com.foodbridge.api_spring.model.dto.response.AuthResponse;
import com.foodbridge.api_spring.services.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.foodbridge.api_spring.model.dto.request.UserCreateRequestDTO;
import org.springframework.web.bind.annotation.CookieValue;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody UserCreateRequestDTO userCreateRequestDTO,
            HttpServletResponse response,
            HttpServletRequest request

    ) {
        AuthResponse authResponse = authService.registerUser(userCreateRequestDTO);
        Cookie cookie = new Cookie("refresh_token", authResponse.getRefreshToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/api/v1/auth/refresh");
        cookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(cookie);
        return ResponseEntity.ok(new ApiResponse<>(
                authResponse,
                request.getRequestURI(),
                "User is created Successfully"
        ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(
            @CookieValue(name = "refresh_token", required = false) String refreshToken,
            HttpServletRequest request
    ) {
        if (refreshToken == null) {
            return ResponseEntity.status(401).body(new ApiResponse<>(AuthResponse.builder()
                    .accessToken(null)
                            .refreshToken(null)
                    .build()
                    , "",
                    request.getRequestURI()
            ));
        }

        AuthResponse authData = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        authData,
                        request.getRequestURI(),
                        "Refresh Token generated Successfully"
                )
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(
            @CookieValue(name = "refresh_token", required = false) String refreshToken,
            HttpServletResponse response,
            HttpServletRequest request
    ) {
        if (refreshToken != null) {
            authService.logout(refreshToken);
        }
        Cookie cookie = new Cookie("refresh_token", null);
        cookie.setMaxAge(0);
        cookie.setPath("/api/v1/auth/refresh");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        return ResponseEntity.ok(new ApiResponse<>(
                "Logged out successfully",
                request.getRequestURI(),
                ""
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody UserLoginRequestDTO userLoginRequestDTO,
            HttpServletResponse response,
            HttpServletRequest request
    ) {
        try {
            AuthResponse authData = authService.login(userLoginRequestDTO);

            Cookie cookie = new Cookie("refresh_token", authData.getRefreshToken());
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/api/v1/auth/refresh");
            cookie.setMaxAge(7 * 24 * 60 * 60);

            response.addCookie(cookie);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            authData,
                            request.getRequestURI(),
                            "Login Successfully"
                    )
            );
        } catch (BadCredentialsException badCredentialsException) {
            throw badCredentialsException;
        }
    }
}