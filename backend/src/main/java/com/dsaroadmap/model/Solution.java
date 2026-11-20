package com.dsaroadmap.model;

import jakarta.persistence.*;

@Entity
@Table(name = "solutions", uniqueConstraints = @UniqueConstraint(name = "uk_solution_problem_language", columnNames = {"problem_id", "language"}), indexes = @Index(name = "idx_solution_problem", columnList = "problem_id"))
public class Solution extends BaseEntity {
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private Language language;
    @Lob @Column(nullable = false) private String solutionCode;
    @Lob @Column(nullable = false) private String approach;
    @Lob private String explanation;
    @Column(nullable = false, length = 100) private String timeComplexity;
    @Column(nullable = false, length = 100) private String spaceComplexity;
    @Lob private String walkthrough;
    @Lob private String pseudoCode;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "problem_id") private Problem problem;
    public Language getLanguage() { return language; }
    public void setLanguage(Language language) { this.language = language; }
    public String getSolutionCode() { return solutionCode; }
    public void setSolutionCode(String solutionCode) { this.solutionCode = solutionCode; }
    public String getApproach() { return approach; }
    public void setApproach(String approach) { this.approach = approach; }
    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
    public String getTimeComplexity() { return timeComplexity; }
    public void setTimeComplexity(String timeComplexity) { this.timeComplexity = timeComplexity; }
    public String getSpaceComplexity() { return spaceComplexity; }
    public void setSpaceComplexity(String spaceComplexity) { this.spaceComplexity = spaceComplexity; }
    public String getWalkthrough() { return walkthrough; }
    public void setWalkthrough(String walkthrough) { this.walkthrough = walkthrough; }
    public String getPseudoCode() { return pseudoCode; }
    public void setPseudoCode(String pseudoCode) { this.pseudoCode = pseudoCode; }
    public Problem getProblem() { return problem; }
    public void setProblem(Problem problem) { this.problem = problem; }
}

