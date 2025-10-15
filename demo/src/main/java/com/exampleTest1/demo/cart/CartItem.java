package com.exampleTest1.demo.cart;

import com.exampleTest1.demo.product.Product;
import com.exampleTest1.demo.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"user_id","product_id"}))
public class CartItem {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false) private User user;
  @ManyToOne(optional = false) private Product product;

  @Column(nullable = false)
  private int quantity = 1;
}
