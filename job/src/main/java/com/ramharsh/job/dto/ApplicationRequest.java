package com.ramharsh.job.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ApplicationRequest {
    private Long studentId;
    
    @JsonProperty("JobId")
    private Long jobId;
}
