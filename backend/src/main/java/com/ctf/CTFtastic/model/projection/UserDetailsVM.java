package com.ctf.CTFtastic.model.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "email", "nameTeam", "website", "affilation", "country"})
public interface UserDetailsVM {
    String getEmail();
    String getNameTeam();
    String getWebsite();
    String getAffilation();
    String getCountry();
}