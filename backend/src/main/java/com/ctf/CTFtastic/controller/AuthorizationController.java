package com.ctf.CTFtastic.controller;

import com.ctf.CTFtastic.jwt.JwtTokenUtil;
import com.ctf.CTFtastic.model.entity.Role;
import com.ctf.CTFtastic.model.request.SignupAdminRequest;
import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.model.request.LoginRequest;
import com.ctf.CTFtastic.model.request.SignupRequest;
import com.ctf.CTFtastic.repository.TeamRepository;
import com.ctf.CTFtastic.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthorizationController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    //Wstepnie
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private JwtTokenUtil jwtTokenUntil;

    @PostMapping(value = {"/register", "/signup"})
    @ResponseBody
    public ResponseEntity<Participant> registerUser(@RequestBody SignupRequest signupRequest){
        Participant participant = Participant.builder()
                .isHidden(false)
                .isCtfAdmin(false)
                .isVerified(false)
                .isTeamCapitan(false)
                .isBanned(false)
                //.team(teamRepository.findById(1))
                .country(signupRequest.getCountry())
                .affiliation(signupRequest.getAffiliation())
                .role(new Role(3,"ROLE_USER"))
                .email(signupRequest.getEmail())
                .passwordHash(passwordEncoder.encode(signupRequest.getPassword())).build();
        try{
            Participant user = userService.saveUser(participant);
            return ResponseEntity.ok(user);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with email exist");
        }
    }

    @PostMapping(value = {"/registerAdmin"})
    @ResponseBody
    public ResponseEntity<Participant> registerAdmin(@RequestBody SignupAdminRequest SignupAdminRequest){
        Participant participant = Participant.builder()
                .isHidden(true)
                .isCtfAdmin(true)
                .isVerified(false)
                .isTeamCapitan(false)
                .isBanned(false)
                //.team(teamRepository.findById(1))
                .country("country brak")
                .affiliation("affiliation brak")
                .role(new Role(1,"ROLE_CTF_ADMIN"))
                .email(SignupAdminRequest.getEmail())
                .passwordHash(passwordEncoder.encode(SignupAdminRequest.getPassword())).build();
        try{
            Participant user = userService.saveUser(participant);
            return ResponseEntity.ok(user);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with email exist");
        }
    }

    @PostMapping(value = {"/login", "/signin"})
    @ResponseBody
    public ResponseEntity<String> createToken(@RequestBody LoginRequest loginRequest){
        try{
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),loginRequest.getPassword()
                    )
            );

            //UserDetails userDetails = (UserDetails) authenticate.getPrincipal();

            var token = jwtTokenUntil.generateToken(loginRequest.getEmail());

            Map<String, String> elements =  new HashMap<>();
            elements.put("token",token);
            elements.put("role", userService.getRoleByEmail(loginRequest.getEmail()));
            elements.put("expireTime", "72000"); //potem zmienic żeby brał z prop

            ObjectMapper objectMapper = new ObjectMapper();

            String test = objectMapper.writeValueAsString(elements);

            return ResponseEntity.ok()
                    .body(test);
            //return ResponseEntity.ok("Dane Prrawidlowe");

        } catch (BadCredentialsException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        } catch (JsonProcessingException e){ //poprawić
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }
}
