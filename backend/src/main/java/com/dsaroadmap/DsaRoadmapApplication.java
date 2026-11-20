package com.dsaroadmap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class DsaRoadmapApplication {
    public static void main(String[] args) {
        SpringApplication.run(DsaRoadmapApplication.class, args);
    }
}

