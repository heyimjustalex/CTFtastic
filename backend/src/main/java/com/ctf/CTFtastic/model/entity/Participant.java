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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "participant")
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "id_team", nullable = false)
    @ManyToOne
    private Team team;

    @JoinColumn(name = "id_role", nullable = false)
    @ManyToOne
    private Role role;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    private String website;

    private String affiliation;

    private String country;

    @Column(name = "is_team_capitan", nullable = false)
    private boolean isTeamCapitan;

    @Column(name = "is_ctf_admin", nullable = false)
    private boolean isCtfAdmin;

    @Column(name = "is_hidden", nullable = false)
    private boolean isHidden;

    @Column(name = "is_banned", nullable = false)
    private boolean isBanned;

    @Column(name = "is_verified")
    private boolean isVerified;

    @OneToMany(mappedBy = "participant")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Address> addresses = new ArrayList<>();

    @OneToMany(mappedBy = "participant")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Submit> submits = new ArrayList<>();
}
