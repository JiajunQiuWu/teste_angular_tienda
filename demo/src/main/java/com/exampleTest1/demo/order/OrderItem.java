package com.exampleTest1.demo.order;

import com.exampleTest1.demo.product.Product;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class OrderItem {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false) private Order order;
  @ManyToOne(optional = false) private Product product;

  private int quantity;
  private BigDecimal price;
}
