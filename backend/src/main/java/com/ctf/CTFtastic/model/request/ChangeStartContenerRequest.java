package com.ctf.CTFtastic.model.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class ChangeStartContenerRequest {
    private Boolean isContainerStarted;
}
