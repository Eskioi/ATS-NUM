package com.atsnum.kpi.Repositories;

import com.atsnum.kpi.DBModel.Capteur;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CapteurRepo extends JpaRepository<Capteur, UUID> {
    List<Capteur> findByMachineId(UUID machineId);
}
