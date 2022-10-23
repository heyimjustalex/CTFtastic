package com.ctf.CTFtastic.model;

import lombok.*;

import java.util.List;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageableOfT<T> {
    List<T> elements;
    int currentPage;
    long totalElements;
    int totalPages;
}
