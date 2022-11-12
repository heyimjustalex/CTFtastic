package com.ctf.CTFtastic.model.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@JsonPropertyOrder({ "chall", "containerPort", "challNum"})
public class ChallangeToStart {
    private String chall;
    private Integer containerPort;
    private Integer challNum;
}