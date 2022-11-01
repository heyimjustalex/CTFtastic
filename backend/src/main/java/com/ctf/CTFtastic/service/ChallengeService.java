package com.ctf.CTFtastic.service;

import com.ctf.CTFtastic.model.entity.Challenge;
import com.ctf.CTFtastic.model.entity.Team;
import com.ctf.CTFtastic.model.projection.ChallengeDetailsVM;
import com.ctf.CTFtastic.model.projection.ChallengeForListVM;
import com.ctf.CTFtastic.repository.ChallengeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.util.List;

@Service
public class ChallengeService {
    @Autowired
    private ChallengeRepository challengeRepository;

    @Transient
    public Page<ChallengeForListVM> getAllForListView(Pageable pageable){
        return challengeRepository.getAllChallenges(pageable);
    }
    @Transient
    public ChallengeDetailsVM getByIdForView(int id) {
        return challengeRepository.getByIdToView(id);
    }

    public ChallengeDetailsVM getById(int id) {
        return challengeRepository.getByIdToView(id);
    }

    public Challenge addChallage(Challenge newChallange) {
        Challenge challenge = challengeRepository.saveAndFlush(newChallange);
        return challenge;
    }
}