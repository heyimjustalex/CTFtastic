package com.ctf.CTFtastic.repository;

import com.ctf.CTFtastic.entity.Submit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmitRepository extends JpaRepository<Submit, Integer> {
}
