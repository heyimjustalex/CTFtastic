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
    private String message;
    private Integer points;
    private String flag;
    private boolean isCaseSensitive;
    private String file;
    private String dockerfile;
}
