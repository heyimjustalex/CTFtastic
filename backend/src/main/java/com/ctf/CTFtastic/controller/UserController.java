package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.model.PageableOfT;
import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.model.projection.UserDetailsVM;
import com.ctf.CTFtastic.model.projection.UserForListVM;
import com.ctf.CTFtastic.model.request.JoinTeamRequest;
import com.ctf.CTFtastic.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;


import java.util.*;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = {"/users/{page}/{size}"})
    public PageableOfT<UserForListVM> getAll(@PathVariable("page") int page, @PathVariable("size") int size) {
        Pageable pageable = PageRequest.of(page,size);
        Page<UserForListVM> pageUser = userService.getAllForListView(pageable);

        List<UserForListVM> users = pageUser.getContent();

        PageableOfT<UserForListVM> userToView = PageableOfT.<UserForListVM>builder()
                .elements(users)
                .currentPage(pageUser.getNumber())
                .totalElements(pageUser.getTotalElements())
                .totalPages(pageUser.getTotalPages())
                .build();

        return userToView;
    }

    @RequestMapping(value = {"/users/{id}"})
    @PreAuthorize("hasAnyRole('ROLE_CTF_ADMIN','ROLE_USER','ROLE_TEAM_CAPITAN', 'ROLE_USER_WITH_TEAM')")
    public UserDetailsVM getById(@PathVariable("id") int id){
        return userService.getById(id);
    }

    @RequestMapping(value = {"/users/role"})
    @PreAuthorize("hasAnyRole('ROLE_CTF_ADMIN','ROLE_USER','ROLE_TEAM_CAPITAN', 'ROLE_USER_WITH_TEAM')")
    public ResponseEntity<String> getRoleById(Authentication authentication) throws JsonProcessingException {
        try {
            Optional<Participant> user = userService.findByEmail(authentication.getName());
            String role = userService.getRoleById(user.get().getId());

            Map<String, String> elements =  new HashMap<>();
            elements.put("role", role);

            ObjectMapper objectMapper = new ObjectMapper();
            String returnData = objectMapper.writeValueAsString(elements);
            return ResponseEntity.ok(returnData);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}