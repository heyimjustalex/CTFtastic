package com.ctf.CTFtastic.model.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "id", "email", "nameTeam"})
public interface UserForListVM {
    Integer getId();
    String getEmail();
    String getNameTeam();
}
