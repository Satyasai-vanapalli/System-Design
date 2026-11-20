package com.dsaroadmap.model;

import jakarta.persistence.*;

@Entity
@Table(name = "platform_links", indexes = @Index(name = "idx_platform_problem", columnList = "problem_id"))
public class PlatformLink extends BaseEntity {
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 30) private Platform platform;
    @Column(nullable = false, length = 1000) private String url;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "problem_id") private Problem problem;
    public Platform getPlatform() { return platform; }
    public void setPlatform(Platform platform) { this.platform = platform; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public Problem getProblem() { return problem; }
    public void setProblem(Problem problem) { this.problem = problem; }
}

