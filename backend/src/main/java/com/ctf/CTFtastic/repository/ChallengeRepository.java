package com.ctf.CTFtastic.repository;

import com.ctf.CTFtastic.model.entity.Challenge;
import com.ctf.CTFtastic.model.projection.ChallengeDetailsVM;
import com.ctf.CTFtastic.model.projection.ChallengeForListVM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {
    @Query("select c.id as id, c.name as name, c.category as category, c.points as points from Challenge c where c.isVisible = true")
    List<ChallengeForListVM> getAllChallenges();

    @Query("select c.id as id, c.name as name, c.category as category, c.message as message, c.points as points, c.file as file, c.dockerfile as dockerfile from Challenge c where c.id = ?1")
    ChallengeDetailsVM getByIdToView(int id);
}
