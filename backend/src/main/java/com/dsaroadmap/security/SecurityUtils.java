package com.dsaroadmap.security;
import java.util.Optional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
public final class SecurityUtils {
    private SecurityUtils() {}
    public static Optional<String> currentEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal()) ? Optional.ofNullable(auth.getName()) : Optional.empty();
    }
}

