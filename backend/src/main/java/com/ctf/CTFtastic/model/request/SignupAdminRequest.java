package com.ctf.CTFtastic.model.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class SignupAdminRequest {
    private String email;

    private String username;

    private String password;
}
