package com.atsnum.kpi.DTO;

import lombok.Getter;

import java.util.UUID;

@Getter
public class SetAdminDTO {
    private UUID adminId;
    private UUID userId;
}
