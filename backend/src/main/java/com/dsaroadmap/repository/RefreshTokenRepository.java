package com.dsaroadmap.repository;
import com.dsaroadmap.model.RefreshToken;
import java.util.*;
import org.springframework.data.jpa.repository.*;
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByTokenHashAndRevokedFalse(String hash);
    @Modifying void deleteByUserId(Long userId);
}

