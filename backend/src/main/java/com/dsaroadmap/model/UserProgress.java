package com.dsaroadmap.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "user_progress", uniqueConstraints = @UniqueConstraint(name = "uk_progress_user_problem", columnNames = {"user_id", "problem_id"}), indexes = {@Index(name = "idx_progress_user", columnList = "user_id"), @Index(name = "idx_progress_recent", columnList = "user_id,lastViewedAt")})
public class UserProgress extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "user_id") private User user;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "problem_id") private Problem problem;
    @Column(nullable = false) private boolean completed;
    @Column(nullable = false) private boolean revision;
    private Instant completedAt;
    private Instant lastViewedAt;
    @Column(nullable = false) private int viewCount;
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Problem getProblem() { return problem; }
    public void setProblem(Problem problem) { this.problem = problem; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public boolean isRevision() { return revision; }
    public void setRevision(boolean revision) { this.revision = revision; }
    public Instant getCompletedAt() { return completedAt; }
    public void setCompletedAt(Instant completedAt) { this.completedAt = completedAt; }
    public Instant getLastViewedAt() { return lastViewedAt; }
    public void setLastViewedAt(Instant lastViewedAt) { this.lastViewedAt = lastViewedAt; }
    public int getViewCount() { return viewCount; }
    public void setViewCount(int viewCount) { this.viewCount = viewCount; }
}

