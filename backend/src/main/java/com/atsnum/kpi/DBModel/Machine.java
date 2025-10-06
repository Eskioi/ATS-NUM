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
public class Machine {
    private int id;
    private String machine;
    private String location;
}
