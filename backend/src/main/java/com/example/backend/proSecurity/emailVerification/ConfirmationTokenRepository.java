package com.example.backend.proSecurity.emailVerification;

import com.example.backend.proSecurity.emailVerification.ConfirmationToken;
import org.springframework.data.repository.CrudRepository;

public interface ConfirmationTokenRepository extends CrudRepository<ConfirmationToken, String > {
    ConfirmationToken findByConfirmationToken(String confirmationToken);
}

