package com.dsaroadmap.repository;
import com.dsaroadmap.model.ProblemVideo;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProblemVideoRepository extends JpaRepository<ProblemVideo, Long> { long countByProblemPublishedTrue(); }

