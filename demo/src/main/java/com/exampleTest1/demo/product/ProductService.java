package com.exampleTest1.demo.product;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
  private final ProductRepository repo;
  public ProductService(ProductRepository repo) { this.repo = repo; }

  public List<Product> findAll() { return repo.findAll(); }
  public Product findById(Long id) { return repo.findById(id).orElseThrow(); }
  public Product save(Product p) { return repo.save(p); }
  public void delete(Long id) { repo.deleteById(id); }
}
