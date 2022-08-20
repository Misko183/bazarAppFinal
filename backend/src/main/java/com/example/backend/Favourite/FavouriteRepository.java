package com.example.backend.Favourite;

import com.example.backend.Products.Product;
import com.example.backend.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteRepository extends CrudRepository<Favourite, Long> {

    List<Favourite> findByUser(User user);

    void deleteAllByProductId(long id);

    Iterable<? extends Favourite> findByProduct(Product product);
}
