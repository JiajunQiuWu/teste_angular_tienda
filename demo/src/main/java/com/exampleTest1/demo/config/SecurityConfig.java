package com.exampleTest1.demo.config;

import com.exampleTest1.demo.security.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

  private final JwtFilter jwtFilter;
  public SecurityConfig(JwtFilter jwtFilter) { this.jwtFilter = jwtFilter; }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
            .requestMatchers("/h2-console/**").permitAll()
            .requestMatchers("/api/products/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated()
        )
        .headers(h -> h.frameOptions(f -> f.disable())) // para H2 console
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }
}
