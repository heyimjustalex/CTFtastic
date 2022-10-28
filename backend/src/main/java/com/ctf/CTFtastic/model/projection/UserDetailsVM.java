package com.ctf.CTFtastic.model.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "name", "email", "nameTeam", "website", "affilation", "country"})
public interface UserDetailsVM {
    String getEmail();
    String getName();
    String getNameTeam();
    String getWebsite();
    String getAffilation();
    String getCountry();
}