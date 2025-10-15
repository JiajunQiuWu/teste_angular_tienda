package com.exampleTest1.demo.auth;

import com.exampleTest1.demo.security.JwtUtil;
import com.exampleTest1.demo.user.Role;
import com.exampleTest1.demo.user.User;
import com.exampleTest1.demo.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final UserRepository userRepo;
  private final JwtUtil jwtUtil;
  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

  public AuthController(UserRepository userRepo, JwtUtil jwtUtil) {
    this.userRepo = userRepo;
    this.jwtUtil = jwtUtil;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
    if (userRepo.existsByEmail(req.email())) return ResponseEntity.badRequest().body("Email usado");
    var user = new User();
    user.setEmail(req.email());
    user.setPassword(encoder.encode(req.password()));
    user.setUsername(req.username());
    user.setRole(Role.USER);
    userRepo.save(user);
    var token = jwtUtil.generateToken(user.getEmail(), user.getRole());
    return ResponseEntity.ok(new AuthResponse(token, user.getEmail(), user.getRole()));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest req) {
    var user = userRepo.findByEmail(req.email()).orElse(null);
    if (user == null) return ResponseEntity.status(401).body("Credenciales inválidas");
    if (!encoder.matches(req.password(), user.getPassword()))
      return ResponseEntity.status(401).body("Credenciales inválidas");
    var token = jwtUtil.generateToken(user.getEmail(), user.getRole());
    return ResponseEntity.ok(new AuthResponse(token, user.getEmail(), user.getRole()));
  }
}
