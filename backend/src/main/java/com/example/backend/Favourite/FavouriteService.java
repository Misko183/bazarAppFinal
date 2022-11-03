package com.example.backend.Favourite;

import com.example.backend.proSecurity.user.CurrentUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

public interface FavouriteService {
     void addFavourite(Favourite favourite, @AuthenticationPrincipal CurrentUser currentUser);

     void removeFavourite(Favourite favourite);

}
