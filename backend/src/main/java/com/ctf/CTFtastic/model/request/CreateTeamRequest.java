package com.ctf.CTFtastic.model.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class CreateTeamRequest {
    private String name;
    private String password;
    private String website;
    private String affiliation;
}
