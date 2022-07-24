package com.example.backend.Favourite;

import com.example.backend.Products.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class FavouriteController {

    @Autowired
    private FavouriteRepository favouriteRepository;

    @Autowired
    private FavouriteServiceImpl favouriteService;

    @PostMapping("/favourite")
    public void addFavourite(@RequestBody Favourite favourite) {
        favouriteService.addFavourite(favourite);
    }

    @GetMapping("/favourite")
    public ArrayList<Product> getUsersFavourite() {
        return favouriteService.getMeFavourite();
    }


}
