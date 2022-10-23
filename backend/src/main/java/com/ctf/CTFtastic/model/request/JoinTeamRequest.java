package com.ctf.CTFtastic.model.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class JoinTeamRequest {
    private int id;
    private String name;
    private String password;
}
