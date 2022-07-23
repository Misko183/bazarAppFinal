package com.example.backend.Favourite;

import com.example.backend.Products.Product;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;

public interface FavouriteService {
     void addFavourite(Favourite favourite);
     ArrayList<Product> showFavouriteProducts();

     void removeFavourite(Favourite favourite);
     boolean isFavourite(Favourite favourite);
}
