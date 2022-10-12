package com.ctf.CTFtastic.model.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "id", "name", "points"})
public interface TeamForListVM {
    Integer getId();

    String getName();

    Integer getPoints();
}
