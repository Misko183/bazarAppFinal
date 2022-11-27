package com.example.backend.proSecurity.rest;

import com.example.backend.proSecurity.configuration.AppConfig;
import com.example.backend.proSecurity.user.CurrentUser;
import com.example.backend.proSecurity.user.CurrentUserService;
import com.example.backend.proSecurity.user.UserEntity;
import com.example.backend.proSecurity.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public CurrentUserService currentUserService;

    @Autowired
    public AppConfig config;

    @GetMapping("/user")
    public void getUser() {
    }

    @GetMapping("/users")
    public List<UserEntity> getUser1() {
        return (List<UserEntity>) userRepository.findAll();
    }

    @PostMapping("/deleteuser")
    public void deleteUser(@RequestBody UserEntity user){
        currentUserService.deleteUser(user);
    }

    @GetMapping("/infoAboutUser")
    public UserEntity getRole(@AuthenticationPrincipal CurrentUser currentUser) {
//        UserEntity userEntity = userRepository.findByUsername(currentUser.getUsername());
//        userEntity.setUsername(userEntity.getUsername());
//        userEntity.setPassword(config.passwordEncoder().encode(userEntity.getPassword()));
//        userEntity.setPhone(userEntity.getPhone());
//        userEntity.setAddress(userEntity.getAddress());
//        userEntity.setEmail(userEntity.getEmail());
//        userEntity.setAuthority(userEntity.getAuthority());
        return userRepository.findByUsername(currentUser.getUsername());

    }

    @PostMapping("/edituser")
    public void editUser(@RequestBody UserEntity user){
        user.setPassword(config.passwordEncoder().encode(user.getPassword()));
        userRepository.save(user);
    }
}
