package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.model.PageableOfT;
import com.ctf.CTFtastic.model.entity.*;
import com.ctf.CTFtastic.model.projection.ChallengeDatailsVM2;
import com.ctf.CTFtastic.model.projection.ChallengeDetailsVM;
import com.ctf.CTFtastic.model.projection.ChallengeForListVM;
import com.ctf.CTFtastic.model.request.ChangeChallengeVisableRequest;
import com.ctf.CTFtastic.model.request.ChangePasswordRequest;
import com.ctf.CTFtastic.model.request.CheckFlagRequest;
import com.ctf.CTFtastic.model.request.CreateChallangeRequest;
import com.ctf.CTFtastic.repository.TeamRepository;
import com.ctf.CTFtastic.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import jdk.swing.interop.SwingInterOpUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;
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

    @Autowired
    private UploadService uploadService;

    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private SolutionService solutionService;

    @Autowired
    private SubmitService submitService;

    @RequestMapping(value = {"/challenges/{page}/{size}"})
    public PageableOfT<ChallengeForListVM> getAll(@PathVariable("page") int page, @PathVariable("size") int size, Authentication authentication) {

        try {
            Role duty = null;
            if(authentication != null) {
                Optional<Participant> user = userService.findByEmail(authentication.getName());
                duty = user.get().getRole();
            }
            Pageable pageable = PageRequest.of(page,size);

            List<ChallengeForListVM> list = Collections.emptyList();
            Page<ChallengeForListVM> pageChallenges = new PageImpl<>(list);

            if(duty != null && duty.getName().equals("ROLE_CTF_ADMIN")){
                pageChallenges = challengeService.getAllForListView(pageable, false);
            }
            else{
                if(contestService.getById(1).isHasStarted()) {
                    pageChallenges = challengeService.getAllForListView(pageable, true);
                }
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
    public ChallengeDatailsVM2 getById(@PathVariable("id") int id, Authentication authentication){
        int team = 0;
        try {
            if (authentication != null) {
                Optional<Participant> user = userService.findByEmail(authentication.getName());
                team = user.get().getTeam().getId();
            }
        }catch (Exception ex){}
        try {
            ChallengeDetailsVM challengeDetailsVM = challengeService.getById(id);
            ChallengeDatailsVM2 challengeDatailsVM2 = ChallengeDatailsVM2.builder()
                    .name(challengeDetailsVM.getName())
                    .category(challengeDetailsVM.getCategory())
                    .description(challengeDetailsVM.getDescription())
                    .isVisible(challengeDetailsVM.getIsVisible())
                    .points(challengeDetailsVM.getPoints())
                    .build();
            if(team != 0){
                Solution solution = solutionService.findByTeamAndId(id,team);
                challengeDatailsVM2.setLink("/" + solution.getLink());
                challengeDatailsVM2.setIsSolved(solution.getIsSolved());
            }
            return challengeDatailsVM2;
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = {"challenges"})
    @ResponseBody
    public ResponseEntity<String> createChallange(@ModelAttribute CreateChallangeRequest createChallangeRequest, @RequestParam(value ="dockerfile", required=false) MultipartFile dockerfile, Authentication authentication)
    {
        byte[] filecode = null;
        try {
            Optional<Participant> user = userService.findByEmail(authentication.getName());

            if (user.isEmpty() || !user.get().getRole().getName().equals("ROLE_CTF_ADMIN")) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        try{
            //String fileName = StringUtils.cleanPath(Objects.requireNonNull(createChallangeRequest.getDockerfile().getOriginalFilename()));
            //long size = createChallangeRequest.getDockerfile().getSize();
            //filecode = UploadService.saveFile(fileName, createChallangeRequest.getDockerfile());
            filecode = dockerfile.getBytes();

        }catch (Exception ex){
            //throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
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
                    .dockerfile(filecode)
                    .build();

            Challenge challenge = challengeService.addChallage(newChallange);

            Map<String, String> elements =  new HashMap<>();
            elements.put("idChallange", challenge.getId().toString());

            ObjectMapper objectMapper = new ObjectMapper();
            String returnData = objectMapper.writeValueAsString(elements);

            //Create all solution
            List<Team> teams = teamRepository.getAllTeams();
            List<Solution> solutions = new ArrayList<Solution>();
            for (Team t:teams) {
                String link = RandomStringUtils.randomAlphanumeric(20);
                Solution solution = Solution.builder()
                        .challenge(challenge)
                        .team(t)
                        .isSolved(false)
                        .link(link)
                        .build();
                solutions.add(solution);
            }

            solutionService.AddNewSolutionByTeam(solutions);

            return ResponseEntity.ok().body(returnData);
        }catch (Exception ex){
            System.out.println(ex.getMessage());
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

    @RequestMapping(value = {"challenges/{id}/flag"})
    public ResponseEntity<String> changeVisable(@PathVariable("id") int id, @RequestBody CheckFlagRequest checkFlagRequest, Authentication authentication) {
        Participant user2 = null;
        Solution solution = null;
        Challenge challenge = null;
        try{
            Optional<Participant> user = userService.findByEmail(authentication.getName());
            user2 = user.get();
            solution = solutionService.findByTeamAndId(id,user.get().getTeam().getId());
            challenge = challengeService.getById2(solution.getChallenge().getId()).get();

            if (!(user.get().getRole().getName().equals("ROLE_USER_WITH_TEAM") || user.get().getRole().getName().equals("ROLE_TEAM_CAPITAN"))) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
            if(solution.getIsSolved().equals(true)){
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }

        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        try{
            String flagInDataBase = challenge.getFlag();
            String flagGetByUser = checkFlagRequest.getFlag();

            Boolean isGood = passwordEncoder.matches(flagGetByUser, flagInDataBase);
            Submit submit = Submit.builder()
                    .challenge(challenge)
                    .participant(user2)
                    .time(LocalDateTime.now())
                    .isCorrect(isGood)
                    .build();

            submitService.Add(submit);

            if(!isGood){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }
            solution.setIsSolved(true);
            solutionService.update(solution);

            return ResponseEntity.ok().body("{}");


        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

    }
}
