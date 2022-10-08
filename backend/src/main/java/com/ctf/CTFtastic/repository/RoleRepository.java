package com.ctf.CTFtastic.repository;


import com.ctf.CTFtastic.model.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Participant, Integer> {
}
