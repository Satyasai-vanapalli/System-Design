package com.dsaroadmap.model;

import jakarta.persistence.*;

@Entity
@Table(name = "companies", indexes = @Index(name = "idx_company_name", columnList = "name", unique = true))
public class Company extends BaseEntity {
    @Column(nullable = false, unique = true, length = 100) private String name;
    @Column(length = 500) private String logoUrl;
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
}

