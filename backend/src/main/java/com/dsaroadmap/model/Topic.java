package com.dsaroadmap.model;

import jakarta.persistence.*;

@Entity
@Table(name = "topics", indexes = @Index(name = "idx_topic_name", columnList = "name", unique = true))
public class Topic extends BaseEntity {
    @Column(nullable = false, unique = true, length = 100) private String name;
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

