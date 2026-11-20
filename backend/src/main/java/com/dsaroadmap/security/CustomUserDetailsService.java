package com.dsaroadmap.security;

import com.dsaroadmap.model.User;
import com.dsaroadmap.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository users;
    public CustomUserDetailsService(UserRepository users) { this.users = users; }
    @Override public UserDetails loadUserByUsername(String email) {
        User user = users.findByEmailIgnoreCase(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
            .password(user.getPasswordHash() == null ? "" : user.getPasswordHash())
            .roles(user.getRole().name()).disabled(!user.isEnabled()).build();
    }
}

