package com.example.backend.Favourite;

public interface FavouriteService {
    public void addFavourite(Favourite favourite);
    public void removeFavourite(Favourite favourite);
    public boolean isFavourite(Favourite favourite);
}
