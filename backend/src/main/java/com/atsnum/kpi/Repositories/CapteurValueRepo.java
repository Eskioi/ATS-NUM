package com.atsnum.kpi.Repositories;

import com.atsnum.kpi.DBModel.Capteur;
import com.atsnum.kpi.DBModel.CapteurValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CapteurValueRepo extends JpaRepository<CapteurValue, UUID> {
    List<CapteurValue> findByCapteurId(UUID machineId);
}
