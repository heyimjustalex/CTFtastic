package com.ctf.CTFtastic.service;

import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.model.entity.Team;
import com.ctf.CTFtastic.model.projection.TeamDetailsVM;
import com.ctf.CTFtastic.model.projection.TeamForListVM;
import com.ctf.CTFtastic.model.projection.UserDetailsVM;
import com.ctf.CTFtastic.model.projection.UserWithIdAndName;
import com.ctf.CTFtastic.repository.ParticipantRepository;
import com.ctf.CTFtastic.repository.TeamRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        Team t = teamRepository.getByIdToView(id);

        List<Participant> user = t.getParticipants();


        List<UserWithIdAndName> users = new ArrayList<UserWithIdAndName>();
        for (Participant p:user) {
            users.add(UserWithIdAndName.builder()
                            .id(p.getId())
                            .name(p.getUsername())
                            .build());
        }

        TeamDetailsVM teamDeatials = TeamDetailsVM.builder()
                .name(t.getName())
                .points(t.getPoints())
                .website(t.getWebsite())
                .affiliation(t.getAffiliation())
                .users(users)
                .build();

        return teamDeatials;
    }

    public Team add(Team team) {
        Team team2 = teamRepository.saveAndFlush(team);
        return team2;
    }

    public Optional<Team> findById(int id) {
        return teamRepository.findById2(id);
    }

    public Optional<Team> findByName(String name) {
        return teamRepository.findByName(name);
    }
}
