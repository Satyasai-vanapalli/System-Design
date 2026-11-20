package com.dsaroadmap.service;

import com.dsaroadmap.dto.ApiDtos.*;
import com.dsaroadmap.exception.*;
import com.dsaroadmap.model.*;
import com.dsaroadmap.repository.*;
import com.dsaroadmap.security.JwtService;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final UserRepository users; private final RefreshTokenRepository refreshTokens; private final PasswordResetTokenRepository resetTokens;
    private final PasswordEncoder encoder; private final AuthenticationManager authManager; private final JwtService jwt; private final long refreshDays;
    public AuthService(UserRepository users, RefreshTokenRepository refreshTokens, PasswordResetTokenRepository resetTokens, PasswordEncoder encoder, AuthenticationManager authManager, JwtService jwt, @Value("${app.jwt.refresh-days}") long refreshDays) {
        this.users=users; this.refreshTokens=refreshTokens; this.resetTokens=resetTokens; this.encoder=encoder; this.authManager=authManager; this.jwt=jwt; this.refreshDays=refreshDays;
    }
    @Transactional public AuthResponse signup(SignUpRequest request) {
        if (users.existsByEmailIgnoreCase(request.email())) throw new ConflictException("An account with this email already exists");
        User u=new User(); u.setName(request.name().trim()); u.setEmail(request.email().trim().toLowerCase()); u.setPasswordHash(encoder.encode(request.password())); u.setRole(Role.STUDENT); u.setProvider(AuthProvider.LOCAL); users.save(u);
        return issue(u);
    }
    @Transactional public AuthResponse login(LoginRequest request) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.email().trim().toLowerCase(), request.password()));
        User u=users.findByEmailIgnoreCase(request.email()).orElseThrow(() -> new BadCredentialsException("Invalid credentials")); u.setLastLoginAt(Instant.now());
        return issue(u);
    }
    @Transactional public AuthResponse refresh(String rawToken) {
        RefreshToken stored=refreshTokens.findByTokenHashAndRevokedFalse(hash(rawToken)).filter(t -> t.getExpiresAt().isAfter(Instant.now())).orElseThrow(() -> new BadCredentialsException("Refresh token is invalid or expired"));
        stored.setRevoked(true); return issue(stored.getUser());
    }
    @Transactional public void logout(String rawToken) { refreshTokens.findByTokenHashAndRevokedFalse(hash(rawToken)).ifPresent(t -> t.setRevoked(true)); }
    @Transactional public void forgotPassword(String email) {
        users.findByEmailIgnoreCase(email).ifPresent(u -> { PasswordResetToken t=new PasswordResetToken(); t.setUser(u); t.setTokenHash(hash(randomToken())); t.setExpiresAt(Instant.now().plus(30, ChronoUnit.MINUTES)); resetTokens.save(t); });
    }
    @Transactional public void resetPassword(ResetPasswordRequest request) {
        PasswordResetToken t=resetTokens.findByTokenHashAndUsedFalse(hash(request.token())).filter(x -> x.getExpiresAt().isAfter(Instant.now())).orElseThrow(() -> new BadCredentialsException("Reset token is invalid or expired"));
        t.getUser().setPasswordHash(encoder.encode(request.password())); t.setUsed(true); refreshTokens.deleteByUserId(t.getUser().getId());
    }
    @Transactional public AuthResponse oauthUser(String email, String name, String avatar) {
        User u=users.findByEmailIgnoreCase(email).orElseGet(() -> { User n=new User(); n.setEmail(email.toLowerCase()); n.setName(name); n.setProvider(AuthProvider.GOOGLE); n.setRole(Role.STUDENT); return n; });
        u.setName(name); u.setAvatarUrl(avatar); u.setLastLoginAt(Instant.now()); users.save(u); return issue(u);
    }
    public UserView me(String email) { return users.findByEmailIgnoreCase(email).map(AuthService::view).orElseThrow(() -> new NotFoundException("User not found")); }
    private AuthResponse issue(User user) { String raw=randomToken(); RefreshToken t=new RefreshToken(); t.setUser(user); t.setTokenHash(hash(raw)); t.setExpiresAt(Instant.now().plus(refreshDays, ChronoUnit.DAYS)); refreshTokens.save(t); return new AuthResponse(jwt.createAccessToken(user), raw, jwt.expiresInSeconds(), view(user)); }
    private static UserView view(User u) { return new UserView(u.getId(),u.getName(),u.getEmail(),u.getAvatarUrl(),u.getRole()); }
    private static String randomToken() { byte[] b=new byte[48]; new SecureRandom().nextBytes(b); return Base64.getUrlEncoder().withoutPadding().encodeToString(b); }
    private static String hash(String value) { try { return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(value.getBytes(StandardCharsets.UTF_8))); } catch (NoSuchAlgorithmException e) { throw new IllegalStateException(e); } }
}

