package com.ctf.CTFtastic.model.projection;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "name", "points", "website", "affiliation"})
public interface TeamDetailsVM {
    String getName();

    Integer getPoints();

    String getWebsite();

    String getAffiliation();
}
