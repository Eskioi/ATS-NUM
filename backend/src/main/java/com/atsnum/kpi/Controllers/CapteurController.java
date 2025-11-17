package com.atsnum.kpi.Controllers;

import com.atsnum.kpi.DBModel.Capteur;
import com.atsnum.kpi.DTO.AddCapteurDTO;
import com.atsnum.kpi.Services.CapteurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/capteur")
public class CapteurController {

    @Autowired
    CapteurService capteurService;

    @GetMapping("/getAllCapteurs")
    public List<Capteur> getCapteurs () {
        return capteurService.getCapteurs();
    }

    @GetMapping("/getAllCapteursByMachineId")
    public List<Capteur> getCapteursByMachineId (@RequestParam UUID id) {
        return capteurService.getCapteursByMachineId(id);
    }

    @PostMapping("/addCapteur")
    public void addCapteur (@RequestBody AddCapteurDTO addCapteurDTO) {
        capteurService.addCapteur(addCapteurDTO);
    }

    @DeleteMapping("/deleteCapteur")
    public void deleteCapteur (@RequestParam UUID id) {
        capteurService.deleteCapteur(id);
    }
}
