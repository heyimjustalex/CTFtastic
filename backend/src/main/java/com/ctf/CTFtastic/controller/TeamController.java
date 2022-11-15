package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.jwt.JwtTokenUtil;
import com.ctf.CTFtastic.model.PageableOfT;
import com.ctf.CTFtastic.model.entity.*;
import com.ctf.CTFtastic.model.projection.TeamDetailsVM;
import com.ctf.CTFtastic.model.projection.TeamForListVM;
import com.ctf.CTFtastic.model.projection.UserDetailsVM;
import com.ctf.CTFtastic.model.projection.UserForListVM;
import com.ctf.CTFtastic.model.request.CreateTeamRequest;
import com.ctf.CTFtastic.model.request.JoinTeamRequest;
import com.ctf.CTFtastic.model.request.LoginRequest;
import com.ctf.CTFtastic.repository.ChallengeRepository;
import com.ctf.CTFtastic.service.SolutionService;
import com.ctf.CTFtastic.service.TeamEncoder;
import com.ctf.CTFtastic.service.TeamService;
import com.ctf.CTFtastic.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController
public class TeamController {
    @Autowired
    private TeamService teamService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserService userService;

    @Autowired
    private ChallengeRepository challengeRepository;
    @Autowired
    private SolutionService solutionService;
    @RequestMapping(value = {"/teams/{page}/{size}",})

    public PageableOfT<TeamForListVM> getAll(@PathVariable("page") int page, @PathVariable("size") int size) {
        Pageable pageable = PageRequest.of(page,size);
        Page<TeamForListVM> pageTeams = teamService.getAllForListView(pageable);

        List<TeamForListVM> teams = pageTeams.getContent();

        PageableOfT<TeamForListVM> teamToView = PageableOfT.<TeamForListVM>builder()
                .elements(teams)
                .currentPage(pageTeams.getNumber())
                .totalElements(pageTeams.getTotalElements())
                .totalPages(pageTeams.getTotalPages())
                .build();

        return teamToView;
    }

    @RequestMapping(value = {"/teams/{id}"})
    public TeamDetailsVM getById(@PathVariable("id") int id){
        return teamService.getById(id);
    }

   @PostMapping(value = {"/teams"})
   public ResponseEntity<String> create(@RequestBody CreateTeamRequest createTeamRequest, Authentication authentication){
      try {
          Optional<Participant> user = userService.findByEmail(authentication.getName());

          if (!user.get().getRole().getName().equals("ROLE_USER")){
              return ResponseEntity.status(HttpStatus.FORBIDDEN).body("{}");
          }

          Team team = Team.builder()
                 .name(createTeamRequest.getName())
                 .passwordHash(createTeamRequest.getPassword())
                 .affiliation(createTeamRequest.getAffiliation())
                 .website(createTeamRequest.getWebsite())
                 .points(0)
                 .isVerified(true)
                 .isBanned(false)
                 .build();

          Team newTeam = teamService.add(team);
          userService.update(user.get(),new Role(2,"ROLE_TEAM_CAPITAN"), newTeam);
          Map<String, String> elements =  new HashMap<>();
          elements.put("role", "ROLE_TEAM_CAPITAN");
          elements.put("idTeam", newTeam.getId().toString());

          ObjectMapper objectMapper = new ObjectMapper();
          String returnData = objectMapper.writeValueAsString(elements);

          //Create all solution
          List<Challenge> challenges = challengeRepository.getAllElements();
          List<Solution> solutions = new ArrayList<Solution>();
          String link = TeamEncoder.getSHA(newTeam.getName());
          for (Challenge c:challenges) {

              Solution solution = Solution.builder()
                      .challenge(c)
                      .team(newTeam)
                      .isSolved(false)
                      //.isContainerStarted(c.getDockerfile() == null ? null : false)
                      .link(link + "/" + c.getId())
                      .build();
              if(c.getDockerfile() != null){
                  solution.setIsContainerStarted(false);
              }

              solutions.add(solution);
          }

          solutionService.AddNewSolutionByTeam(solutions);

          return ResponseEntity.ok(returnData);
      }catch (Exception ex)
      {
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
      }
   }

    @PostMapping(value = {"/teams/join"})
    public ResponseEntity<String> join(@RequestBody JoinTeamRequest joinTeamRequest, Authentication authentication) {
        try {
            Optional<Participant> user = userService.findByEmail(authentication.getName());
            Optional<Team> team = teamService.findByName((joinTeamRequest.getName()));

            if (!user.get().getRole().getName().equals("ROLE_USER")){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("{}");
            }

            if (team.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }

            userService.update(user.get(), new Role(4, "ROLE_USER_WITH_TEAM"), team.get());
            //user = userService.findByEmail(authentication.getName());
            Map<String, String> elements =  new HashMap<>();
            elements.put("role", "ROLE_USER_WITH_TEAM");
            elements.put("idTeam", team.get().getId().toString());

            ObjectMapper objectMapper = new ObjectMapper();
            String returnData = objectMapper.writeValueAsString(elements);

            return ResponseEntity.ok(returnData);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = {"/teams/{id}"})
    public ResponseEntity<String> delete(@PathVariable("id") int id, Authentication authentication){
        try{
            Optional<Participant> user = userService.findByEmail(authentication.getName());
            if(user.isEmpty() || !user.get().getRole().getName().equals("ROLE_CTF_ADMIN")) {
                if (user.isEmpty() || !user.get().getRole().getName().equals("ROLE_TEAM_CAPITAN") || !user.get().getTeam().getId().equals(id)) {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN);
                }
            }
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        try {
            solutionService.deleteAllSolutionTeam(id);
            userService.deleteTeamAndUpdateRole(id);
            teamService.deleteTeam(id);

            return ResponseEntity.ok("{}");
        }catch(Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = {"/teams/{idTeam}/user/{idUser}"})
    public ResponseEntity<String> delete(@PathVariable("idTeam") int idTeam,@PathVariable("idUser") int idUser, Authentication authentication){
        try{
            Optional<Participant> user = userService.findByEmail(authentication.getName());
            Optional<Participant> userTeam = userService.findById(idUser);
            if (user.isEmpty() || userTeam.isEmpty() || !userTeam.get().getTeam().getId().equals(idTeam))
            {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
            if(userTeam.get().getRole().equals("ROLE_TEAM_CAPITAN")){
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
            if(!((user.get().getRole().getName().equals("ROLE_CTF_ADMIN") || (user.get().getTeam().getId().equals(idTeam) && user.get().getRole().getName().equals("ROLE_TEAM_CAPITAN")))))
            {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        try {
            userService.deleteTeamUser(idTeam,idUser);

            return ResponseEntity.ok("{}");
        }catch(Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}

