package com.ctf.CTFtastic.model.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "id","name", "nameTeam"})
public interface UserForListVM {
    Integer getId();
    String getName();
    String getNameTeam();
}
