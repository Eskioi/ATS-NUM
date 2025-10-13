package com.atsnum.kpi.Repositories;

import com.atsnum.kpi.DBModel.Machine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MachineRepo extends JpaRepository<Machine, Integer> {

}
