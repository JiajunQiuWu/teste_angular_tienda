package com.exampleTest1.demo.order;

import com.exampleTest1.demo.cart.CartRepository;
import com.exampleTest1.demo.common.CurrentUserUtil;
import com.exampleTest1.demo.product.Product;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class OrderService {
  private final OrderRepository orderRepo;
  private final CartRepository cartRepo;
  private final CurrentUserUtil currentUser;

  public OrderService(OrderRepository orderRepo, CartRepository cartRepo, CurrentUserUtil cu) {
    this.orderRepo = orderRepo; this.cartRepo = cartRepo; this.currentUser = cu;
  }

  public Order checkout(String shippingAddress, String paymentMethod) {
    var u = currentUser.requireUser();
    var cartItems = cartRepo.findByUser(u);
    if (cartItems.isEmpty()) throw new RuntimeException("Carrito vacío");

    var order = new Order();
    order.setUser(u);
    order.setShippingAddress(shippingAddress);
    order.setPaymentMethod(paymentMethod);

    BigDecimal total = BigDecimal.ZERO;
    for (var ci : cartItems) {
      var oi = new OrderItem();
      oi.setOrder(order);
      Product p = ci.getProduct();
      oi.setProduct(p);
      oi.setQuantity(ci.getQuantity());
      oi.setPrice(p.getPrice());
      order.getItems().add(oi);
      total = total.add(p.getPrice().multiply(BigDecimal.valueOf(ci.getQuantity())));
    }
    order.setTotal(total);
    var saved = orderRepo.save(order);

    cartRepo.deleteByUser(u);
    return saved;
  }
}
