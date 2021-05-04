package com.example.ekstraklasa.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Getter
@Setter
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
        this.homeScore = homeScore;
        this.awayScore = awayScore;
        this.round = round;
        this.place = place;
        this.date = date;
        homeTeam.addHomeMatch(this);
        awayTeam.addAwayMatch(this);
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
    }

    public Match() {}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Match)) return false;
        Match match = (Match) o;
        return getHomeScore() == match.getHomeScore() && getAwayScore() == match.getAwayScore()
                && getRound() == match.getRound() && Objects.equals(getId(), match.getId())
                && Objects.equals(getHomeTeam(), match.getHomeTeam()) && Objects.equals(getAwayTeam(),
                match.getAwayTeam()) && Objects.equals(getPlace(), match.getPlace())
                && Objects.equals(getDate(), match.getDate());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getHomeScore(), getAwayScore(), getRound(), getPlace(), getDate());
    }
}
