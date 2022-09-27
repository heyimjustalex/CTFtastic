package com.ctf.CTFtastic.service;

import com.ctf.CTFtastic.entity.Participant;
import com.ctf.CTFtastic.projection.ChallengeDetailsVM;
import com.ctf.CTFtastic.projection.UserDetailsVM;
import com.ctf.CTFtastic.projection.UserForListVM;
import com.ctf.CTFtastic.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private ParticipantRepository participantRepository;

    @Transient
    public List<UserForListVM> getAllForListView(){
        return participantRepository.getUsers();
    }

    public UserDetailsVM getById(int id) {
        return participantRepository.getByIdToView(id);
    }
}
