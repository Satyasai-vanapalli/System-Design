package com.dsaroadmap.model;

import jakarta.persistence.*;

@Entity
@Table(name = "problem_videos", indexes = @Index(name = "idx_video_problem", columnList = "problem_id"))
public class ProblemVideo extends BaseEntity {
    @Column(nullable = false, length = 180) private String title;
    @Column(nullable = false, length = 1000) private String url;
    @Column(length = 120) private String channelName;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "problem_id") private Problem problem;
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getChannelName() { return channelName; }
    public void setChannelName(String channelName) { this.channelName = channelName; }
    public Problem getProblem() { return problem; }
    public void setProblem(Problem problem) { this.problem = problem; }
}

