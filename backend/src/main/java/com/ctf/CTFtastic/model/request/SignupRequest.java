package com.ctf.CTFtastic.model.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class SignupRequest {
    private String email;
    private String password;
}
