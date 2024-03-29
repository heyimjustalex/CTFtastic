package com.ctf.CTFtastic.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "contest")
public class Contest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "start_time_utc", nullable = false)
    private LocalDateTime startTimeUtc;

    @Column(name = "end_time_utc", nullable = false)
    private LocalDateTime endTimeUtc;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "has_started", nullable = false)
    private boolean hasStarted;

    @OneToMany(mappedBy = "contest")
    //bad ale bez tego leci exception przy save, trzeba to poprawic ->
    // https://javarevisited.blogspot.com/2017/01/how-to-create-localdatetime-in-java-8.html
    // Zobacz do testu jeszcze
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Challenge> challenges = new ArrayList<>();
}
