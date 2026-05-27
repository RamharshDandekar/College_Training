package com.ramharsh.job.controller;

import com.ramharsh.job.dto.ApplicationRequest;
import com.ramharsh.job.entity.Application;
import com.ramharsh.job.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<Application> applyForJob(@RequestBody ApplicationRequest request) {
        Application application = applicationService.applyForJob(request);
        return new ResponseEntity<>(application, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }
}
