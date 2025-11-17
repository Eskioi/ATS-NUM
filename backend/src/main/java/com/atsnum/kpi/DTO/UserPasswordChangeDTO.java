package com.atsnum.kpi.DTO;

import lombok.Getter;

import java.util.UUID;

@Getter
public class UserPasswordChangeDTO {
    private UUID id;
    private String password;
}
