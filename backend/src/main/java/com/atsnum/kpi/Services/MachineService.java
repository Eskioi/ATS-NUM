package com.atsnum.kpi.Services;

import com.atsnum.kpi.DBModel.Machine;
import com.atsnum.kpi.DTO.AddMachineDTO;
import com.atsnum.kpi.Repositories.MachineRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class MachineService {

    @Autowired
    MachineRepo repo;

    public List<Machine> getMachines () {
        return repo.findAll();
    }

    public Machine getMachineById (UUID id) {
        return repo.getReferenceById(id);
    }

    public void addMachine (AddMachineDTO machineDto) {
        repo.save(new Machine(null, machineDto.getMachine()));
    }

    public void deleteMachine (UUID id) {
        repo.deleteById(id);
    }
}
