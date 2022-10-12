package com.ctf.CTFtastic.service;

import com.ctf.CTFtastic.model.projection.TeamForListVM;
import com.ctf.CTFtastic.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.util.List;

@Service
public class TeamService {
    @Autowired
    private TeamRepository teamrepository;

    @Transient
    public List<TeamForListVM> getAllForListView(){
        return teamrepository.getTeams();
    }
}
