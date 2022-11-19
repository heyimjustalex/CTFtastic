package com.ctf.CTFtastic.service;


import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.model.entity.Role;
import com.ctf.CTFtastic.model.entity.Team;
import com.ctf.CTFtastic.model.projection.UserDetailsVM;
import com.ctf.CTFtastic.model.projection.UserForListVM;
import com.ctf.CTFtastic.model.userr;
import com.ctf.CTFtastic.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.beans.Transient;
import java.security.Principal;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private ParticipantRepository participantRepository;

    @Transient
    public Page<UserForListVM> getAllForListView(Pageable pageable){
        return participantRepository.getUsers(pageable);
    }

    public UserDetailsVM getById(int id) {
        return participantRepository.getByIdToView(id);
    }

    public String getRoleByEmail(String email){
        return participantRepository.getRole(email);
    }

    public String getByEmail(String email) {
        return participantRepository.getUserNameByEmail(email);
    }

    public Participant saveUser(Participant participant) throws Exception {
        Optional<Participant> check = participantRepository.findByEmail(participant.getEmail());

        if(check.isPresent()){
            throw new Exception("Value in dateBase");
        }

        Participant newParticipant = participantRepository.save(participant);
        return newParticipant;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<userr> user = participantRepository.findByEmailGetEmailAndPassword(username);
        if(user.isEmpty()){
            throw new UsernameNotFoundException("not found");
        }
        userr oneUser = user.get();
        UserDetails userToChecker = User.withUsername(oneUser.getUsername()).password(oneUser.getPassword()).authorities(oneUser.getRole()).build();
        //new AccountStatusUserDetailsChecker().check(userToChecker);
        return userToChecker;
    }

    public Optional<Participant> findByEmail(String name) {
        return participantRepository.findByEmail(name);
    }

    @Transactional
    public void update(Participant p, Role role, Team team){

        participantRepository.update(p.getUsername(),role, team);

    }

    @Transactional
    public void updatePassword(String user, String newPasswordHash){
        participantRepository.updatePassword(user,newPasswordHash);
    }

    public String getRoleById(int id) {
        return participantRepository.getRoleById(id);
    }

    public void deleteTeamAndUpdateRole(int id) {
        participantRepository.deleteTeamAndUpdateRole(id);
    }

    public void deleteTeamUser(int idTeam, int idUser){
        participantRepository.deleteTeamAndUpdateRole(idTeam,idUser);
    }

    public Optional<Participant> findById(int idUser) {
        return participantRepository.findById(idUser);
    }
}
