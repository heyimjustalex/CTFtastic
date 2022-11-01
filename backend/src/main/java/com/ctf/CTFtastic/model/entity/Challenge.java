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
import javax.persistence.Lob;
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
@Table(name = "challenge")
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "id_contest", nullable = false)
    @ManyToOne
    private Contest contest;

    private String name;

    private String category;

    private String message;

    private Integer points;

    private String flag;

    @Column(name = "is_case_sensitive")
    private boolean isCaseSensitive;

    @Column(name = "is_visible")
    private boolean isVisible;

    @Lob
    private byte[] file;

    @Lob
    private byte[] dockerfile;

    @OneToMany(mappedBy = "challenge")
    //bad ale bez tego leci exception przy save, trzeba to poprawic ->
    // https://javarevisited.blogspot.com/2017/01/how-to-create-localdatetime-in-java-8.html
    // Zobacz do testu jeszcze
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Submit> submits = new ArrayList<>();
}
