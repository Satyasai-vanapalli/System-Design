package com.dsaroadmap.repository;
import com.dsaroadmap.model.PasswordResetToken;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> { Optional<PasswordResetToken> findByTokenHashAndUsedFalse(String hash); }

