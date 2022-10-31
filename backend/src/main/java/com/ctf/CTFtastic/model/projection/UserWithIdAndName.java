package com.ctf.CTFtastic.model.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonPropertyOrder({ "id","name"})
public class UserWithIdAndName {
    public Integer id;
    public String name;
}
