package com.ramharsh.job.repository;

import com.ramharsh.job.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Optional<Application> findByStudentIdAndJobId(Long studentId, Long jobId);
}
