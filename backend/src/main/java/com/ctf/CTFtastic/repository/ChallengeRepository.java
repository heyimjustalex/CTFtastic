package com.ctf.CTFtastic.repository;

import com.ctf.CTFtastic.model.entity.Challenge;
import com.ctf.CTFtastic.model.projection.ChallengeDetailsVM;
import com.ctf.CTFtastic.model.projection.ChallengeForListVM;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {
    @Query("select c.id as id, c.name as name, c.category as category, c.points as points, c.isVisible as isVisible from Challenge c where c.isVisible = :isVisible")
    Page<ChallengeForListVM> getAllChallenges(Pageable pageable,@Param("isVisible") boolean isVisable);

    @Query("select c.name as name, c.dockerfileBuildState as dockerfileBuildState, c.dockerfile as dockerfile, c.isVisible as isVisible, c.category as category, c.description as description, c.points as points from Challenge c where c.id = ?1")
    ChallengeDetailsVM getByIdToView(int id);

    @Modifying
    @Transactional
    @Query("update Challenge c set c.isVisible = :visable where c.id = :id")
    void updateVisable(@Param("visable") boolean visable, @Param("id") int id);

    @Query("select c.id as id, c.name as name, c.category as category, c.points as points, c.isVisible as isVisible from Challenge c")
    Page<ChallengeForListVM> getAllChallenges2(Pageable pageable);

    @Query("select c from Challenge c")
    List<Challenge> getAllElements();

    @Query("select c.name from Challenge c where c.isVisible = :isVisable")
    List<String> getAllChallengesNames(@Param("isVisable") boolean isVisable);

    @Query("select c from Challenge c where c.id = :id")
    Challenge getChallengeAllValueById(@Param("id") int id);

    @Modifying
    @Transactional
    @Query("update Challenge c set c.dockerfileBuildState = :state where c.id = :id")
    void updateBuild(@Param("state") String state, @Param("id") int id);
}
