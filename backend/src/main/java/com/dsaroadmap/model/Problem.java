package com.dsaroadmap.model;

import jakarta.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "problems", indexes = {
    @Index(name = "idx_problem_slug", columnList = "slug", unique = true),
    @Index(name = "idx_problem_concept_difficulty", columnList = "concept_id,difficulty")
})
public class Problem extends BaseEntity {
    @Column(nullable = false, length = 180) private String name;
    @Column(nullable = false, unique = true, length = 200) private String slug;
    @Lob @Column(nullable = false) private String description;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private Difficulty difficulty;
    @Column(nullable = false) private int estimatedMinutes;
    @Lob private String constraintsText;
    @Lob private String inputFormat;
    @Lob private String outputFormat;
    @Lob private String examples;
    @Column(nullable = false) private int displayOrder;
    @Column(nullable = false) private boolean published = true;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "concept_id", nullable = false)
    private Concept concept;
    @ManyToMany
    @JoinTable(name = "problem_companies", joinColumns = @JoinColumn(name = "problem_id"), inverseJoinColumns = @JoinColumn(name = "company_id"))
    private Set<Company> companies = new LinkedHashSet<>();
    @ManyToMany
    @JoinTable(name = "problem_topics", joinColumns = @JoinColumn(name = "problem_id"), inverseJoinColumns = @JoinColumn(name = "topic_id"))
    private Set<Topic> topics = new LinkedHashSet<>();
    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true) private Set<PlatformLink> platformLinks = new LinkedHashSet<>();
    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true) private Set<ProblemVideo> videos = new LinkedHashSet<>();
    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true) private Set<Solution> solutions = new LinkedHashSet<>();

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Difficulty getDifficulty() { return difficulty; }
    public void setDifficulty(Difficulty difficulty) { this.difficulty = difficulty; }
    public int getEstimatedMinutes() { return estimatedMinutes; }
    public void setEstimatedMinutes(int estimatedMinutes) { this.estimatedMinutes = estimatedMinutes; }
    public String getConstraintsText() { return constraintsText; }
    public void setConstraintsText(String constraintsText) { this.constraintsText = constraintsText; }
    public String getInputFormat() { return inputFormat; }
    public void setInputFormat(String inputFormat) { this.inputFormat = inputFormat; }
    public String getOutputFormat() { return outputFormat; }
    public void setOutputFormat(String outputFormat) { this.outputFormat = outputFormat; }
    public String getExamples() { return examples; }
    public void setExamples(String examples) { this.examples = examples; }
    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
    public boolean isPublished() { return published; }
    public void setPublished(boolean published) { this.published = published; }
    public Concept getConcept() { return concept; }
    public void setConcept(Concept concept) { this.concept = concept; }
    public Set<Company> getCompanies() { return companies; }
    public Set<Topic> getTopics() { return topics; }
    public Set<PlatformLink> getPlatformLinks() { return platformLinks; }
    public Set<ProblemVideo> getVideos() { return videos; }
    public Set<Solution> getSolutions() { return solutions; }
}

