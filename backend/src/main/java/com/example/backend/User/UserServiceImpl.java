package com.example.backend.User;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User addUser(User user) {
//        String encodedPassword = passwordEncoder.encode(user.getPassword());
//        user.setPassword(encodedPassword);
        user.setRoles("USER");
        return this.repository.save(user);
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return this.repository.findByUserName(username);
    }

    @Override
    public User updateUser(User user) {
        return this.repository.save(user);
    }

    public String getUsersRole() {
        return usersRole;
    }

    public void setUsersRole(String usersRole) {
        this.usersRole = usersRole;
    }

    String usersRole;
    @Override
    public void getRoles(String username) {
       setUsersRole(this.repository.findRoleByUserName(username).get().getRoles());
    }
}

