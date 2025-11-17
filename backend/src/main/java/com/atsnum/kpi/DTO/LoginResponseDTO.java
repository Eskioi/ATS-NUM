package com.atsnum.kpi.DTO;

import lombok.Data;

import java.util.UUID;

@Data
public class LoginResponseDTO {
    private final String jwtToken;
    private final UUID id;
}
