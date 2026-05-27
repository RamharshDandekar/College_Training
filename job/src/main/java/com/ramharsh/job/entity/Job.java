package com.ramharsh.job.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String role;
    private Double packageAmount;
    private String location;

    @JsonIgnore
    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    private List<Application> applications;
}
