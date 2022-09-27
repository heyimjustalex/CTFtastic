package com.ctf.CTFtastic.service;

import com.ctf.CTFtastic.projection.ChallengeDetailsVM;
import com.ctf.CTFtastic.projection.ChallengeForListVM;
import com.ctf.CTFtastic.repository.ChallengeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.util.List;

@Service
public class ChallengeService {
    @Autowired
    private ChallengeRepository challengeRepository;

    @Transient
    public List<ChallengeForListVM> getAllForListView(){
        return challengeRepository.getAllChallenges();
    }
    @Transient
    public ChallengeDetailsVM getByIdForView(int id) {
        return challengeRepository.getByIdToView(id);
    }

    public ChallengeDetailsVM getById(int id) {
        return challengeRepository.getByIdToView(id);
    }
}