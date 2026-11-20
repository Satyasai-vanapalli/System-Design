package com.dsaroadmap.controller;
import com.dsaroadmap.dto.ApiDtos.*;import com.dsaroadmap.service.ProgressService;import jakarta.validation.Valid;import org.springframework.security.core.Authentication;import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/progress")public class ProgressController{private final ProgressService progress;public ProgressController(ProgressService progress){this.progress=progress;}@PatchMapping("/problems/{id}")ProgressView update(@PathVariable Long id,@Valid @RequestBody ProgressUpdate r,Authentication a){return progress.update(a.getName(),id,r);}@GetMapping ProgressOverview overview(Authentication a){return progress.overview(a.getName());}}

