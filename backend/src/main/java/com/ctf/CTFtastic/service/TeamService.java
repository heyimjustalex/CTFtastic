package com.ctf.CTFtastic.service;

import com.ctf.CTFtastic.model.projection.TeamDetailsVM;
import com.ctf.CTFtastic.model.projection.TeamForListVM;
import com.ctf.CTFtastic.model.projection.UserDetailsVM;
import com.ctf.CTFtastic.repository.ParticipantRepository;
import com.ctf.CTFtastic.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.util.List;

@Service
public class TeamService {
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private ParticipantRepository participantRepository;

    @Transient
    public Page<TeamForListVM> getAllForListView(Pageable pageable){
        return teamRepository.getTeams(pageable);
    }

    public TeamDetailsVM getById(int id) {
        TeamDetailsVM teamDeatials = teamRepository.getByIdToView(id);
        //System.out.println(participantRepository.getAllUserByTeamName(teamDeatials.getName()).size());
        //teamDeatials.getUsers().addAll(participantRepository.getAllUserByTeamName(teamDeatials.getName()));
        return teamDeatials;
    }
}
