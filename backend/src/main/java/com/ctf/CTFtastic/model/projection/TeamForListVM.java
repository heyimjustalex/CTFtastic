package com.ctf.CTFtastic.model.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "id", "name", "points","affiliation" , "website" })
public interface TeamForListVM {
    Integer getId();

    String getName();

    String getAffiliation();
    String getWbsite();
    Integer getPoints();
}
