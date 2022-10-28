package com.ctf.CTFtastic.model.projection;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "id","name"})
public interface UserWithIdAndName {
    Integer getId();
    String getName();
}
