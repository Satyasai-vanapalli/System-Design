package com.dsaroadmap.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "refresh_tokens", indexes = {@Index(name = "idx_refresh_hash", columnList = "tokenHash", unique = true), @Index(name = "idx_refresh_user", columnList = "user_id")})
public class RefreshToken extends BaseEntity {
    @Column(nullable = false, unique = true, length = 64) private String tokenHash;
    @Column(nullable = false) private Instant expiresAt;
    @Column(nullable = false) private boolean revoked;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "user_id") private User user;
    public String getTokenHash() { return tokenHash; }
    public void setTokenHash(String tokenHash) { this.tokenHash = tokenHash; }
    public Instant getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }
    public boolean isRevoked() { return revoked; }
    public void setRevoked(boolean revoked) { this.revoked = revoked; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}

