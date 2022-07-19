package com.example.backend.Products;

import com.example.backend.User.User;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
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

    @GetMapping("/advertisement")
    public List<Product> getAllProduct() {
        return (List<Product>) productRepository.findAll();
    }

    @PostMapping("/advertisement")
    public void addProduct(@RequestBody Product product) {
        productService.addProduct(product);

    }

//    @GetMapping("/tovar/vehicles")
//    public List<Product> getOnlyVehicles() {
//        return productService.getOnlyVehicles();
//    }

    @PostMapping("/category")
    public void showCategory(@RequestBody String category){
           productService.getByCategory(category);

    }

    @GetMapping("/advertisement/category")
    public List<Product> showOnlyOneCategory(){
        return productService.getCurrentCategory();
    }

    //skušobna z doplnením
//    @GetMapping("/inzeraty/categoryy")
//    public List<Product> showOnlyMe(){
//       return productService.getOnlyMe("aa");
//    }


    @GetMapping("/myproducts")
    public List<Product> showOnlyMe(){
        return productService.getOnlyUsersProducts();
    }

//    @PostMapping("/myproducts")
//    public void postMeUser(@RequestBody User user){
//       productService.getOnlyUsersProducts(user);
//    }


}
