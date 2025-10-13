package com.atsnum.kpi.Services;

import com.atsnum.kpi.DBModel.UserNumber;
import com.atsnum.kpi.DTO.AddUserNumberDTO;
import com.atsnum.kpi.Repositories.UserNumberRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserNumberService {

    @Autowired
    UserNumberRepo repo;

    public List<UserNumber> getUserNumbers () {
        return repo.findAll();
    }

    public UserNumber getUserNumberById (Integer integer){
        return repo.getReferenceById(integer);
    }

    public void addUserNumber (AddUserNumberDTO addUserNumberDTO) {
        repo.save(new UserNumber(null, addUserNumberDTO.getHourNumber(), addUserNumberDTO.getUserCount()));
    }

    public void deleteUserNumber (Integer integer) {
        repo.deleteById(integer);
    }
}
