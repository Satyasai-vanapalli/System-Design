package com.dsaroadmap.repository;
import com.dsaroadmap.model.Solution;
import org.springframework.data.jpa.repository.JpaRepository;
public interface SolutionRepository extends JpaRepository<Solution, Long> { long countByProblemPublishedTrue(); }

