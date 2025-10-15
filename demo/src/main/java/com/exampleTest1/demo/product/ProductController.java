package com.exampleTest1.demo.product;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
  private final ProductService service;
  public ProductController(ProductService service) { this.service = service; }

  // Público
  @GetMapping public List<Product> all() { return service.findAll(); }
  @GetMapping("/{id}") public Product one(@PathVariable Long id) { return service.findById(id); }

  // ADMIN
  @PostMapping("/admin") public Product create(@RequestBody Product p) { return service.save(p); }
  @PutMapping("/admin/{id}") public Product update(@PathVariable Long id, @RequestBody Product p) {
    p.setId(id); return service.save(p);
  }
  @DeleteMapping("/admin/{id}") public ResponseEntity<?> delete(@PathVariable Long id) {
    service.delete(id); return ResponseEntity.noContent().build();
  }
}
