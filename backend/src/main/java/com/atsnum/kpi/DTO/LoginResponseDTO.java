package com.atsnum.kpi.DTO;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private final String jwtToken;
    private final Integer id;
    private final boolean enabled;
}
