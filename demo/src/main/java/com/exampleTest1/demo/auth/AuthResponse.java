package com.exampleTest1.demo.auth;

import com.exampleTest1.demo.user.Role;

public record AuthResponse(String token, String email, Role role) {}
