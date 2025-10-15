package com.exampleTest1.demo.common;

import com.exampleTest1.demo.user.User;
import com.exampleTest1.demo.user.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CurrentUserUtil {
  private final UserRepository userRepo;
  public CurrentUserUtil(UserRepository userRepo) { this.userRepo = userRepo; }

  public User requireUser() {
    var auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth == null || auth.getName() == null) throw new RuntimeException("No autenticado");
    return userRepo.findByEmail(auth.getName()).orElseThrow();
  }
}
