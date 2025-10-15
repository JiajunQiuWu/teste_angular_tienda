package com.exampleTest1.demo.cart;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

  private final CartService service;
  public CartController(CartService service) { this.service = service; }

  @GetMapping public Object list() { return service.listMine(); }

  @PostMapping("/add/{productId}")
  public Object add(@PathVariable Long productId, @RequestParam(defaultValue="1") int qty) {
    return service.addOrIncrement(productId, qty);
  }

  @PutMapping("/set/{productId}")
  public Object setQty(@PathVariable Long productId, @RequestParam int qty) {
    return service.setQuantity(productId, qty);
  }

  @DeleteMapping("/remove/{productId}")
  public ResponseEntity<?> remove(@PathVariable Long productId) {
    service.remove(productId); return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/clear")
  public ResponseEntity<?> clear() {
    service.clear(); return ResponseEntity.noContent().build();
  }

  @GetMapping("/total")
  public Map<String,Object> total() {
    return Map.of("total", service.total());
  }
}
