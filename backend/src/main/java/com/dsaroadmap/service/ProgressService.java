package com.dsaroadmap.service;

import com.dsaroadmap.dto.ApiDtos.*;
import com.dsaroadmap.exception.NotFoundException;
import com.dsaroadmap.model.*;
import com.dsaroadmap.repository.*;
import java.time.Instant;
import java.util.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProgressService {
    private final UserRepository users; private final ProblemRepository problems; private final UserProgressRepository progress; private final CatalogService catalog;
    public ProgressService(UserRepository users,ProblemRepository problems,UserProgressRepository progress,CatalogService catalog){this.users=users;this.problems=problems;this.progress=progress;this.catalog=catalog;}
    @Transactional public ProgressView update(String email,Long problemId,ProgressUpdate request){
        User u=users.findByEmailIgnoreCase(email).orElseThrow(()->new NotFoundException("User not found")); Problem p=problems.findById(problemId).orElseThrow(()->new NotFoundException("Problem not found"));
        UserProgress s=progress.findByUserIdAndProblemId(u.getId(),problemId).orElseGet(()->{UserProgress n=new UserProgress();n.setUser(u);n.setProblem(p);return n;});
        if(request.completed()!=null){s.setCompleted(request.completed());s.setCompletedAt(request.completed()?Instant.now():null);} if(request.revision()!=null)s.setRevision(request.revision()); if(Boolean.TRUE.equals(request.viewed())){s.setLastViewedAt(Instant.now());s.setViewCount(s.getViewCount()+1);} progress.save(s); return view(s);
    }
    @Transactional(readOnly=true) public ProgressOverview overview(String email){
        User u=users.findByEmailIgnoreCase(email).orElseThrow(()->new NotFoundException("User not found")); List<UserProgress> states=progress.findByUserId(u.getId()); long total=problems.countByPublishedTrue(),done=states.stream().filter(UserProgress::isCompleted).count(),revision=states.stream().filter(UserProgress::isRevision).count();
        List<ContinueLearning> recent=progress.findRecent(u.getId(),PageRequest.of(0,6)).stream().map(this::learning).toList(); return new ProgressOverview(done,total,total==0?0:(int)Math.round(done*100.0/total),revision,recent.isEmpty()?null:recent.getFirst(),recent);
    }
    private ContinueLearning learning(UserProgress s){Problem p=s.getProblem();return new ContinueLearning(catalog.summary(p,s),p.getConcept().getName(),p.getConcept().getSlug(),s.getLastViewedAt());}
    private ProgressView view(UserProgress s){return new ProgressView(s.getProblem().getId(),s.isCompleted(),s.isRevision(),s.getCompletedAt(),s.getLastViewedAt());}
}

