package com.atsnum.kpi.Services;

import com.atsnum.kpi.DBModel.User;
import com.atsnum.kpi.DTO.*;
import com.atsnum.kpi.Repositories.UserRepo;
import com.atsnum.kpi.Security.JwtUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;


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
                passwordEncoder.encode(userPasswordChangeDTO.getPassword()),
                user.getVerificationCode(),
                user.getVerificationCodeExpiresAt(),
                user.isEnabled()));
    }

    public void deleteUser (Integer id) {
        userRepo.deleteById(id);
    }

    public RegisterResponseDTO register (RegisterRequestDTO registerRequestDTO) {
        User newUser = new User(null,
                registerRequestDTO.getUsername(),
                registerRequestDTO.getEmail(),
                passwordEncoder.encode(registerRequestDTO.getPassword()),
                generateVerificationCode(),
                LocalDateTime.now().plusMinutes(15),
                false);

        User savedUser = userRepo.save(newUser);
        sendVerificationEmail(savedUser);

        return new RegisterResponseDTO(savedUser.getId());
    }

    public void registerInsider (RegisterRequestDTO registerRequestDTO) {
        User newUser = new User(null,
                registerRequestDTO.getUsername(),
                registerRequestDTO.getEmail(),
                passwordEncoder.encode(registerRequestDTO.getPassword()),
                null,
                null,
                true);

        User savedUser = userRepo.save(newUser);
    }

    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
        String token;

        User user = userRepo.findByEmail(loginRequestDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Username or password is incorrect");
        }

        if (user.isEnabled()) {
            token = jwtUtil.generateToken(user.getId());
        }
        else {
            token = null;
            updateVerificationCode(user.getId());
        }

        return new LoginResponseDTO(token,
                user.getId(),
                user.isEnabled());
    }

    public void updateVerificationCode (Integer id) {
        User user = userRepo.getReferenceById(id);
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
        userRepo.save(user);
        sendVerificationEmail(user);
    }

    public String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(1_000_000);
        return String.format("%06d", code);
    }

    public VerifyUserResponseDTO verifyUser (Integer id, String code) {
        User user = userRepo.getReferenceById(id);

        if (!code.equals(user.getVerificationCode())) {
            throw new RuntimeException("The verification code is incorrect");
        }
        if (LocalDateTime.now().isAfter(user.getVerificationCodeExpiresAt())) {
            throw new RuntimeException("This verification code is expired");
        }

        user.setEnabled(true);
        userRepo.save(user);

        return (new VerifyUserResponseDTO(jwtUtil.generateToken(user.getId())));
    }

    public void sendVerificationEmail(User user){
        String subject = "Account Verification";
        String verificationCode = user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";
        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e){
            e.printStackTrace();
        }
    }
}
