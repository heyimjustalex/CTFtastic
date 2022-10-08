package com.ctf.CTFtastic.repository;

import com.ctf.CTFtastic.model.entity.Contest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContestRepository extends JpaRepository<Contest, Integer> {
}
