package com.atsnum.kpi.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@Getter
public class AddCapteurValueDTO {
    private UUID capteurId;
    private Long value;
    private LocalDateTime dateTime;
}
