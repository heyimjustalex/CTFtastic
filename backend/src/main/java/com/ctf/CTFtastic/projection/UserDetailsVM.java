package com.ctf.CTFtastic.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "id", "email", "nameTeam", "website", "affilation", "country"})
public interface UserDetailsVM {
    Integer getId();
    String getEmail();
    String getNameTeam();
    String getWebsite();
    String getAffilation();
    String getCountry();
}