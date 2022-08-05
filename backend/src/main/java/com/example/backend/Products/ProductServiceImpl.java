package com.example.backend.Products;

import com.example.backend.Favourite.Favourite;
import com.example.backend.Favourite.FavouriteRepository;
import com.example.backend.Favourite.FavouriteService;
import com.example.backend.Favourite.FavouriteServiceImpl;
import com.example.backend.Image.ImageController;
import com.example.backend.Image.ImageRepository;
import com.example.backend.User.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;


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

    @Autowired
    private FavouriteServiceImpl favouriteService;

    @Autowired
    private FavouriteRepository favouriteRepository;


    //Pridavanie Inzeratu
    @Override
    public void addProduct(Product product) {

    //Vyhladanie posledného obrázku, a priraďovanie k produktu onetoone
    //Následné vytvorenie produktu s obrázkom
        Long image = imageRepository.findTopByOrderByIdDesc().get().getId();
        product.setImage(imageRepository.findById(image).get());
        product.setUser(userService.getLoggedUser());
        product.setPrice(product.getPrice().toLowerCase(Locale.ROOT));
        if(product.getPrice().contains("€") || product.getPrice().contains("$") || product.getPrice().contains("£") || product.getPrice().contains("dohodou")){
            productRepository.save(product);
        }
        else{
            product.setPrice(product.getPrice()+ "€");
            productRepository.save(product);
        }


    }

    //Vymazanie Inzeratu
    @Override
    public void deleteProduct(Product product) {
        productRepository.delete(product);
    }

    //Aktualizácia Inzeratu
    @Override
    public void updateProduct(Product product) {
       Product myProduct = productRepository.findById(product.getId()).get();
        myProduct.setCountClicksOnProduct(myProduct.getCountClicksOnProduct() + 1);
        productRepository.save(myProduct);
    }


    public List<Product> getCurrentCategory() {
        return currentCategory;
    }

    public void setCurrentCategory(List<Product> currentCategory) {
        this.currentCategory = currentCategory;
    }

    List<Product> currentCategory;

    //Vrátenie Inzeratu podla kategórie
    @Override
    public void getByCategory(String category) {
       setCurrentCategory(productRepository.findByCategory(category));
    }

    //Vrátenie iba používateľských inzerátov
    @Override
    public List<Product> getOnlyUsersProducts() {
     return productRepository.findByUser(userService.getLoggedUser());
    }

}
