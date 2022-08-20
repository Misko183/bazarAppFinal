
package com.example.backend.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByUserName(String username);
    Optional<User> findByUserNameAndPassword(String username, String password);
    Optional<User> findById(long id);

}
