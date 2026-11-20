package com.dsaroadmap.repository;
import com.dsaroadmap.model.Topic;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
public interface TopicRepository extends JpaRepository<Topic, Long> { Optional<Topic> findByNameIgnoreCase(String name); }

