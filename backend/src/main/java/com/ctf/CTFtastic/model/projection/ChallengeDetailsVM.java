package com.ctf.CTFtastic.model.projection;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"name", "category", "points", "message", "file", "dockerfile"})
public interface ChallengeDetailsVM {
    String getName();

    String getCategory();

    String getMessage();

    Integer getPoints();

    byte[] getFile();

    String getDockerfile();
}
