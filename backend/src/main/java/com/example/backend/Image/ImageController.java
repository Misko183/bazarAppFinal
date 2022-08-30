package com.example.backend.Image;

import com.example.backend.Products.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin()
public class ImageController {

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    ProductServiceImpl productService;

    //Primarne vykoná tento post
    @Primary
    @PostMapping("/upload/image")
    public ResponseEntity<ImageUploadResponse> uplaodImage(@RequestParam("image") MultipartFile file)
            throws IOException {

   //Ukladá pomocou compresie obrazok v bytovoj podobe a jeho typ
        imageRepository.save(Image.builder()
                .type(file.getContentType())
                .image(ImageUtility.compressImage(file.getBytes())).build());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ImageUploadResponse("Image uploaded successfully: " +
                        file.getOriginalFilename()));


    }

    //Vypis informacii o obrazku
    @GetMapping(path = {"/get/image/info/{id}"})
    public Image getImageDetails(@PathVariable("id") Long id) throws IOException {

        final Optional<Image> dbImage = imageRepository.findById(id);

        return Image.builder()
                .type(dbImage.get().getType())
                .image(ImageUtility.decompressImage(dbImage.get().getImage())).build();
    }

    //Zobrazenie obrazku podla id, treba aj type
    @GetMapping(path = {"/get/image/{id}"})
    public ResponseEntity<byte[]> getImage(@PathVariable("id") Long id) throws IOException {

    //Hľadanie obrázka podľa id
        final Optional<Image> dbImage = imageRepository.findById(id);

    //Vratenie obrázka pomocou decompresie do pôvodného formátu
        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
    }


    @GetMapping(path = {"/lastID"})
    public Long getLastID() {
        return imageRepository.findTopByOrderByIdDesc().get().getId();
    }


    @GetMapping(path = {"/getallimages"})
    public List<Image> getImageDetails() throws IOException {

        final List<Image> dbImage = imageRepository.findAll();
        final ArrayList<Image> images = new ArrayList<>();
        for (Image image : dbImage) {
            images.add(Image.builder()
                    .type(image.getType())
                    .image(ImageUtility.decompressImage(image.getImage())).build());
        }
//     dbImage.forEach(
//              image -> {
//
//                    Image.builder()
//                            .type(image.getType())
//                            .image(ImageUtility.decompressImage(image.getImage())).build();
//
//                }
//
//        );

     return images;
    }


    @GetMapping(path = {"/getcategoryimages"})
    public List<Image> getCategoryImages() throws IOException {

        final List<Image> dbImage = productService.getCategoryImages();
        final ArrayList<Image> images = new ArrayList<>();
        for (Image image : dbImage) {
            images.add(Image.builder()
                    .type(image.getType())
                    .image(ImageUtility.decompressImage(image.getImage())).build());
        }

        return images;
    }

    @GetMapping(path = {"/getusersproductimages"})
    public List<Image> getUsersproductImages() throws IOException {

        final List<Image> dbImage = productService.getUsersImages();
        final ArrayList<Image> images = new ArrayList<>();
        for (Image image : dbImage) {
            images.add(Image.builder()
                    .type(image.getType())
                    .image(ImageUtility.decompressImage(image.getImage())).build());
        }

        return images;
    }

}
