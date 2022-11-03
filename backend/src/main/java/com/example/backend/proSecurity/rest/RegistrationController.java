package com.example.backend.proSecurity.rest;


import com.example.backend.proSecurity.configuration.AppConfig;
import com.example.backend.proSecurity.user.UserEntity;
import com.example.backend.proSecurity.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RegistrationController {

    @Autowired
    public UserRepository repository;

    @Autowired
    public AppConfig config;


@PostMapping("/userRegister")
public void userRegister(@RequestBody UserEntity user) {

    UserEntity userEntity = new UserEntity();
    userEntity.setUsername(user.getUsername());
    userEntity.setPassword(config.passwordEncoder().encode(user.getPassword()));
    userEntity.setAuthority("USER");

    repository.save(userEntity);
}

    @PostMapping("/instructorRegister")
    public void instructorRegister(@RequestBody UserEntity user) {

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(user.getUsername());
        userEntity.setPassword(config.passwordEncoder().encode(user.getPassword()));
        userEntity.setAuthority("INSTRUCTOR");

        repository.save(userEntity);
    }

}
