package com.example.backend.Favourite;

import com.example.backend.Products.Product;
import com.example.backend.Products.ProductRepository;
import com.example.backend.User.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class FavouriteServiceImpl implements FavouriteService {

    @Autowired
    private FavouriteRepository favouriteRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public void addFavourite(Favourite favourite) {
        favourite.setUser(userService.getLoggedUser());
        if (favouriteRepository.findByProductAndUser(favourite.getProduct(), favourite.getUser() ) == null) {
            favouriteRepository.save(favourite);
        }


    }

    public List<Favourite> getFavourites() {
        return favourites;
    }

    public void setFavourites(List<Favourite> favourites) {
        this.favourites = favourites;
    }

    private List<Favourite> favourites;


    public void setIds(List<Long> ids) {
        this.ids = ids;
    }

    private List<Long> ids;


    public ArrayList<Product> getProductList() {
        return productList;
    }

    ArrayList<Product> productList = new ArrayList<>();


    public ArrayList<Product> getMeFavourite() {

        if (getFavourites() == null) {

            setFavourites(favouriteRepository.findByUser(userService.getLoggedUser()));

        } else {
            getProductList().clear();
            getFavourites().clear();
            setFavourites(favouriteRepository.findByUser(userService.getLoggedUser()));
        }

        for (Favourite f : favourites) {
            setIds(Collections.singletonList(f.getProduct().getId()));
            productList.add(productRepository.findById(f.getProduct().getId()).get());
        }

        return productList;
    }

    @Override
    public void removeFavourite(Favourite favourite) {
        favouriteRepository.delete(favouriteRepository.findByProductAndUser(favourite.getProduct(), userService.getLoggedUser()));
    }
}
