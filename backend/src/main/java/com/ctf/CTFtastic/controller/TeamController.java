package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.jwt.JwtTokenUtil;
import com.ctf.CTFtastic.model.PageableOfT;
import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.model.entity.Role;
import com.ctf.CTFtastic.model.entity.Team;
import com.ctf.CTFtastic.model.projection.TeamDetailsVM;
import com.ctf.CTFtastic.model.projection.TeamForListVM;
import com.ctf.CTFtastic.model.projection.UserDetailsVM;
import com.ctf.CTFtastic.model.projection.UserForListVM;
import com.ctf.CTFtastic.model.request.CreateTeamRequest;
import com.ctf.CTFtastic.model.request.JoinTeamRequest;
import com.ctf.CTFtastic.model.request.LoginRequest;
import com.ctf.CTFtastic.service.TeamService;
import com.ctf.CTFtastic.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class TeamController {
    @Autowired
    private TeamService teamService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserService userService;

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
          elements.put("teamId", newTeam.getId().toString());

          ObjectMapper objectMapper = new ObjectMapper();
          String returnData = objectMapper.writeValueAsString(elements);

          return ResponseEntity.ok(returnData);
      }catch (Exception ex)
      {
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
      }
   }

    @PostMapping(value = {"/teams/join"})
    public ResponseEntity<String> create(@RequestBody JoinTeamRequest joinTeamRequest, Authentication authentication) {
        try {
            Optional<Participant> user = userService.findByEmail(authentication.getName());
            Optional<Team> team = teamService.findByName((joinTeamRequest.getName()));

            if (team.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }

            userService.update(user.get(), new Role(4, "ROLE_USER_WITH_TEAM"), team.get());
            //user = userService.findByEmail(authentication.getName());
            Map<String, String> elements =  new HashMap<>();
            elements.put("role", "ROLE_USER_WITH_TEAM");
            elements.put("teamId", team.get().getId().toString());

            ObjectMapper objectMapper = new ObjectMapper();
            String returnData = objectMapper.writeValueAsString(elements);

            return ResponseEntity.ok(returnData);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}

