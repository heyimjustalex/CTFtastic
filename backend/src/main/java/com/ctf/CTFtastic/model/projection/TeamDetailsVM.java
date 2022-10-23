package com.ctf.CTFtastic.model.projection;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.util.List;

@JsonPropertyOrder({ "name", "points", "website", "affiliation", "users"})
public interface TeamDetailsVM {
    String getName();

    Integer getPoints();

    String getWebsite();

    String getAffiliation();

    List<UserWithIdAndName> getUsers();
}
