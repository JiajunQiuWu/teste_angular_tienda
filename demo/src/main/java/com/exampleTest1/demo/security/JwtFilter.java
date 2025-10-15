package com.exampleTest1.demo.security;

import com.exampleTest1.demo.user.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;
  private final UserRepository userRepo;

  public JwtFilter(JwtUtil jwtUtil, UserRepository userRepo) {
    this.jwtUtil = jwtUtil;
    this.userRepo = userRepo;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
      throws ServletException, IOException {
    String header = req.getHeader(HttpHeaders.AUTHORIZATION);
    if (header != null && header.startsWith("Bearer ")) {
      String token = header.substring(7);
      try {
        var jws = jwtUtil.parse(token);
        String email = jws.getBody().getSubject();
        String role = (String) jws.getBody().get("role");
        var user = userRepo.findByEmail(email).orElse(null);
        if (user != null) {
          List<GrantedAuthority> auths = List.of(new SimpleGrantedAuthority("ROLE_" + role));
          var auth = new UsernamePasswordAuthenticationToken(email, null, auths);
          SecurityContextHolder.getContext().setAuthentication(auth);
        }
      } catch (Exception ignored) { }
    }
    chain.doFilter(req, res);
  }
}
