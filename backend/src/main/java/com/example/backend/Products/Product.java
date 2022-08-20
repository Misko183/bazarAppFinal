package com.example.backend.Products;

import com.example.backend.Favourite.Favourite;
import com.example.backend.Image.Image;
import com.example.backend.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;
    private String price;
    private String localization;
    private String category;
    private int countClicksOnProduct;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private Image image;

    @ManyToOne
    User user;

    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<Favourite> favourites;


}
