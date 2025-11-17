package com.atsnum.kpi.Controllers;

import com.atsnum.kpi.DBModel.Capteur;
import com.atsnum.kpi.DBModel.CapteurValue;
import com.atsnum.kpi.DTO.AddCapteurDTO;
import com.atsnum.kpi.DTO.AddCapteurValueDTO;
import com.atsnum.kpi.Services.CapteurValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/capteurValue")
public class CapteurValueController {
    @Autowired
    CapteurValueService capteurValueService;

    @GetMapping("/getAllCapteurValues")
    public List<CapteurValue> getCapteurValues () {
        return capteurValueService.getCapteurValues();
    }

    @GetMapping("/getAllCapteurValuesByCapteurId")
    public List<CapteurValue> getCapteurValuesByCapteurId (@RequestParam UUID id) {
        return capteurValueService.getCapteurValuesByCapteurId(id);
    }

    @PostMapping("/addCapteurValue")
    public void addCapteurValue (@RequestBody AddCapteurValueDTO addCapteurValueDTO) {
        capteurValueService.addCapteurValue(addCapteurValueDTO);
    }

    @DeleteMapping("/deleteCapteurValue")
    public void deleteCapteurValue (@RequestParam UUID id) {
        capteurValueService.deleteCapteurValue(id);
    }
}
