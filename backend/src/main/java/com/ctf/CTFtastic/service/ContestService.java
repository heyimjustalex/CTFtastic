package com.ctf.CTFtastic.service;

import com.ctf.CTFtastic.model.entity.Contest;
import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.model.projection.ContestForListVM;
import com.ctf.CTFtastic.model.projection.TeamForListVM;
import com.ctf.CTFtastic.repository.ContestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public Page<ContestForListVM> getAllForListView(Pageable pageable) {
        return contestRepository.getAll(pageable);
    }

    public Contest getById(Integer id){
        return contestRepository.getById(id);
    }
}
