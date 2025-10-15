package com.exampleTest1.demo.favorite;

import com.exampleTest1.demo.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FavoriteRepository extends JpaRepository<FavoriteItem, Long> {
  List<FavoriteItem> findByUser(User user);
  void deleteByUserAndProductId(User user, Long productId);
  boolean existsByUserIdAndProductId(Long userId, Long productId);
}
