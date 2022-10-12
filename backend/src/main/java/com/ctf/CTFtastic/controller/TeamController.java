package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.model.projection.TeamForListVM;
import com.ctf.CTFtastic.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class TeamController {
    @Autowired
    private TeamService teamService;
    @PreAuthorize("hasAnyRole('ROLE_CTF_ADMIN','ROLE_USER','ROLE_TEAM_CAPITAN')")
    @RequestMapping(value = {"/teams","/teams/"})

    public List<TeamForListVM> getAll() {
        return teamService.getAllForListView();
    }
}

