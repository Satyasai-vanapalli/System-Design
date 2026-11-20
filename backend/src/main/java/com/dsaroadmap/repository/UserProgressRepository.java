package com.dsaroadmap.repository;
import com.dsaroadmap.model.*;
import java.util.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    Optional<UserProgress> findByUserIdAndProblemId(Long userId, Long problemId);
    List<UserProgress> findByUserId(Long userId);
    @Query("select up from UserProgress up join fetch up.problem p join fetch p.concept where up.user.id=:userId and up.lastViewedAt is not null order by up.lastViewedAt desc")
    List<UserProgress> findRecent(@Param("userId") Long userId, Pageable pageable);
    long countByUserIdAndCompletedTrue(Long userId);
}

