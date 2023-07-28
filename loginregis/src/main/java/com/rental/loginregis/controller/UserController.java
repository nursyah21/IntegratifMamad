package com.rental.loginregis.controller;

import com.rental.loginregis.jwt.JwtTokenUtility;
import com.rental.loginregis.model.LoginInfo;
import com.rental.loginregis.model.LoginResponse;
import com.rental.loginregis.model.RegistrationModel;
import com.rental.loginregis.model.UserInfo;
import com.rental.loginregis.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class UserController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenUtility jwtTokenUtility;

    @Autowired
    UserInfoRepository userInfoRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody LoginInfo loginInfo){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginInfo.getUsername(), loginInfo.getPassword())
        );

        UserInfo user = (UserInfo) authentication.getPrincipal();
        String accessToken = jwtTokenUtility.generateAccessToken(user);
        LoginResponse loginResponse = new LoginResponse(user.getUsername(), accessToken);

        return ResponseEntity.ok(loginResponse);
    }

    @CrossOrigin
    @PostMapping("/registration")
    public ResponseEntity<?>registration (@RequestBody @Valid RegistrationModel registrationModel){
        if(userInfoRepository.findByUsername(registrationModel.getUsername()).isPresent()){
            return  new ResponseEntity<String>("user already exist", HttpStatus.BAD_REQUEST); //new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        userInfoRepository.save(setupNewUser(registrationModel));
        return new ResponseEntity<>("success create user",HttpStatus.CREATED);
    }

    public UserInfo setupNewUser(RegistrationModel registrationModel){
        UserInfo newUser = new UserInfo(
            registrationModel.getUsername(),
            passwordEncoder.encode(registrationModel.getPassword()),
            registrationModel.getNamaKaryawan(),
            registrationModel.getNikKaryawan(),
            registrationModel.getTelpKaryawan(),
            registrationModel.getAlamatKaryawan(),
            registrationModel.getRoleKaryawan()
        );

        // UserInfo newUser = new UserInfo();
        // newUser.setUsername(registrationModel.getUsername());
        // newUser.setPassword(passwordEncoder.encode(registrationModel.getPassword()));
        // newUser.setNamaKaryawan(registrationModel.getNamaKaryawan());
        // newUser.setNikKaryawan(registrationModel.getNikKaryawan());
        // newUser.setTelpKaryawan(registrationModel.getTelpKaryawan());
        // newUser.setAlamatKaryawan(registrationModel.getAlamatKaryawan());
        // newUser.setRoleKaryawan(registrationModel.getRoleKaryawan());
        return newUser;
    }
}
