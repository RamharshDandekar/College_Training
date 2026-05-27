package com.ramharsh.job.service;

import com.ramharsh.job.dto.ApplicationRequest;
import com.ramharsh.job.entity.Application;
import com.ramharsh.job.entity.Job;
import com.ramharsh.job.exception.DuplicateApplicationException;
import com.ramharsh.job.exception.ResourceNotFoundException;
import com.ramharsh.job.repository.ApplicationRepository;
import com.ramharsh.job.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    public Application applyForJob(ApplicationRequest request) {
        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + request.getJobId()));

        if (applicationRepository.findByStudentIdAndJobId(request.getStudentId(), request.getJobId()).isPresent()) {
            throw new DuplicateApplicationException("Student " + request.getStudentId() + " has already applied for job " + request.getJobId());
        }

        Application application = new Application();
        application.setStudentId(request.getStudentId());
        application.setJob(job);
        application.setApplicationDate(LocalDate.now());
        application.setStatus("APPLIED");

        return applicationRepository.save(application);
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
}
