package com.exampleTest1.demo.order;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
  private final OrderService service;
  public OrderController(OrderService service) { this.service = service; }

  @PostMapping("/checkout")
  public Order checkout(@RequestBody CheckoutRequest req) {
    return service.checkout(req.shippingAddress(), req.paymentMethod());
  }
}
