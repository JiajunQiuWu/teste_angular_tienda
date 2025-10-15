package com.exampleTest1.demo.favorite;

import com.exampleTest1.demo.common.CurrentUserUtil;
import com.exampleTest1.demo.product.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FavoriteService {
  private final FavoriteRepository repo;
  private final ProductRepository productRepo;
  private final CurrentUserUtil currentUser;

  public FavoriteService(FavoriteRepository repo, ProductRepository productRepo, CurrentUserUtil cu) {
    this.repo = repo; this.productRepo = productRepo; this.currentUser = cu;
  }

  public List<FavoriteItem> listMine() {
    var u = currentUser.requireUser();
    return repo.findByUser(u);
  }

  public FavoriteItem add(Long productId) {
    var u = currentUser.requireUser();
    if (repo.existsByUserIdAndProductId(u.getId(), productId))
      throw new RuntimeException("Ya está en favoritos");
    var fi = new FavoriteItem();
    fi.setUser(u);
    fi.setProduct(productRepo.findById(productId).orElseThrow());
    return repo.save(fi);
  }

  public void remove(Long productId) {
    var u = currentUser.requireUser();
    repo.deleteByUserAndProductId(u, productId);
  }
}
