package com.ctf.CTFtastic.model.projection;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@JsonPropertyOrder({ "name", "points", "website", "affiliation", "users"})
public class TeamDetailsVM {
    public String name;

    public Integer points;

    public String website;

    public String affiliation;

    public List<UserWithIdAndName> users;
}
