package com.example.backend.proSecurity.rest;

import com.example.backend.Favourite.FavouriteRepository;
import com.example.backend.Image.ImageRepository;
import com.example.backend.Products.Product;
import com.example.backend.Products.ProductRepository;
import com.example.backend.proSecurity.configuration.AppConfig;
import com.example.backend.proSecurity.user.CurrentUser;
import com.example.backend.proSecurity.user.CurrentUserService;
import com.example.backend.proSecurity.user.UserEntity;
import com.example.backend.proSecurity.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public CurrentUserService currentUserService;

    @Autowired
    public FavouriteRepository favouriteRepository;

    @Autowired
    public ProductRepository productRepository;

    @Autowired
    public ImageRepository imageRepository;

    @Autowired
    public AppConfig config;

    @GetMapping("/user")
    public void getUser() {
    }

    @GetMapping("/users")
    public List<UserEntity> getUser1() {
        return (List<UserEntity>) userRepository.findAll();
    }

    @PostMapping("/deleteuser")
    public void deleteUser(@RequestBody UserEntity user){
        List<Product> products = productRepository.findByUserEntity(user);

        for (Product product : products) {
            favouriteRepository.deleteAll(favouriteRepository.findAllByProduct(product));
        }
        if (favouriteRepository.findByUserEntity(user) != null && productRepository.findByUserEntity(user) != null) {
            favouriteRepository.deleteAll(favouriteRepository.findByUserEntity(user));
            productRepository.deleteAll(productRepository.findByUserEntity(user));
            currentUserService.deleteUser(user);
        }
        else if(favouriteRepository.findByUserEntity(user) != null && productRepository.findByUserEntity(user) == null){
            favouriteRepository.deleteAll(favouriteRepository.findByUserEntity(user));
            currentUserService.deleteUser(user);
        }
        else if(productRepository.findByUserEntity(user) != null && favouriteRepository.findByUserEntity(user) == null){
            productRepository.deleteAll(productRepository.findByUserEntity(user));
            currentUserService.deleteUser(user);
        }
        else{
            currentUserService.deleteUser(user);
        }


    }

    @GetMapping("/infoAboutUser")
    public UserEntity getRole(@AuthenticationPrincipal CurrentUser currentUser) {
//        UserEntity userEntity = userRepository.findByUsername(currentUser.getUsername());
//        userEntity.setUsername(userEntity.getUsername());
//        userEntity.setPassword(config.passwordEncoder().encode(userEntity.getPassword()));
//        userEntity.setPhone(userEntity.getPhone());
//        userEntity.setAddress(userEntity.getAddress());
//        userEntity.setEmail(userEntity.getEmail());
//        userEntity.setAuthority(userEntity.getAuthority());
        return userRepository.findByUsername(currentUser.getUsername());

    }

    @PostMapping("/edituser")
    public void editUser(@RequestBody UserEntity user){
        user.setPassword(config.passwordEncoder().encode(user.getPassword()));
        userRepository.save(user);
    }
}
