package com.dsaroadmap.repository;
import com.dsaroadmap.model.*;
import java.util.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
public interface ProblemRepository extends JpaRepository<Problem, Long>, JpaSpecificationExecutor<Problem> {
    Optional<Problem> findBySlug(String slug);
    boolean existsBySlug(String slug);
    long countByPublishedTrue();
    @Query("select distinct p from Problem p left join fetch p.companies left join fetch p.topics left join fetch p.platformLinks left join fetch p.videos left join fetch p.solutions where p.slug=:slug and p.published=true")
    Optional<Problem> findPublishedDetail(@Param("slug") String slug);
}

