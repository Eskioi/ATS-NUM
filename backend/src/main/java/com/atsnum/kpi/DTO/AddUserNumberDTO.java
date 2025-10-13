package com.atsnum.kpi.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AddUserNumberDTO {
    private int hourNumber;
    private int userCount;
}
