package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.model.PageableOfT;
import com.ctf.CTFtastic.model.entity.Challenge;
import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.model.entity.Role;
import com.ctf.CTFtastic.model.projection.ChallengeDetailsVM;
import com.ctf.CTFtastic.model.projection.ChallengeForListVM;
import com.ctf.CTFtastic.model.request.ChangeChallengeVisableRequest;
import com.ctf.CTFtastic.model.request.ChangePasswordRequest;
import com.ctf.CTFtastic.model.request.CreateChallangeRequest;
import com.ctf.CTFtastic.service.ChallengeService;
import com.ctf.CTFtastic.service.ContestService;
import com.ctf.CTFtastic.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.security.RolesAllowed;
import java.util.*;

@RestController
public class ChallengeController {
    @Autowired
    private ChallengeService challengeService;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ContestService contestService;

    @RequestMapping(value = {"/challenges/{page}/{size}"})
    public PageableOfT<ChallengeForListVM> getAll(@PathVariable("page") int page, @PathVariable("size") int size, Authentication authentication) {

        try {
            Role duty = null;
            if(authentication != null) {
                Optional<Participant> user = userService.findByEmail(authentication.getName());
                duty = user.get().getRole();
            }
            Pageable pageable = PageRequest.of(page,size);

            Page<ChallengeForListVM> pageChallenges;
            if(duty != null && duty.getName().equals("ROLE_CTF_ADMIN")){
                pageChallenges = challengeService.getAllForListView(pageable, false);
            }
            else{
                pageChallenges = challengeService.getAllForListView(pageable, true);
            }


            List<ChallengeForListVM> challanges = pageChallenges.getContent();

            PageableOfT<ChallengeForListVM> challangeToView = PageableOfT.<ChallengeForListVM>builder()
                    .elements(challanges)
                    .currentPage(pageChallenges.getNumber())
                    .totalElements(pageChallenges.getTotalElements())
                    .totalPages(pageChallenges.getTotalPages())
                    .build();

            return challangeToView;





        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(value = {"challenges/{id}"})
    public ChallengeDetailsVM getById(@PathVariable("id") int id){
        return challengeService.getById(id);
    }

    @RequestMapping(value = {"challenges/add-challenge"})
    //@PreAuthorize("hasAnyRole('ROLE_CTF_ADMIN')")
    @ResponseBody
    //@Role(value = "")
    public ResponseEntity<String> createChallange(@RequestBody CreateChallangeRequest createChallangeRequest, Authentication authentication){
        try {
            Optional<Participant> user = userService.findByEmail(authentication.getName());

            if (user.isEmpty() || !user.get().getRole().getName().equals("ROLE_CTF_ADMIN")) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        try{
            Challenge newChallange = Challenge.builder()
                    .contest(contestService.getById(1)) //Narazie tak
                    .name(createChallangeRequest.getName())
                    .category(createChallangeRequest.getCategory())
                    .description(createChallangeRequest.getDescription())
                    .points(createChallangeRequest.getPoints())
                    .flag(passwordEncoder.encode(createChallangeRequest.getFlag()))
                    .isCaseSensitive(createChallangeRequest.getIsCaseSensitive())
                    .isVisible(createChallangeRequest.getIsVisible())
                    //.file(createChallangeRequest.getFile())
                    //.dockerfile(createChallangeRequest.getDockerfile())
                    .build();

            Challenge challenge = challengeService.addChallage(newChallange);

            Map<String, String> elements =  new HashMap<>();
            elements.put("idChallange", challenge.getId().toString());

            ObjectMapper objectMapper = new ObjectMapper();
            String returnData = objectMapper.writeValueAsString(elements);

            return ResponseEntity.ok().body(returnData);
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping(value = {"challenges/{id}"})
    public ResponseEntity<String> changeVisable(@PathVariable("id") int id, @RequestBody ChangeChallengeVisableRequest changeChallengeVisableRequest, Authentication authentication){
        try{
            Optional<Participant> user = userService.findByEmail(authentication.getName());

            if (user.isEmpty() || !user.get().getRole().getName().equals("ROLE_CTF_ADMIN")) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        try{
            challengeService.updateVisable(changeChallengeVisableRequest.getIsVisible(), id);
            return ResponseEntity.ok().body("{}");
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}
