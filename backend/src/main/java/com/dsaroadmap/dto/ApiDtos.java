package com.dsaroadmap.dto;

import com.dsaroadmap.model.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.time.Instant;
import java.util.*;

public final class ApiDtos {
    private ApiDtos() {}

    public record SignUpRequest(@NotBlank @Size(max=120) String name, @NotBlank @Email @Size(max=190) String email, @NotBlank @Size(min=8,max=72) String password) {}
    public record LoginRequest(@NotBlank @Email String email, @NotBlank String password) {}
    public record RefreshRequest(@NotBlank String refreshToken) {}
    public record ForgotPasswordRequest(@NotBlank @Email String email) {}
    public record ResetPasswordRequest(@NotBlank String token, @NotBlank @Size(min=8,max=72) String password) {}
    public record UserView(Long id, String name, String email, String avatarUrl, Role role) {}
    public record AuthResponse(String accessToken, String refreshToken, long expiresInSeconds, UserView user) {}
    public record MessageResponse(String message) {}

    public record ConceptSummary(Long id, String name, String slug, String description, String icon, int problemCount, long completedCount, int progressPercent, List<ProblemSummary> problems) {}
    public record ProblemSummary(Long id, String name, String slug, Difficulty difficulty, int estimatedMinutes, List<String> companies, List<String> topics, boolean completed, boolean revision, boolean hasVideo, int solutionCount) {}
    public record PlatformLinkView(Long id, Platform platform, String url) {}
    public record VideoView(Long id, String title, String url, String channelName) {}
    public record SolutionView(Long id, Language language, String solutionCode, String approach, String explanation, String timeComplexity, String spaceComplexity, String walkthrough, String pseudoCode) {}
    public record ProblemDetail(Long id, String name, String slug, String conceptName, String conceptSlug, String description, Difficulty difficulty, int estimatedMinutes, String constraints, String inputFormat, String outputFormat, String examples, List<String> companies, List<String> topics, List<PlatformLinkView> platformLinks, List<VideoView> videos, List<SolutionView> solutions, boolean completed, boolean revision) {}
    public record SearchResult(String type, String title, String subtitle, String path, Difficulty difficulty) {}

    public record ProgressUpdate(Boolean completed, Boolean revision, Boolean viewed) {}
    public record ProgressView(Long problemId, boolean completed, boolean revision, Instant completedAt, Instant lastViewedAt) {}
    public record ContinueLearning(ProblemSummary problem, String conceptName, String conceptSlug, Instant lastViewedAt) {}
    public record ProgressOverview(long completed, long total, int percentage, long revisionCount, ContinueLearning continueLearning, List<ContinueLearning> recent) {}

    public record ConceptRequest(@NotBlank @Size(max=120) String name, @Size(max=600) String description, @Size(max=80) String icon, @Min(0) int displayOrder, boolean published) {}
    public record LinkRequest(@NotNull Platform platform, @NotBlank @Size(max=1000) String url) {}
    public record VideoRequest(@NotBlank @Size(max=180) String title, @NotBlank @Size(max=1000) String url, @Size(max=120) String channelName) {}
    public record SolutionRequest(@NotNull Language language, @NotBlank String solutionCode, @NotBlank String approach, String explanation, @NotBlank @Size(max=100) String timeComplexity, @NotBlank @Size(max=100) String spaceComplexity, String walkthrough, String pseudoCode) {}
    public record ProblemRequest(@NotNull Long conceptId, @NotBlank @Size(max=180) String name, @NotBlank String description, @NotNull Difficulty difficulty, @Min(1) @Max(1440) int estimatedMinutes, String constraints, String inputFormat, String outputFormat, String examples, @Min(0) int displayOrder, boolean published, Set<String> companies, Set<String> topics, List<@Valid LinkRequest> platformLinks, List<@Valid VideoRequest> videos, List<@Valid SolutionRequest> solutions) {}
    public record DashboardStats(long users, long concepts, long problems, long videos, long solutions, List<ActivityView> recentActivity) {}
    public record ActivityView(String type, String label, Instant at) {}
}

