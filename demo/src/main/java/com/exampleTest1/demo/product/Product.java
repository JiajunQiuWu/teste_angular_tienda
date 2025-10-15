package com.exampleTest1.demo.product;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Product {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  private String category;

  @Column(length = 2000)
  private String description;

  @Column(nullable = false, scale = 2)
  private BigDecimal price;

  private String imageUrl;

  private boolean active = true;
}
