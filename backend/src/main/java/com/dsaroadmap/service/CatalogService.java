package com.dsaroadmap.service;

import com.dsaroadmap.dto.ApiDtos.*;
import com.dsaroadmap.exception.NotFoundException;
import com.dsaroadmap.model.*;
import com.dsaroadmap.repository.*;
import com.dsaroadmap.security.SecurityUtils;
import jakarta.persistence.criteria.*;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CatalogService {
    private final ConceptRepository concepts; private final ProblemRepository problems; private final UserRepository users; private final UserProgressRepository progress;
    public CatalogService(ConceptRepository concepts, ProblemRepository problems, UserRepository users, UserProgressRepository progress) { this.concepts=concepts; this.problems=problems; this.users=users; this.progress=progress; }

    @Transactional(readOnly=true) public List<ConceptSummary> concepts() {
        Map<Long,UserProgress> state=progressMap();
        return concepts.findPublishedWithProblems().stream().map(c -> {
            List<ProblemSummary> list=c.getProblems().stream().filter(Problem::isPublished).map(p -> summary(p,state.get(p.getId()))).toList();
            long done=list.stream().filter(ProblemSummary::completed).count();
            return new ConceptSummary(c.getId(),c.getName(),c.getSlug(),c.getDescription(),c.getIcon(),list.size(),done,list.isEmpty()?0:(int)Math.round(done*100.0/list.size()),list);
        }).toList();
    }

    @Transactional(readOnly=true) public ProblemDetail problem(String slug) {
        Problem p=problems.findPublishedDetail(slug).orElseThrow(() -> new NotFoundException("Problem not found"));
        UserProgress state=currentUserId().flatMap(uid -> progress.findByUserIdAndProblemId(uid,p.getId())).orElse(null);
        return detail(p,state);
    }

    @Transactional(readOnly=true) public Page<ProblemSummary> problems(String query, Difficulty difficulty, String company, String topic, Integer maxMinutes, int page, int size, String sort) {
        Specification<Problem> spec=(root,q,cb)->cb.isTrue(root.get("published"));
        if(query!=null&&!query.isBlank()) spec=spec.and((root,q,cb)->cb.like(cb.lower(root.get("name")),"%"+query.toLowerCase()+"%"));
        if(difficulty!=null) spec=spec.and((root,q,cb)->cb.equal(root.get("difficulty"),difficulty));
        if(maxMinutes!=null) spec=spec.and((root,q,cb)->cb.lessThanOrEqualTo(root.get("estimatedMinutes"),maxMinutes));
        if(company!=null&&!company.isBlank()) spec=spec.and((root,q,cb)->{ q.distinct(true); return cb.equal(cb.lower(root.join("companies").get("name")),company.toLowerCase()); });
        if(topic!=null&&!topic.isBlank()) spec=spec.and((root,q,cb)->{ q.distinct(true); return cb.equal(cb.lower(root.join("topics").get("name")),topic.toLowerCase()); });
        Sort ordering=switch(sort==null?"order":sort){case "name"->Sort.by("name");case "difficulty"->Sort.by("difficulty");case "time"->Sort.by("estimatedMinutes");default->Sort.by("concept.displayOrder").and(Sort.by("displayOrder"));};
        Map<Long,UserProgress> states=progressMap(); return problems.findAll(spec,PageRequest.of(Math.max(page,0),Math.min(Math.max(size,1),100),ordering)).map(p->summary(p,states.get(p.getId())));
    }

    @Transactional(readOnly=true) public List<SearchResult> search(String query) {
        if(query==null||query.trim().length()<2) return List.of();
        String q=query.trim().toLowerCase(); List<SearchResult> results=new ArrayList<>();
        concepts.search(q).stream().filter(c->c.getName().toLowerCase().contains(q)).limit(4).forEach(c->results.add(new SearchResult("concept",c.getName(),c.getProblems().size()+" problems","/concepts/"+c.getSlug(),null)));
        problems.findAll((root,cq,cb)->cb.and(cb.isTrue(root.get("published")),cb.like(cb.lower(root.get("name")),"%"+q+"%")),PageRequest.of(0,8)).forEach(p->results.add(new SearchResult("problem",p.getName(),p.getConcept().getName(),"/problems/"+p.getSlug(),p.getDifficulty())));
        return results.stream().limit(10).toList();
    }

    @Transactional(readOnly=true) public Map<String,List<String>> metadata() {
        Set<String> companies=new TreeSet<>(),topics=new TreeSet<>();
        concepts.findPublishedWithProblems().forEach(c->c.getProblems().forEach(p->{p.getCompanies().forEach(x->companies.add(x.getName()));p.getTopics().forEach(x->topics.add(x.getName()));}));
        return Map.of("companies",new ArrayList<>(companies),"topics",new ArrayList<>(topics));
    }

    public ProblemSummary summary(Problem p, UserProgress s) { return new ProblemSummary(p.getId(),p.getName(),p.getSlug(),p.getDifficulty(),p.getEstimatedMinutes(),names(p.getCompanies()),names(p.getTopics()),s!=null&&s.isCompleted(),s!=null&&s.isRevision(),!p.getVideos().isEmpty(),p.getSolutions().size()); }
    private ProblemDetail detail(Problem p, UserProgress s) { return new ProblemDetail(p.getId(),p.getName(),p.getSlug(),p.getConcept().getName(),p.getConcept().getSlug(),p.getDescription(),p.getDifficulty(),p.getEstimatedMinutes(),p.getConstraintsText(),p.getInputFormat(),p.getOutputFormat(),p.getExamples(),names(p.getCompanies()),names(p.getTopics()),p.getPlatformLinks().stream().map(x->new PlatformLinkView(x.getId(),x.getPlatform(),x.getUrl())).toList(),p.getVideos().stream().map(x->new VideoView(x.getId(),x.getTitle(),x.getUrl(),x.getChannelName())).toList(),p.getSolutions().stream().sorted(Comparator.comparing(Solution::getLanguage)).map(x->new SolutionView(x.getId(),x.getLanguage(),x.getSolutionCode(),x.getApproach(),x.getExplanation(),x.getTimeComplexity(),x.getSpaceComplexity(),x.getWalkthrough(),x.getPseudoCode())).toList(),s!=null&&s.isCompleted(),s!=null&&s.isRevision()); }
    private List<String> names(Collection<?> values) { return values.stream().map(v->v instanceof Company c?c.getName():((Topic)v).getName()).sorted().toList(); }
    private Optional<Long> currentUserId() { return SecurityUtils.currentEmail().flatMap(users::findByEmailIgnoreCase).map(User::getId); }
    private Map<Long,UserProgress> progressMap() { return currentUserId().map(id->progress.findByUserId(id).stream().collect(Collectors.toMap(x->x.getProblem().getId(),x->x))).orElseGet(Map::of); }
}

