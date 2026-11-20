package com.dsaroadmap.repository;
import com.dsaroadmap.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<User, Long> { Optional<User> findByEmailIgnoreCase(String email); boolean existsByEmailIgnoreCase(String email); }

