package com.ctf.CTFtastic.repository;

import com.ctf.CTFtastic.model.entity.Solution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SolutionRepository extends JpaRepository<Solution, Integer> {

    @Modifying
    @Transactional
    @Query("delete from Solution b where b.team.id = :id")
    void deleteByTeamId(@Param("id") int id);

    @Query("select c from Solution c where c.team.id = :teamId and c.challenge.id = :idChell")
    Solution findByTeamAndId(@Param("idChell") int id,@Param("teamId") int teamId);


    @Modifying
    @Transactional
    @Query("update Solution c set c.isSolved = :isSolved where c.id = :id")
    void update(@Param("isSolved") Boolean isSolved, @Param("id") Integer id);
}
