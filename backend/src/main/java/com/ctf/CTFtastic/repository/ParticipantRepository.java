package com.ctf.CTFtastic.repository;

import com.ctf.CTFtastic.model.userr;
import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.model.projection.UserDetailsVM;
import com.ctf.CTFtastic.model.projection.UserForListVM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
    @Query("select c.id as id, c.email as email,c.team.name as nameTeam from Participant c where c.isHidden = false" )
    List<UserForListVM> getUsers();

    @Query("select c.id as id, c.email as email, c.team.name as nameTeam, c.website as website, c.affiliation as affiliation, c.country as country from Participant c where c.id = :id")
    UserDetailsVM getByIdToView(@Param("id") int id);

    @Query("select c.id as id, c.email as email, c.team.name as nameTeam, c.website as website, c.affiliation as affiliation, c.country as country from Participant c where c.email = :email")
    UserDetailsVM getByEmailUser(@Param("email") String email);

    Optional<Participant> findByEmail(String email);

    @Query("select c.email as username, c.passwordHash as password, c.role.name as role from Participant c where c.email = :email")
    Optional<userr> findByEmailGetEmailAndPassword(@Param("email") String email);
}
