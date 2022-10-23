package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.model.PageableOfT;
import com.ctf.CTFtastic.model.projection.TeamDetailsVM;
import com.ctf.CTFtastic.model.projection.TeamForListVM;
import com.ctf.CTFtastic.model.projection.UserDetailsVM;
import com.ctf.CTFtastic.model.projection.UserForListVM;
import com.ctf.CTFtastic.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TeamController {
    @Autowired
    private TeamService teamService;
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
}

