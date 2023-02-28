package com.example.backend.Compare;

import com.example.backend.proSecurity.user.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompareProductsRepository extends CrudRepository<CompareProducts, Long> {

    CompareProducts findByUserEntity(UserEntity userEntity);
}
