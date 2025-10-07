package com.atsnum.kpi.DBModel;

import lombok.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Component
@Scope("prototype")
public class UserNumber {
    private int id;
    private int hourNumber;
    private int userCount;
}
