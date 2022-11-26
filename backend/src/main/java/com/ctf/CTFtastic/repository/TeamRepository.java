package com.ctf.CTFtastic.repository;

import com.ctf.CTFtastic.model.entity.Team;
import com.ctf.CTFtastic.model.projection.TeamDetailsVM;
import com.ctf.CTFtastic.model.projection.TeamForListVM;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    List<Team> findAll();
    Team findById(int id);
    @Query("select c from Team c where c.id = :id")
    Optional<Team> findById2(@Param("id") int id);
    @Query("select c.id as id, c.name as name, c.points as points, c.website as website, c.affiliation as affiliation from Team c where c.isHidden = false")
    Page<TeamForListVM> getTeams(Pageable pageable);

    @Query("select c from Team c where c.isHidden = false and c.id = :id")
    Team getByIdToView(@Param("id") int id);

    @Query("select c from Team c where c.name = :name")
    Optional<Team> findByName(@Param("name") String name);

    @Query("select c from Team c")
    List<Team> getAllTeams();

    @Modifying
    @Transactional
    @Query("update Team t set t.points = :point where t.id = :idTeam")
    void updatePointsTeam(@Param("idTeam")int id, @Param("point") int i);
}
