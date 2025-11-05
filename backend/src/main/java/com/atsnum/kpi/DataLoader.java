package com.atsnum.kpi;

import com.atsnum.kpi.DTO.AddUserNumberDTO;
import com.atsnum.kpi.DTO.RegisterRequestDTO;
import com.atsnum.kpi.Services.MachineService;
import com.atsnum.kpi.Services.UserNumberService;
import com.atsnum.kpi.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {
    private final UserService userService;
    private final UserNumberService userNumberService;
    private final MachineService machineService;

    @Override
    public void run (String... args) {
        userService.registerInsider(new RegisterRequestDTO("tester-user-1",
                "tester-user-1@gmail.com",
                "SuperSecretPassword1"));
        userService.registerInsider(new RegisterRequestDTO("tester-user-2",
                "tester-user-2@gmail.com",
                "SuperSecretPassword2"));
        userService.registerInsider(new RegisterRequestDTO("tester-user-3",
                "tester-user-3@gmail.com",
                "SuperSecretPassword3"));

        userNumberService.addUserNumber(new AddUserNumberDTO(0, 3));
        userNumberService.addUserNumber(new AddUserNumberDTO(1, 6));
        userNumberService.addUserNumber(new AddUserNumberDTO(2, 4));
        userNumberService.addUserNumber(new AddUserNumberDTO(3, 11));
        userNumberService.addUserNumber(new AddUserNumberDTO(4, 57));
        userNumberService.addUserNumber(new AddUserNumberDTO(5, 35));
        userNumberService.addUserNumber(new AddUserNumberDTO(6, 75));
        userNumberService.addUserNumber(new AddUserNumberDTO(7, 23));
        userNumberService.addUserNumber(new AddUserNumberDTO(8, 98));
        userNumberService.addUserNumber(new AddUserNumberDTO(9, 21));
        userNumberService.addUserNumber(new AddUserNumberDTO(10, 18));
        userNumberService.addUserNumber(new AddUserNumberDTO(11, 55));
    }
}
