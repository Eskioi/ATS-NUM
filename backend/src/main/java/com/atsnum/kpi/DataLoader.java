package com.atsnum.kpi;

import com.atsnum.kpi.DBModel.Capteur;
import com.atsnum.kpi.DTO.AddCapteurValueDTO;
import com.atsnum.kpi.DTO.AddMachineDTO;
import com.atsnum.kpi.DTO.AddCapteurDTO;
import com.atsnum.kpi.DTO.RegisterRequestDTO;
import com.atsnum.kpi.DBModel.Machine;
import com.atsnum.kpi.Services.CapteurValueService;
import com.atsnum.kpi.Services.MachineService;
import com.atsnum.kpi.Services.CapteurService;
import com.atsnum.kpi.Services.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UserService userService;
    private final MachineService machineService;
    private final CapteurService capteurService;
    private final CapteurValueService capteurValueService;

    private final Random random = new Random();

    @Override
    public void run(String... args) {

        // -------------------------------
        // USERS
        // -------------------------------
        userService.registerInsiderAdmin(new RegisterRequestDTO("tester-user-1", "tester-user-1@gmail.com", "SuperSecretPassword1"));
        userService.registerInsider(new RegisterRequestDTO("tester-user-2", "tester-user-2@gmail.com", "SuperSecretPassword2"));
        userService.registerInsider(new RegisterRequestDTO("tester-user-3", "tester-user-3@gmail.com", "SuperSecretPassword3"));

        // -------------------------------
        // MACHINES
        // -------------------------------
        for (int i = 1; i <= 5; i++) {
            Machine machine = new Machine();
            machine.setMachine("Machine " + i);
            machineService.addMachine(new AddMachineDTO(machine.getMachine()));

            // Retrieve saved machine (to get generated UUID)
            Machine savedMachine = machineService.getMachines().get(i - 1);

            // -------------------------------
            // CAPTEURS
            // -------------------------------
            for (int j = 1; j <= 3; j++) {
                String capteurName = "Sensor " + j;
                String unit = "unit" + j;
                String typeData = "number"; // default type

                capteurService.addCapteur(new AddCapteurDTO(
                        savedMachine.getId(),
                        capteurName,
                        unit
                ));

                // Retrieve saved capteur
                List<Capteur> capteurs = capteurService.getCapteursByMachineId(savedMachine.getId());
                Capteur savedCapteur = capteurs.get(j - 1);

                // -------------------------------
                // CAPTEUR VALUES (last 24h, every 30 min)
                // -------------------------------
                LocalDateTime now = LocalDateTime.now();
                for (int k = 48; k >= 1; k--) {
                    LocalDateTime dateTime = now.minusMinutes(30L * k);
                    long value = random.nextInt(100); // random value between 0-99
                    capteurValueService.addCapteurValue(new AddCapteurValueDTO(
                            savedCapteur.getId(),
                            value,
                            dateTime
                    ));
                }
            }
        }
        System.out.println("Generation complete");
    }
}