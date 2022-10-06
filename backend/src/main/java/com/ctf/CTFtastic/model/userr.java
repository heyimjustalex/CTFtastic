package com.ctf.CTFtastic.model;
import com.ctf.CTFtastic.model.entity.Role;
import org.springframework.security.core.userdetails.UserDetails;

public interface userr extends UserDetails {
    String getUsername();
    String getPassword();
    String getRole();
}
