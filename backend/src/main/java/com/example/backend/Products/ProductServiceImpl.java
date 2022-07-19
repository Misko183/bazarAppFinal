package com.example.backend.Products;

import com.example.backend.Image.Image;
import com.example.backend.Image.ImageController;
import com.example.backend.Image.ImageRepository;
import com.example.backend.User.User;
import com.example.backend.User.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageController imageController;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public void addProduct(Product product) {

    //Vyhladanie posledného obrázku, a priraďovanie k produktu onetoone
    //Následné vytvorenie produktu s obrázkom
        Long image = imageRepository.findTopByOrderByIdDesc().get().getId();
        product.setImage(imageRepository.findById(image).get());
        product.setUser(userService.getLoggedUser());
        productRepository.save(product);

    }


    @Override
    public void deleteProduct(Product product) {
        productRepository.delete(product);
    }


    public List<Product> getCurrentCategory() {
        return currentCategory;
    }

    public void setCurrentCategory(List<Product> currentCategory) {
        this.currentCategory = currentCategory;
    }

    List<Product> currentCategory;

    @Override
    public void getByCategory(String category) {
       setCurrentCategory(productRepository.findByCategory(category));
    }


    public List<Product> getOnlyMyProducts() {
        return onlyMyProducts;
    }

    public void setOnlyMyProducts(List<Product> onlyMyProducts) {
        this.onlyMyProducts = onlyMyProducts;
    }

    List<Product> onlyMyProducts;



    @Override
    public List<Product> getOnlyUsersProducts() {

     return productRepository.findByUser(userService.getLoggedUser());
    }



//    public List<Product> getOnlyMe(String category) {
//        setCurrentCategory(productRepository.findByCategory(category));
//    return getCurrentCategory();
//    }



}
