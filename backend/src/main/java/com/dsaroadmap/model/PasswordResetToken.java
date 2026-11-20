package com.dsaroadmap.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "password_reset_tokens", indexes = @Index(name = "idx_reset_hash", columnList = "tokenHash", unique = true))
public class PasswordResetToken extends BaseEntity {
    @Column(nullable = false, unique = true, length = 64) private String tokenHash;
    @Column(nullable = false) private Instant expiresAt;
    @Column(nullable = false) private boolean used;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "user_id") private User user;
    public String getTokenHash() { return tokenHash; }
    public void setTokenHash(String tokenHash) { this.tokenHash = tokenHash; }
    public Instant getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }
    public boolean isUsed() { return used; }
    public void setUsed(boolean used) { this.used = used; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
