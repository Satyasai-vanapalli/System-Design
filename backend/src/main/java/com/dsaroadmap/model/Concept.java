package com.dsaroadmap.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "concepts", indexes = {@Index(name = "idx_concept_slug", columnList = "slug", unique = true), @Index(name = "idx_concept_order", columnList = "displayOrder")})
public class Concept extends BaseEntity {
    @Column(nullable = false, unique = true, length = 120) private String name;
    @Column(nullable = false, unique = true, length = 140) private String slug;
    @Column(length = 600) private String description;
    private String icon;
    @Column(nullable = false) private int displayOrder;
    @Column(nullable = false) private boolean published = true;
    @OneToMany(mappedBy = "concept", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder asc") private List<Problem> problems = new ArrayList<>();

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
    public boolean isPublished() { return published; }
    public void setPublished(boolean published) { this.published = published; }
    public List<Problem> getProblems() { return problems; }
}

