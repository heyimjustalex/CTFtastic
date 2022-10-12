package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.model.projection.UserDetailsVM;
import com.ctf.CTFtastic.model.projection.UserForListVM;
import com.ctf.CTFtastic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = {"/users", "/users/"})
    @PreAuthorize("hasAnyRole('ROLE_CTF_ADMIN','ROLE_USER','ROLE_TEAM_CAPITAN')")
    public List<UserForListVM> getAll() {
        return userService.getAllForListView();
    }

    @RequestMapping(value = {"/user/{id}", "/user/{id}/"})
    @PreAuthorize("hasAnyRole('ROLE_CTF_ADMIN','ROLE_USER','ROLE_TEAM_CAPITAN')")
    public UserDetailsVM getById(@PathVariable("id") int id){
        return userService.getById(id);
    }
}