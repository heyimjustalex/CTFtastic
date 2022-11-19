package com.ctf.CTFtastic.controller;

import com.ctf.CTFtastic.jwt.JwtTokenUtil;
import com.ctf.CTFtastic.model.entity.Contest;
import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.model.entity.Role;
import com.ctf.CTFtastic.model.request.RegisterAdminAndCreateContestRequest;
import com.ctf.CTFtastic.model.request.SignupRequest;
import com.ctf.CTFtastic.service.ContestService;
import com.ctf.CTFtastic.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
public class SetUpController {
    //@Value("${controller.set.up.aplikation}")
    //boolean isEnableConfigureController;

    @Autowired
    private UserService userService;
    @Autowired
    private ContestService contestService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @PostMapping(value = {"/set-up",})
    @ResponseBody
    public ResponseEntity<String> setUpAplikation(@RequestBody RegisterAdminAndCreateContestRequest registerAdminAndCreateContestRequest) {
        Participant participant = Participant.builder()
                .isHidden(true)
                .username(registerAdminAndCreateContestRequest.getUsername())
                .isCtfAdmin(true)
                .isVerified(true)
                .isTeamCapitan(false)
                .isBanned(false)
                //.team(teamRepository.findById(1))
                .country(registerAdminAndCreateContestRequest.getCountry())
                .affiliation(registerAdminAndCreateContestRequest.getAffiliation())
                .role(new Role(1,"ROLE_CTF_ADMIN"))
                .email(registerAdminAndCreateContestRequest.getEmail())
                .passwordHash(passwordEncoder.encode(registerAdminAndCreateContestRequest.getPassword())).build();

        Contest contest = Contest.builder()
                .startTime(registerAdminAndCreateContestRequest.getStartTime())
                .startTimeUtc(registerAdminAndCreateContestRequest.getStartTimeUtf())
                .endTime(registerAdminAndCreateContestRequest.getEndTime())
                .endTimeUtc(registerAdminAndCreateContestRequest.getEndTimeUtf())
                .title(registerAdminAndCreateContestRequest.getTitle())
                .description(registerAdminAndCreateContestRequest.getDescription())
                .build();

        try{
            Participant user = userService.saveUser(participant);
            Contest newContest = contestService.saveContest(contest);

        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Not good data");
        }
        try{
            Map<String, String> elements =  new HashMap<>();
            elements.put("role", participant.getRole().getName());
            elements.put("token",jwtTokenUtil.generateToken(participant.getEmail()));
            elements.put("expireTime", "72000");
            ObjectMapper objectMapper = new ObjectMapper();
            String returnData = objectMapper.writeValueAsString(elements);

            return ResponseEntity.ok()
                    //.header(
                    //        HttpHeaders.AUTHORIZATION,
                    //        jwtTokenUtil.generateToken(participant.getEmail()))
                    .body(returnData);

        } catch (BadCredentialsException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }
}
