package com.ctf.CTFtastic.controller;

import com.ctf.CTFtastic.Passwordconfig;
import com.ctf.CTFtastic.jwt.JwtTokenUtil;
import com.ctf.CTFtastic.model.entity.Role;
import com.ctf.CTFtastic.model.projection.UserDetailsVM;
import com.ctf.CTFtastic.model.userr;
import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.model.request.LoginRequest;
import com.ctf.CTFtastic.model.request.SignupRequest;
import com.ctf.CTFtastic.repository.ParticipantRepository;
import com.ctf.CTFtastic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class AuthorizationController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUntil;

    @PostMapping(value = {"/signup", "/signup/"})
    @ResponseBody
    public ResponseEntity<Participant> registerUser(@RequestBody SignupRequest signupRequest){
        Participant participant = Participant.builder()
                .isHidden(false)
                .isCtfAdmin(false)
                .isVerified(false)
                .isTeamCapitan(false)
                .isBanned(false)
                .role(new Role(1,"ROLE_USER"))
                .email(signupRequest.getEmail())
                .passwordHash(passwordEncoder.encode(signupRequest.getPassword())).build();
        try{
            Participant user = userService.saveUser(participant);
            return ResponseEntity.ok(user);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with email exist");
        }
    }

    @PostMapping(value = {"/signin", "/signin/"})
    @ResponseBody
    public ResponseEntity<UserDetailsVM> createToken(@RequestBody LoginRequest loginRequest){
        try{
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),loginRequest.getPassword()
                    )
            );

            //UserDetails userDetails = (UserDetails) authenticate.getPrincipal();

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtTokenUntil.generateToken(loginRequest.getEmail())
                    ).body(userService.getByEmail(loginRequest.getEmail()));
            //return ResponseEntity.ok("Dane Prrawidlowe");

        } catch (BadCredentialsException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }
}
