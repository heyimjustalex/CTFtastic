package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.projection.ChallengeDetailsVM;
import com.ctf.CTFtastic.projection.TeamForListVM;
import com.ctf.CTFtastic.projection.UserDetailsVM;
import com.ctf.CTFtastic.projection.UserForListVM;
import com.ctf.CTFtastic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = {"/users", "/users/"})
    public List<UserForListVM> getAll() {
        return userService.getAllForListView();
    }

    @RequestMapping(value = {"/user/{id}", "/user/{id}/"})
    public UserDetailsVM getById(@PathVariable("id") int id){
        return userService.getById(id);
    }
}