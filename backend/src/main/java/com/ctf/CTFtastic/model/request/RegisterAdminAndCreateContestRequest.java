package com.ctf.CTFtastic.model.request;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class RegisterAdminAndCreateContestRequest extends SignupRequest {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime startTimeUtf;
    private LocalDateTime endTimeUtf;
}
