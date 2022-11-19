package com.ctf.CTFtastic.model.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Builder
public class StartChallengeRequest {
    private String teamName;
    private String chall;
}
