package com.ctf.CTFtastic.model.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "id", "name", "category", "points"})
public interface ChallengeForListVM {
    Integer getId();

    String getName();

    String getCategory();

    Integer getPoints();
}
