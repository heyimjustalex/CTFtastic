package com.ctf.CTFtastic.model.projection;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@JsonPropertyOrder({"name", "category","isVisible", "points", "description", "file", "isSolved", "link"})
public class ChallengeDatailsVM2 {
    public String name;
    public String category;
    public String description;
    public Boolean isVisible;
    public Integer points;

    public Boolean isSolved;
    public String link;
}
