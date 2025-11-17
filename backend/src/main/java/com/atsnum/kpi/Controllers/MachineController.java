package com.atsnum.kpi.Controllers;

import com.atsnum.kpi.DBModel.Machine;
import com.atsnum.kpi.DTO.AddMachineDTO;
import com.atsnum.kpi.Services.MachineService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/machine")
public class MachineController {

    @Autowired
    MachineService machineService;

    @GetMapping("/getAllMachines")
    public List<Machine> getMachines () {
        return machineService.getMachines();
    }

    @GetMapping("/getMachine")
    public Machine getMachine (@RequestParam UUID id) {
        return machineService.getMachineById(id);
    }

    @PostMapping("/addMachine")
    public void addMachine (@RequestBody AddMachineDTO addMachineDto) {
        machineService.addMachine(addMachineDto);
    }

    @DeleteMapping("/deleteMachine")
    public void deleteMachine (@RequestParam UUID id) {
        machineService.deleteMachine(id);
    }
}
