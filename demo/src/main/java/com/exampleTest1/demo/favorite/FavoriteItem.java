package com.exampleTest1.demo.favorite;

import com.exampleTest1.demo.product.Product;
import com.exampleTest1.demo.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"user_id","product_id"}))
public class FavoriteItem {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false) private User user;
  @ManyToOne(optional = false) private Product product;
}
