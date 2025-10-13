package com.atsnum.kpi.Controllers;

import com.atsnum.kpi.DBModel.Machine;
import com.atsnum.kpi.DTO.AddMachineDTO;
import com.atsnum.kpi.Services.MachineService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MachineController {

    @Autowired
    MachineService machineService;

    @GetMapping("/machine/getAllMachines")
    public List<Machine> getMachines () {
        return machineService.getMachines();
    }

    @GetMapping("/machine/getMachine")
    public Machine getMachine (@RequestParam Integer integer) {
        return machineService.getMachineById(integer);
    }

    @PostMapping("/machine/addMachine")
    public void addMachine (@RequestParam AddMachineDTO addMachineDto) {
        machineService.addMachine(addMachineDto);
    }

    @DeleteMapping("/machine/deleteMachine")
    public void deleteMachine (@RequestParam Integer id) {
        machineService.deleteMachine(id);
    }
}
