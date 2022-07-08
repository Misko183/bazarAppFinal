package com.example.backend.Products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void addProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public void getProduct(Product product) {
        productRepository.findByName(product.getName());
    }

    @Override
    public void getAllProducts() {
        productRepository.findAll();
    }

    @Override
    public void deleteProduct(Product product) {
        productRepository.delete(product);
    }

    @Override
    public List<Product> getOnlyVehicles() {
        return productRepository.findByCategory("Vehicles");
    }

    public List<Product> getByCategory(String category) {
        return productRepository.findByCategory(category);
    }
}
