package com.atsnum.kpi.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class UserDTO {
    private String username;
    private String email;
    private String password;
    private String role;
}
