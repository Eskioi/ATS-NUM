package com.atsnum.kpi.Controllers;

import com.atsnum.kpi.DBModel.UserNumber;
import com.atsnum.kpi.DTO.AddUserNumberDTO;
import com.atsnum.kpi.Services.UserNumberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserNumberController {

    @Autowired
    UserNumberService userNumberService;

    @GetMapping("userNumber/getAllUserNumbers")
    public List<UserNumber> getUserNumbers () {
        return userNumberService.getUserNumbers();
    }

    @GetMapping("userNumber/getUserNumber")
    public UserNumber getUserNumber (@RequestParam Integer id) {
        return userNumberService.getUserNumberById(id);
    }

    @PostMapping("userNumber/addUserNumber")
    public void addUserNumber (@RequestBody AddUserNumberDTO addUserNumberDTO) {
        userNumberService.addUserNumber(addUserNumberDTO);
    }

    @DeleteMapping("userNumber/deleteUserNumber")
    public void deleteUserNumber (@RequestParam Integer id) {
        userNumberService.deleteUserNumber(id);
    }
}
