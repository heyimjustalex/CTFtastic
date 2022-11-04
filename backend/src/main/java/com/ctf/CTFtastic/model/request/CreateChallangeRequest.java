package com.ctf.CTFtastic.model.request;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class CreateChallangeRequest {
    private String name;
    private String category;
    private String description;
    private Integer points;
    private String flag;
    private Boolean isCaseSensitive;
    private Boolean isVisible;
    private String file;
    private String dockerfile;
}
