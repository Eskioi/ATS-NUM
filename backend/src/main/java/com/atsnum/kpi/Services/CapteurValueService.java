package com.atsnum.kpi.Services;

import com.atsnum.kpi.DBModel.CapteurValue;
import com.atsnum.kpi.DTO.AddCapteurValueDTO;
import com.atsnum.kpi.Repositories.CapteurValueRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CapteurValueService {
    @Autowired
    CapteurValueRepo repo;

    public List<CapteurValue> getCapteurValues () {
        return repo.findAll();
    }

    public List<CapteurValue> getCapteurValuesByCapteurId (UUID id) {
        return repo.findByCapteurId(id);
    }

    public void addCapteurValue (AddCapteurValueDTO addCapteurValueDTO) {
        repo.save( new CapteurValue(
                null,
                addCapteurValueDTO.getCapteurId(),
                addCapteurValueDTO.getValue(),
                addCapteurValueDTO.getDateTime()
        ));
    }

    public void deleteCapteurValue (UUID id) {
        repo.deleteById(id);
    }
}
