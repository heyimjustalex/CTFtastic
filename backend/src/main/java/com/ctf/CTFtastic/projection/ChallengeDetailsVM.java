package com.ctf.CTFtastic.projection;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "id", "name", "category", "points", "message", "file", "dockerfile"})
public interface ChallengeDetailsVM {
    Integer getId();

    String getName();

    String getCategory();

    String getMessage();

    Integer getPoints();

    byte[] getFile();

    String getDockerfile();
}
