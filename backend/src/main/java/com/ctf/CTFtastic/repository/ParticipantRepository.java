package com.ctf.CTFtastic.repository;

import com.ctf.CTFtastic.entity.Participant;
import com.ctf.CTFtastic.projection.ChallengeDetailsVM;
import com.ctf.CTFtastic.projection.UserDetailsVM;
import com.ctf.CTFtastic.projection.UserForListVM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
    @Query("select c.id as id, c.email as email,c.team.name as nameTeam from Participant c where c.isHidden = false" )
    List<UserForListVM> getUsers();

    @Query("select c.id as id, c.email as email, c.team.name as nameTeam, c.website as website, c.affiliation as affiliation, c.country as country from Participant c where c.id = ?1")
    UserDetailsVM getByIdToView(int id);
}
