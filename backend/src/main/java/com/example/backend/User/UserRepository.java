
package com.example.backend.User;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByUserName(String username);

    Optional<User> findRoleByUserName(String username);
}
