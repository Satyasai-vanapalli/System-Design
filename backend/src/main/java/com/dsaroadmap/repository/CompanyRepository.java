package com.dsaroadmap.repository;
import com.dsaroadmap.model.Company;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CompanyRepository extends JpaRepository<Company, Long> { Optional<Company> findByNameIgnoreCase(String name); }

