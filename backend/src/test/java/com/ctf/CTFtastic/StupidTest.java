package com.ctf.CTFtastic;

import com.ctf.CTFtastic.model.entity.Contest;

import com.ctf.CTFtastic.repository.ContestRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
public class StupidTest {
    //Test jest spierdolony przez to wylaczone lazy loading (patrz na encje i na adnotacje przy listach)
    // On zapisuje podwójnie do bazy danych przez to
    // Z włączonym lazy loading leci exception

    @Autowired
    ContestRepository contestRepository;

    @Test
    public void test() {
        LocalDateTime rightNow = LocalDateTime.now();
        Contest contest = Contest.builder().startTime(rightNow).endTime(rightNow).build();
        contestRepository.save(contest);
        List<Contest> all = contestRepository.findAll();
        Assertions.assertThat(contestRepository.findAll().size()).isGreaterThanOrEqualTo(1);

//        Team team = Team.builder()
//                .name("TEST")
//                .passwordHash("1234567")
//                .points(123)
//                .website("asd.pl")
//                .isVerified(true)
//                .isBanned(false)
//                .isHidden(false)
//                .users(new List< User >)
//                .build();
//        teamRepository.save(team);

 //       Assertions.assertThat(teamRepository.findAll().size()).isEqualTo(1);
//        List<Team> all = teamRepository.findAll();
//        Assertions.assertThat(all)
//                .usingRecursiveComparison().ignoringFields("id")
//                .isEqualTo(team);

    }

}
