package com.ctf.CTFtastic.model.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.time.LocalDateTime;


@JsonPropertyOrder({"id","hasStarted","startTime", "endTime", "startTimeUtc", "endTimeUtc", "title", "description"})
public interface ContestForListVM {
    Integer getId();
    Boolean getHasStarted();

    LocalDateTime getStartTime();
    LocalDateTime getEndTime();
    LocalDateTime getStartTimeUtc();
    LocalDateTime getEndTimeUtc();
    String getTitle();
    String getDescription();
}
