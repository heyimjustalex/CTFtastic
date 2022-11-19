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
import java.util.Optional;

@Service
public class ChallengeService {
    @Autowired
    private ChallengeRepository challengeRepository;

    @Transient
    public Page<ChallengeForListVM> getAllForListView(Pageable pageable, boolean isVisiable){
        if(isVisiable)
            return challengeRepository.getAllChallenges(pageable, isVisiable);
        return challengeRepository.getAllChallenges2(pageable);
    }
    @Transient
    public ChallengeDetailsVM getByIdForView(int id) {
        return challengeRepository.getByIdToView(id);
    }

    public ChallengeDetailsVM getById(int id) {
        return challengeRepository.getByIdToView(id);
    }

    public Optional<Challenge> getById2(int id) {
        return challengeRepository.findById(id);
    }

    public Challenge addChallage(Challenge newChallange) {
        Challenge challenge = challengeRepository.saveAndFlush(newChallange);
        return challenge;
    }

    public void updateVisable(boolean visable, int id) {
        challengeRepository.updateVisable(visable, id);
    }

    public List<String> getAllChallanges(boolean isVisable) {
        return challengeRepository.getAllChallengesNames(isVisable);
    }

    public Challenge getChallange(int id){
        return challengeRepository.getChallengeAllValueById(id);
    }

    public void updateBuild(String started, int id) {
        challengeRepository.updateBuild(started,id);
    }

    public List<Challenge> getAllChallanges2(boolean b) {
        return challengeRepository.getAllChallenges3(b);
    }
}