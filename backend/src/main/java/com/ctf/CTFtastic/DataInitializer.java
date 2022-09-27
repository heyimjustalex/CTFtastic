package com.ctf.CTFtastic;

import com.ctf.CTFtastic.entity.Contest;
import com.ctf.CTFtastic.repository.ContestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataInitializer {

    @Autowired
    ContestRepository contestRepository;

    @PostConstruct
    private synchronized void init() {

        //LocalDateTime rightNow = LocalDateTime.now();
        //Contest contest = Contest.builder().startTime(rightNow).endTime(rightNow).build();
        //contestRepository.save(contest);
        //List<Contest> all = contestRepository.findAll();
        //System.out.println(all);
    }




}
