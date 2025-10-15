package com.exampleTest1.demo.favorite;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {
  private final FavoriteService service;
  public FavoriteController(FavoriteService service) { this.service = service; }

  @GetMapping public Object list() { return service.listMine(); }
  @PostMapping("/{productId}") public Object add(@PathVariable Long productId) { return service.add(productId); }
  @DeleteMapping("/{productId}") public ResponseEntity<?> remove(@PathVariable Long productId) {
    service.remove(productId); return ResponseEntity.noContent().build();
  }
}
