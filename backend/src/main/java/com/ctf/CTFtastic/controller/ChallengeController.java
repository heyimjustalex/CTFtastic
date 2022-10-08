package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.model.projection.ChallengeDetailsVM;
import com.ctf.CTFtastic.model.projection.ChallengeForListVM;
import com.ctf.CTFtastic.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class ChallengeController {
    @Autowired
    private ChallengeService challengeService;

    @RequestMapping(value = {"/challenges", "/challenges/"})
    @PreAuthorize("hasAnyRole('ROLE_CTF_ADMIN','ROLE_USER','ROLE_TEAM_CAPITAN')")
    public List<ChallengeForListVM> getAll() {
        return challengeService.getAllForListView();
    }

    @RequestMapping(value = {"challenge/{id}","challenge/{id}/"})
    @PreAuthorize("hasAnyRole('ROLE_CTF_ADMIN','ROLE_USER','ROLE_TEAM_CAPITAN')")
    public ChallengeDetailsVM getById(@PathVariable("id") int id){
        return challengeService.getById(id);
    }
}
