package com.atsnum.kpi.Controllers;

import com.atsnum.kpi.DBModel.User;
import com.atsnum.kpi.DTO.*;
import com.atsnum.kpi.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public RegisterResponseDTO getUsers (@RequestBody RegisterRequestDTO registerRequestDTO) {
        return userService.register(registerRequestDTO);
    }

    @PostMapping("/login")
    public LoginResponseDTO login (@RequestBody LoginRequestDTO loginRequestDTO) {
        return userService.login(loginRequestDTO);
    }

    @GetMapping("/getAllUsers")
    public List<User> getUsers () { return userService.getUsers(); }

    @GetMapping("/getUser")
    public User getUser (@RequestParam UUID id) { return userService.getUser(id); }

    @PutMapping("/modifyPassword")
    public void modifyPassword (@RequestBody UserPasswordChangeDTO userPasswordChangeDTO) { userService.putPassword(userPasswordChangeDTO); }

    @DeleteMapping("/deleteUser")
    public void deleteUser (@RequestParam UUID id) { userService.deleteUser(id); }

    @PostMapping("/verify")
    public VerifyUserResponseDTO verifyUser (@RequestBody VerificationRequestDTO request) {
        return (userService.verifyUser(request.getId(), request.getCode()));
    }

    @PostMapping("/resend")
    public void resendCode (@RequestBody ResendRequestDTO request) {
        userService.updateVerificationCode(request.getId());
    }
}
