package com.atsnum.kpi.Repositories;

import com.atsnum.kpi.DBModel.UserNumber;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserNumberRepo extends JpaRepository<UserNumber, Integer> {
}
