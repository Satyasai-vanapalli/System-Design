package com.dsaroadmap.security;

import com.dsaroadmap.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.*;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private final SecretKey key;
    private final long accessMinutes;

    public JwtService(@Value("${app.jwt.secret}") String secret, @Value("${app.jwt.access-minutes}") long accessMinutes) {
        byte[] decoded;
        try { decoded = java.util.Base64.getDecoder().decode(secret); }
        catch (IllegalArgumentException ex) { decoded = secret.getBytes(StandardCharsets.UTF_8); }
        this.key = Keys.hmacShaKeyFor(decoded);
        this.accessMinutes = accessMinutes;
    }

    public String createAccessToken(User user) {
        Instant now = Instant.now();
        return Jwts.builder().subject(user.getEmail()).claim("role", user.getRole().name()).claim("uid", user.getId())
            .issuedAt(Date.from(now)).expiration(Date.from(now.plus(accessMinutes, ChronoUnit.MINUTES)))
            .signWith(key).compact();
    }

    public String subject(String token) { return parser().parseSignedClaims(token).getPayload().getSubject(); }
    public boolean valid(String token) {
        try { parser().parseSignedClaims(token); return true; }
        catch (JwtException | IllegalArgumentException ex) { return false; }
    }
    public long expiresInSeconds() { return accessMinutes * 60; }
    private JwtParser parser() { return Jwts.parser().verifyWith(key).build(); }
}

