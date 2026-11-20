package com.dsaroadmap.service;

import com.dsaroadmap.dto.ApiDtos.*;
import com.dsaroadmap.exception.*;
import com.dsaroadmap.model.*;
import com.dsaroadmap.repository.*;
import java.text.Normalizer;
import java.util.*;
import java.util.regex.Pattern;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {
    private final UserRepository users;private final ConceptRepository concepts;private final ProblemRepository problems;private final CompanyRepository companies;private final TopicRepository topics;private final ProblemVideoRepository videos;private final SolutionRepository solutions;private final CatalogService catalog;
    public AdminService(UserRepository users,ConceptRepository concepts,ProblemRepository problems,CompanyRepository companies,TopicRepository topics,ProblemVideoRepository videos,SolutionRepository solutions,CatalogService catalog){this.users=users;this.concepts=concepts;this.problems=problems;this.companies=companies;this.topics=topics;this.videos=videos;this.solutions=solutions;this.catalog=catalog;}
    @Transactional public ConceptSummary createConcept(ConceptRequest r){Concept c=new Concept();apply(c,r);concepts.save(c);return conceptView(c);}
    @Transactional public ConceptSummary updateConcept(Long id,ConceptRequest r){Concept c=concepts.findById(id).orElseThrow(()->new NotFoundException("Concept not found"));apply(c,r);return conceptView(c);}
    @Transactional public void deleteConcept(Long id){if(!concepts.existsById(id))throw new NotFoundException("Concept not found");concepts.deleteById(id);}
    @Transactional public ProblemDetail createProblem(ProblemRequest r){Problem p=new Problem();apply(p,r);problems.save(p);return catalog.problem(p.getSlug());}
    @Transactional public ProblemDetail updateProblem(Long id,ProblemRequest r){Problem p=problems.findById(id).orElseThrow(()->new NotFoundException("Problem not found"));apply(p,r);return catalog.problem(p.getSlug());}
    @Transactional public void deleteProblem(Long id){if(!problems.existsById(id))throw new NotFoundException("Problem not found");problems.deleteById(id);}
    @Transactional(readOnly=true) public DashboardStats dashboard(){List<ActivityView> activity=new ArrayList<>();users.findAll(PageRequest.of(0,3,Sort.by(Sort.Direction.DESC,"createdAt"))).forEach(u->activity.add(new ActivityView("user",u.getName()+" joined",u.getCreatedAt())));problems.findAll(PageRequest.of(0,4,Sort.by(Sort.Direction.DESC,"updatedAt"))).forEach(p->activity.add(new ActivityView("problem",p.getName()+" updated",p.getUpdatedAt())));activity.sort(Comparator.comparing(ActivityView::at).reversed());return new DashboardStats(users.count(),concepts.count(),problems.count(),videos.count(),solutions.count(),activity.stream().limit(6).toList());}
    private void apply(Concept c,ConceptRequest r){c.setName(r.name().trim());c.setSlug(uniqueConceptSlug(r.name(),c.getId()));c.setDescription(r.description());c.setIcon(r.icon());c.setDisplayOrder(r.displayOrder());c.setPublished(r.published());}
    private void apply(Problem p,ProblemRequest r){Concept c=concepts.findById(r.conceptId()).orElseThrow(()->new NotFoundException("Concept not found"));p.setConcept(c);p.setName(r.name().trim());p.setSlug(uniqueProblemSlug(r.name(),p.getId()));p.setDescription(r.description());p.setDifficulty(r.difficulty());p.setEstimatedMinutes(r.estimatedMinutes());p.setConstraintsText(r.constraints());p.setInputFormat(r.inputFormat());p.setOutputFormat(r.outputFormat());p.setExamples(r.examples());p.setDisplayOrder(r.displayOrder());p.setPublished(r.published());
        p.getCompanies().clear();for(String name:safe(r.companies()))p.getCompanies().add(companies.findByNameIgnoreCase(name).orElseGet(()->{Company x=new Company();x.setName(name.trim());return companies.save(x);}));
        p.getTopics().clear();for(String name:safe(r.topics()))p.getTopics().add(topics.findByNameIgnoreCase(name).orElseGet(()->{Topic x=new Topic();x.setName(name.trim());return topics.save(x);}));
        p.getPlatformLinks().clear();for(LinkRequest x:safeList(r.platformLinks())){PlatformLink l=new PlatformLink();l.setProblem(p);l.setPlatform(x.platform());l.setUrl(x.url());p.getPlatformLinks().add(l);}
        p.getVideos().clear();for(VideoRequest x:safeList(r.videos())){ProblemVideo v=new ProblemVideo();v.setProblem(p);v.setTitle(x.title());v.setUrl(x.url());v.setChannelName(x.channelName());p.getVideos().add(v);}
        p.getSolutions().clear();for(SolutionRequest x:safeList(r.solutions())){Solution s=new Solution();s.setProblem(p);s.setLanguage(x.language());s.setSolutionCode(x.solutionCode());s.setApproach(x.approach());s.setExplanation(x.explanation());s.setTimeComplexity(x.timeComplexity());s.setSpaceComplexity(x.spaceComplexity());s.setWalkthrough(x.walkthrough());s.setPseudoCode(x.pseudoCode());p.getSolutions().add(s);}
    }
    private ConceptSummary conceptView(Concept c){return new ConceptSummary(c.getId(),c.getName(),c.getSlug(),c.getDescription(),c.getIcon(),c.getProblems().size(),0,0,List.of());}
    private String uniqueConceptSlug(String name,Long current){String base=slug(name),value=base;int n=2;while(concepts.findBySlug(value).filter(x->!Objects.equals(x.getId(),current)).isPresent())value=base+"-"+n++;return value;}
    private String uniqueProblemSlug(String name,Long current){String base=slug(name),value=base;int n=2;while(problems.findBySlug(value).filter(x->!Objects.equals(x.getId(),current)).isPresent())value=base+"-"+n++;return value;}
    private String slug(String value){String s=Normalizer.normalize(value,Normalizer.Form.NFD).replaceAll("\\p{M}","").toLowerCase().trim();s=Pattern.compile("[^a-z0-9]+").matcher(s).replaceAll("-");return s.replaceAll("(^-|-$)","");}
    private <T> Set<T> safe(Set<T> v){return v==null?Set.of():v;}private <T> List<T> safeList(List<T> v){return v==null?List.of():v;}
}

