package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.jwt.JwtTokenUtil;
import com.ctf.CTFtastic.model.PageableOfT;
import com.ctf.CTFtastic.model.entity.Team;
import com.ctf.CTFtastic.model.projection.TeamDetailsVM;
import com.ctf.CTFtastic.model.projection.TeamForListVM;
import com.ctf.CTFtastic.model.projection.UserDetailsVM;
import com.ctf.CTFtastic.model.projection.UserForListVM;
import com.ctf.CTFtastic.model.request.CreateTeamRequest;
import com.ctf.CTFtastic.model.request.LoginRequest;
import com.ctf.CTFtastic.service.TeamService;
import com.ctf.CTFtastic.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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

   //@PostMapping(value = {"/teams"})
   //public ResponseEntity<String> create(@RequestBody CreateTeamRequest createTeamRequest, @RequestHeader("AUTHORIZATION") String token){
   //    Team team = Team.builder()
   //            .name(createTeamRequest.getName())
   //            .passwordHash(createTeamRequest.getPassword())
   //            .affiliation(createTeamRequest.getAffiliation())
   //            .website(createTeamRequest.getWebsite())
   //            .points(0)
   //            .isVerified(true)
   //            .isBanned(false)
   //            .build();

   //    if (token != null && token.startsWith("Bearer ")) {
   //        token = token.substring(7);
   //        try {
   //            String name = jwtTokenUtil.getUsernameFromToken(jwtToken);
   //        } catch (IllegalArgumentException e) {
   //            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
   //        } catch (ExpiredJwtException e) {
   //            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
   //        }
   //    } else {
   //        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
   //    }
   //
   //    userService.updateUserRoleAndTeam();


   //}
}

