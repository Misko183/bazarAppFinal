package com.example.backend.User;

import java.util.Optional;

public interface UserService {
    void addUser(User user);

    Optional<User> getUserByUsername(String username);

    User updateUser(User user);

    void findLoggedUsers(String username, String password);
}
