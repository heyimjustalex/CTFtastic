package com.ctf.CTFtastic.repository;

import com.ctf.CTFtastic.entity.Team;
import com.ctf.CTFtastic.projection.TeamForListVM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    List<Team> findAll();
    Optional<Team> findById(int id);
    @Query("select c.id as id, c.name as name, c.points as points, c.website as website, c.affiliation as affiliation from Team c where c.isHidden = false")
    List<TeamForListVM> getTeams();
}
