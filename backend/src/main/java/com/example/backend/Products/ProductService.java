package com.example.backend.Products;

import java.util.List;

public interface ProductService {

    void addProduct(Product product);

    void getProduct(Product product);

    void getAllProducts();

    void deleteProduct(Product product);

    void getByCategory(String category);

}
