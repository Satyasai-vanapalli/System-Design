package com.dsaroadmap.security;

import com.dsaroadmap.dto.ApiDtos.AuthResponse;
import com.dsaroadmap.service.AuthService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class GoogleOAuthSuccessHandler implements AuthenticationSuccessHandler {
    private final AuthService auth; private final String origin;
    public GoogleOAuthSuccessHandler(AuthService auth, @Value("${app.origin}") String origin) { this.auth=auth; this.origin=origin; }
    @Override public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User principal=(OAuth2User) authentication.getPrincipal();
        AuthResponse tokens=auth.oauthUser(principal.getAttribute("email"), principal.getAttribute("name"), principal.getAttribute("picture"));
        response.sendRedirect(origin+"/auth/callback?access="+encode(tokens.accessToken())+"&refresh="+encode(tokens.refreshToken()));
    }
    private String encode(String s) { return URLEncoder.encode(s, StandardCharsets.UTF_8); }
}
