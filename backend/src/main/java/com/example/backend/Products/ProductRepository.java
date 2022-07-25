package com.example.backend.Products;

import com.example.backend.User.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {

    List<Product> findByCategory(String vehicles);

    List<Product> findByUser(User user);

   // Optional<Product> findById(Long id);

    Optional<Product> findById(Long id);

}
