package com.exampleTest1.demo.cart;

import com.exampleTest1.demo.common.CurrentUserUtil;
import com.exampleTest1.demo.product.ProductRepository;
import com.exampleTest1.demo.user.User;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CartService {
  private final CartRepository cartRepo;
  private final ProductRepository productRepo;
  private final CurrentUserUtil currentUser;

  public CartService(CartRepository cartRepo, ProductRepository productRepo, CurrentUserUtil cu) {
    this.cartRepo = cartRepo; this.productRepo = productRepo; this.currentUser = cu;
  }

  public List<CartItem> listMine() {
    User u = currentUser.requireUser();
    return cartRepo.findByUser(u);
  }

  public CartItem addOrIncrement(Long productId, int quantity) {
    if (quantity <= 0) quantity = 1;
    var u = currentUser.requireUser();
    var p = productRepo.findById(productId).orElseThrow();
    var existing = cartRepo.findByUserAndProduct(u, p).orElse(null);
    if (existing == null) {
      var item = new CartItem();
      item.setUser(u); item.setProduct(p); item.setQuantity(quantity);
      return cartRepo.save(item);
    } else {
      existing.setQuantity(existing.getQuantity() + quantity);
      return cartRepo.save(existing);
    }
  }

  public CartItem setQuantity(Long productId, int quantity) {
    var u = currentUser.requireUser();
    var p = productRepo.findById(productId).orElseThrow();
    var item = cartRepo.findByUserAndProduct(u, p).orElseThrow();
    item.setQuantity(Math.max(1, quantity));
    return cartRepo.save(item);
  }

  public void remove(Long productId) {
    var u = currentUser.requireUser();
    var p = productRepo.findById(productId).orElseThrow();
    cartRepo.deleteByUserAndProduct(u, p);
  }

  public void clear() {
    var u = currentUser.requireUser();
    cartRepo.deleteByUser(u);
  }

  public BigDecimal total() {
    return listMine().stream()
        .map(ci -> ci.getProduct().getPrice().multiply(BigDecimal.valueOf(ci.getQuantity())))
        .reduce(BigDecimal.ZERO, BigDecimal::add);
  }
}
