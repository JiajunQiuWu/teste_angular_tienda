package com.exampleTest1.demo.order;

import com.exampleTest1.demo.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findByUser(User user);
}
