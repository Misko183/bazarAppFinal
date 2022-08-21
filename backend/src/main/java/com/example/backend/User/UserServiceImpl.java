package com.example.backend.User;

import com.example.backend.Favourite.FavouriteRepository;
import com.example.backend.Products.ProductRepository;
import com.example.backend.Products.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private FavouriteRepository favouriteRepository;

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }


    public boolean isMessegeAboutUser() {
        return messegeAboutUser;
    }

    public void setMessegeAboutUser(boolean messegeAboutUser) {
        this.messegeAboutUser = messegeAboutUser;
    }

    boolean messegeAboutUser;

    //Vytvaranie použivateľa s rolou USER
    @Override
    public void addUser(User user) {
    //String encodedPassword = passwordEncoder.encode(user.getPassword());
    //user.setPassword(encodedPassword);

        if (repository.findByUserName(user.getUserName()).isPresent()) {
            setMessegeAboutUser(false);
        }
        else {
            user.setRoles("USER");
            repository.save(user);
            setMessegeAboutUser(true);
        }
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return this.repository.findByUserName(username);
    }

    @Override
    public User updateUser(User user) {
        return this.repository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        this.favouriteRepository.deleteAll(favouriteRepository.findByUser(user));
        this.productRepository.deleteAll(productRepository.findByUser(user));
        this.repository.delete(user);

    }

    public User getLoggedUser() {
        return loggedUser;
    }

    public void setLoggedUser(User loggedUser) {
        this.loggedUser = loggedUser;
    }

    User loggedUser;

    //Hľadanie používateľa podľa mena a hesla a násldne uloženie do loggedUser
    @Override
    public void findLoggedUsers(String username, String password) {
       setLoggedUser(this.repository.findByUserNameAndPassword(username,password).get());
    }

    @Override
    public void editUser(User user) {
        this.repository.save(user);
    }


}

