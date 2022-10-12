package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.model.PageableOfT;
import com.ctf.CTFtastic.model.projection.UserDetailsVM;
import com.ctf.CTFtastic.model.projection.UserForListVM;
import com.ctf.CTFtastic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    @PreAuthorize("hasAnyRole('ROLE_CTF_ADMIN','ROLE_USER','ROLE_TEAM_CAPITAN')")
    public UserDetailsVM getById(@PathVariable("id") int id){
        return userService.getById(id);
    }
}