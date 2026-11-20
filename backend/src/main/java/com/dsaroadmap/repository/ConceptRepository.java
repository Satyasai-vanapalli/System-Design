package com.dsaroadmap.repository;
import com.dsaroadmap.model.Concept;
import java.util.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
public interface ConceptRepository extends JpaRepository<Concept, Long> {
    Optional<Concept> findBySlug(String slug);
    boolean existsBySlug(String slug);
    @Query("select distinct c from Concept c left join fetch c.problems p where c.published=true and (p is null or p.published=true) order by c.displayOrder")
    List<Concept> findPublishedWithProblems();
    @Query("select distinct c from Concept c left join fetch c.problems p where lower(c.name) like lower(concat('%', :q, '%')) or lower(p.name) like lower(concat('%', :q, '%')) order by c.displayOrder")
    List<Concept> search(@Param("q") String query);
}

