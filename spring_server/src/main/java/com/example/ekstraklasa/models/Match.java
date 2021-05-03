package com.example.ekstraklasa.models;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name="match")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn
    private Team homeTeam;
    @ManyToOne
    @JoinColumn
    private Team awayTeam;
    private int homeScore;
    private int awayScore;
    private int round;
    private String place;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    public Match(Team homeTeam, Team awayTeam, int homeScore, int awayScore, int round, String place, LocalDate date) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeScore = homeScore;
        this.awayScore = awayScore;
        this.round = round;
        this.place = place;
        this.date = date;
//        this.homeTeam.addHomeMatch(this);
//        this.awayTeam.addAwayMatch(this);
    }



    public Match() {}
}
