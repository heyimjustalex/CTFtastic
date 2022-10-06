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
import java.util.ArrayList;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    private Integer points;

    private String website;

    private String affiliation;

    @Column(name = "is_hidden", nullable = false)
    private boolean isHidden;

    @Column(name = "is_banned", nullable = false)
    private boolean isBanned;

    @Column(name = "is_verified")
    private boolean isVerified;

    @OneToMany(mappedBy = "team")
    //bad ale bez tego leci exception przy save, trzeba to poprawic ->
    // https://javarevisited.blogspot.com/2017/01/how-to-create-localdatetime-in-java-8.html
    // Zobacz do testu jeszcze
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Participant> participants = new ArrayList<>();
}
