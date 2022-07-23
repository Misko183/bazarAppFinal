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

    public List<Favourite> getFavourites() {
        return favourites;
    }

    public void setFavourites(List<Favourite> favourites) {
        this.favourites = favourites;
    }

    private List<Favourite> favourites;

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    private List<Product> products;


    public List<Long> getIds() {
        return ids;
    }

    public void setIds(List<Long> ids) {
        this.ids = ids;
    }

    private List<Long> ids;



    ArrayList<Long> idList = new ArrayList<>();

    public ArrayList<Product> getProductList() {
        return productList;
    }

    public void setProductList(ArrayList<Product> productList) {
        this.productList = productList;
    }

    ArrayList<Product> productList = new ArrayList<>();


    public long getWhoIsLoggedIn() {
        return whoIsLoggedIn;
    }

    public void setWhoIsLoggedIn(long whoIsLoggedIn) {
        this.whoIsLoggedIn = whoIsLoggedIn;
    }

    private long whoIsLoggedIn;


    @Override
    public void addFavourite(Favourite favourite) {
        System.out.println(favourite.getProduct().getId());
       // favourite.setProduct(productRepository.findById(3L).get());
        favourite.setUser(userService.getLoggedUser());
        favouriteRepository.save(favourite);


        if(getFavourites() == null) {

            setFavourites(favouriteRepository.findByUser(favourite.getUser()));

        }
        else {
            getProductList().clear();
            getFavourites().clear();
            setFavourites(favouriteRepository.findByUser(favourite.getUser()));
        }


          //  favourites.clear();
          // delete product list

        //    setFavourites(favouriteRepository.findByUser(favourite.getUser()));




        for (Favourite f : favourites) {
            setIds(Collections.singletonList(f.getProduct().getId()));
             productList.add(productRepository.findById(f.getProduct().getId()).get());
        }

        System.out.print(productList);

    }

    @Override
    public ArrayList<Product> showFavouriteProducts(){


        return productList;
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
