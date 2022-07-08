package com.example.backend.Products;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {

    Product findByName(String name);

    List<Product> findByCategory(String vehicles);

}
