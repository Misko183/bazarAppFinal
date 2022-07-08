package com.example.backend.Favourite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavouriteServiceImpl implements FavouriteService {

    @Autowired
    private FavouriteRepository favouriteRepository;

    @Override
    public void addFavourite(Favourite favourite) {
        favouriteRepository.save(favourite);
    }

    @Override
    public void removeFavourite(Favourite favourite) {
        favouriteRepository.delete(favourite);
    }

    @Override
    public boolean isFavourite(Favourite favourite) {
        return false;
    }
}
