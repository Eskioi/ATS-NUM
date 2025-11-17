package com.atsnum.kpi.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class AddCapteurDTO {
    private UUID machineId;
    private String nom;
    private String unit;
}
