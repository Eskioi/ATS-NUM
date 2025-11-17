package com.atsnum.kpi.Services;

import com.atsnum.kpi.DBModel.Capteur;
import com.atsnum.kpi.DTO.AddCapteurDTO;
import com.atsnum.kpi.Repositories.CapteurRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CapteurService {

    @Autowired
    CapteurRepo repo;

    public List<Capteur> getCapteurs () {
        return repo.findAll();
    }

    public List<Capteur> getCapteursByMachineId (UUID id){
        return repo.findByMachineId(id);
    }

    public void addCapteur (AddCapteurDTO addCapteurDTO) {
        repo.save(new Capteur(null,
                addCapteurDTO.getMachineId(),
                addCapteurDTO.getNom(),
                addCapteurDTO.getUnit(),
                null));
    }

    public void deleteCapteur (UUID id) {
        repo.deleteById(id);
    }
}
