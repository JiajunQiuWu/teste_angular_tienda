package com.exampleTest1.demo.cart;

import com.exampleTest1.demo.product.Product;
import com.exampleTest1.demo.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface CartRepository extends JpaRepository<CartItem, Long> {
  Optional<CartItem> findByUserAndProduct(User user, Product product);
  List<CartItem> findByUser(User user);
  void deleteByUserAndProduct(User user, Product product);
  void deleteByUser(User user);
}
