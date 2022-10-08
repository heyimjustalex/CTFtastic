package com.ctf.CTFtastic.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "submit")
public class Submit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "id_participant", nullable = false)
    @ManyToOne
    private Participant participant;

    @JoinColumn(name = "id_challenge", nullable = false)
    @ManyToOne
    private Challenge challenge;

    @Column(name = "is_correct", nullable = false)
    private boolean isCorrect;

    private LocalDateTime time;
}
