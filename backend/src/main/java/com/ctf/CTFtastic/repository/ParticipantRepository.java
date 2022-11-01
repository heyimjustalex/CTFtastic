package com.ctf.CTFtastic.repository;

import com.ctf.CTFtastic.model.entity.Role;
import com.ctf.CTFtastic.model.entity.Team;
import com.ctf.CTFtastic.model.projection.UserWithIdAndName;
import com.ctf.CTFtastic.model.userr;
import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.model.projection.UserDetailsVM;
import com.ctf.CTFtastic.model.projection.UserForListVM;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Integer> {

    @Query("select c.id as id, c.username as name , c.email as email,c.team.name as nameTeam from Participant c LEFT JOIN Team ht ON ht.id = c.team.id where c.isHidden = false " )
    Page<UserForListVM> getUsers(Pageable pageable);

    @Query("select c.username as name, c.team.name as nameTeam, c.website as website, c.affiliation as affiliation, c.country as country from Participant c where c.id = :id")
    UserDetailsVM getByIdToView(@Param("id") int id);


    @Query("select c.username from Participant c where c.email = :email")
    String getUserNameByEmail(@Param("email") String email);

    @Query("select c.username as name, c.email as email, c.team.name as nameTeam, c.website as website, c.affiliation as affiliation, c.country as country from Participant c where c.email = :email")

    UserDetailsVM getByEmailUser(@Param("email") String email);

    Optional<Participant> findByEmail(String email);

    @Query("select c.username as name, c.email as username, c.passwordHash as password, c.role.name as role from Participant c where c.email = :email")

    Optional<userr> findByEmailGetEmailAndPassword(@Param("email") String email);

    @Query("select c.role.name from Participant c where c.email = :email")
    String getRole(@Param("email") String email);


    @Query("select c.id as id, c.username as name from Participant c where c.team.name = :name")
    List<UserWithIdAndName> getAllUserByTeamName(String name);
    @Modifying
    @Query("update Participant p set p.role = :role, p.team = :team where p.username = :name")
    void update(@Param("name") String name, @Param("role") Role role, @Param("team") Team team);

    @Modifying
    @Query("update Participant p set p.passwordHash = :newPasswordHash where p.username = :name")
    void updatePassword(@Param("name") String name, @Param("newPasswordHash") String newPasswordHash);

    @Query("select c.role.name from Participant c where c.id = :id")
    String getRoleById(int id);
}
