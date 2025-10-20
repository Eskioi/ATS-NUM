package com.atsnum.kpi.Services;

import com.atsnum.kpi.DBModel.User;
import com.atsnum.kpi.DTO.*;
import com.atsnum.kpi.Repositories.UserRepo;
import com.atsnum.kpi.Security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public List<User> getUsers () {
        return userRepo.findAll();
    }

    public User getUser (Integer id) {
        return userRepo.getReferenceById(id);
    }

    public void putPassword (UserPasswordChangeDTO userPasswordChangeDTO) {
        User user = userRepo.getReferenceById(userPasswordChangeDTO.getId());
        userRepo.deleteById(userPasswordChangeDTO.getId());
        userRepo.save(new User(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                passwordEncoder.encode(userPasswordChangeDTO.getPassword())));
    }

    public void deleteUser (Integer id) {
        userRepo.deleteById(id);
    }

    public LoginResponseDTO register (RegisterRequestDTO registerRequestDTO) {
        User newUser = new User(null,
                registerRequestDTO.getUsername(),
                registerRequestDTO.getEmail(),
                passwordEncoder.encode(registerRequestDTO.getPassword()));

        User savedUser = userRepo.save(newUser);

        return new LoginResponseDTO(jwtUtil.generateToken(savedUser.getId()));
    }

    public LoginResponseDTO login (LoginRequestDTO loginRequestDTO) {
        User user = userRepo.findByEmail(loginRequestDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
            return new LoginResponseDTO(jwtUtil.generateToken(user.getId()));
        } else {
            throw new RuntimeException("Username or password is incorrect");
        }

    }
}
