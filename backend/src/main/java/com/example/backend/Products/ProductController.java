package com.example.backend.Products;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@NoArgsConstructor
public class ProductController {

    @Autowired
    private ProductServiceImpl productService;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/tovar")
    public List<Product> getAllProduct() {
        return (List<Product>) productRepository.findAll();
    }

    @PostMapping("/tovar")
    public void addProduct(@RequestBody Product product) {
        productService.addProduct(product);
    }

    @GetMapping("/tovar/vehicles")
    public List<Product> getOnlyVehicles() {
        return productService.getOnlyVehicles();
    }
}
