package com.ctf.CTFtastic.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "id", "email", "nameTeam"})
public interface UserForListVM {
    Integer getId();
    String getEmail();
    String getNameTeam();
}
