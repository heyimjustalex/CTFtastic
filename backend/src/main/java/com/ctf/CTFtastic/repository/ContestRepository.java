package com.ctf.CTFtastic.repository;

import com.ctf.CTFtastic.model.entity.Contest;
import com.ctf.CTFtastic.model.projection.ContestForListVM;
import com.ctf.CTFtastic.model.projection.TeamForListVM;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.Transient;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ContestRepository extends JpaRepository<Contest, Integer> {
    @Query("select p.id as id,p.hasStarted as hasStarted, p.startTime as startTime, p.endTime as endTime, p.endTimeUtc as endTimeUtc, p.startTimeUtc as startTimeUtc, p.description as description, p.title as title from Contest p")
    Page<ContestForListVM> getAll(Pageable pageable);

    @Query("select c from Contest c where c.id = :id")
    Contest getById(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query("update Contest c set c.hasStarted = :flag where c.id = 1")
    void updateStart(@Param("flag") boolean flag);
}
