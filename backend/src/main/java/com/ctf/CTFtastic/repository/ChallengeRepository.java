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

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {
    @Query("select c.id as id, c.name as name, c.category as category, c.points as points, c.isVisible as isVisible from Challenge c where c.isVisible = :isVisible")
    Page<ChallengeForListVM> getAllChallenges(Pageable pageable,@Param("isVisible") boolean isVisable);

    @Query("select c.name as name, c.category as category, c.message as message, c.points as points, c.file as file from Challenge c where c.id = ?1")
    ChallengeDetailsVM getByIdToView(int id);

    @Modifying
    @Transactional
    @Query("update Challenge c set c.isVisible = :visable where c.id = :id")
    void updateVisable(@Param("visable") boolean visable, @Param("id") int id);

    @Query("select c.id as id, c.name as name, c.category as category, c.points as points, c.isVisible as isVisible from Challenge c")
    Page<ChallengeForListVM> getAllChallenges2(Pageable pageable);
}
