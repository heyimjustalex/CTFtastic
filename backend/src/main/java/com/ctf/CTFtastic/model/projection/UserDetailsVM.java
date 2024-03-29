package com.ctf.CTFtastic.model.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "name", "nameTeam", "website", "affilation", "country"})
public interface UserDetailsVM {
    String getName();
    String getNameTeam();
    String getWebsite();
    String getAffilation();
    String getCountry();
}