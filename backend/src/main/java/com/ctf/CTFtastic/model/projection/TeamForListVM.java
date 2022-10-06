package com.ctf.CTFtastic.model.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "id", "name", "points", "website", "affiliation"})
public interface TeamForListVM {
    Integer getId();

    String getName();

    Integer getPoints();

    String getWebsite();

    String getAffiliation();
}
