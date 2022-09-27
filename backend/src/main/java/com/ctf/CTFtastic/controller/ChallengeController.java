package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.projection.ChallengeDetailsVM;
import com.ctf.CTFtastic.projection.ChallengeForListVM;
import com.ctf.CTFtastic.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class ChallengeController {
    @Autowired
    private ChallengeService challengeService;

    @RequestMapping(value = {"/challenges", "/challenges/"})
    public List<ChallengeForListVM> getAll() {
        return challengeService.getAllForListView();
    }

    @RequestMapping(value = {"challenge/{id}","challenge/{id}/"})
    public ChallengeDetailsVM getById(@PathVariable("id") int id){
        return challengeService.getById(id);
    }
}
