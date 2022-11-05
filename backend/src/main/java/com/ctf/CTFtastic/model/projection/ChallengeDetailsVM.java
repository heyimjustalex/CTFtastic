package com.ctf.CTFtastic.model.projection;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"name", "category", "points", "message", "file"})
public interface ChallengeDetailsVM {
    String getName();

    String getCategory();

    String getDescription();

    Integer getPoints();
    byte[] getFile();
}
