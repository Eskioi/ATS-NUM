package com.atsnum.kpi.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class VerifyUserResponseDTO {
    private final String token;
    private final String role;
    private final String username;
}
