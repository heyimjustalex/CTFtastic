package com.ctf.CTFtastic.controller;

import com.ctf.CTFtastic.jwt.JwtTokenUtil;
import com.ctf.CTFtastic.model.entity.Contest;
import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.model.entity.Role;
import com.ctf.CTFtastic.model.request.RegisterAdminAndCreateContestRequest;
import com.ctf.CTFtastic.model.request.SignupRequest;
import com.ctf.CTFtastic.service.ContestService;
import com.ctf.CTFtastic.service.UserService;
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

@RestController
public class SetUpController {
    @Value("${controller.set.up.aplikation}")
    boolean isEnableConfigureController;

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
                .build();

        try{
            Participant user = userService.saveUser(participant);
            Contest newContest = contestService.saveContest(contest);

        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Not good data");
        }

        try{
            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtTokenUtil.generateToken(participant.getEmail())
                    ).body(userService.getRoleByEmail(participant.getEmail()));

        } catch (BadCredentialsException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }
}
