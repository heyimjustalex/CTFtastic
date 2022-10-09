package com.ctf.CTFtastic.service;

import com.ctf.CTFtastic.model.entity.Contest;
import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.repository.ContestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class ContestService {

    @Autowired
    ContestRepository contestRepository;

    public Contest saveContest(Contest contest) throws Exception {
        Contest newContest = contestRepository.save(contest);
        return newContest;
    }
}
