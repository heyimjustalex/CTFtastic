package com.ctf.CTFtastic.model.entity;

import lombok.*;

import javax.persistence.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "solution")
public class Solution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "id_team", nullable = false)
    @ManyToOne
    private Team team;

    @JoinColumn(name = "id_challange", nullable = false)
    @ManyToOne
    private Challenge challenge;

    private String link;

    @Column(name = "is_solved")
    private Boolean isSolved;
}