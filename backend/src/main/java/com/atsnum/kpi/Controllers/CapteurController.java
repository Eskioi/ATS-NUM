    package com.atsnum.kpi.Controllers;

    import com.atsnum.kpi.DBModel.Capteur;
    import com.atsnum.kpi.DTO.AddCapteurDTO;
    import com.atsnum.kpi.DTO.CapteurIdDTO;
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

        @PostMapping("/getAllCapteursByMachineId")
        public List<Capteur> getCapteursByMachineId (@RequestBody CapteurIdDTO id) {
            return capteurService.getCapteursByMachineId(id.getId());
        }

        @PostMapping("/addCapteur")
        public void addCapteur (@RequestBody AddCapteurDTO addCapteurDTO) {
            capteurService.addCapteur(addCapteurDTO);
        }

        @DeleteMapping("/deleteCapteur")
        public void deleteCapteur (@RequestBody CapteurIdDTO id) {
            capteurService.deleteCapteur(id.getId());
        }
    }
