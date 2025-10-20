package com.atsnum.kpi.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class AddUserDTO {
    private String username;
    private String email;
    private String password;
}
