package com.example.ekstraklasa.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name="team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int points;
    private int goalsScores;
    private int goalsLoses;
    private int loses;
    private int wins;
    private int draws;
    @JsonBackReference
    @OneToMany(mappedBy = "homeTeam", cascade = CascadeType.ALL)
    private Set<Match> homeMatches = new HashSet<>();
    @JsonBackReference
    @OneToMany(mappedBy = "awayTeam", cascade = CascadeType.ALL)
    private Set<Match> awayMatches = new HashSet<>();

    public Team(String name, int points, int goalsScores, int goalsLoses, int loses, int wins, int draws) {
        this.name = name;
        this.points = points;
        this.goalsScores = goalsScores;
        this.goalsLoses = goalsLoses;
        this.loses = loses;
        this.wins = wins;
        this.draws = draws;
    }

    public void addHomeMatch(Match match) {
        homeMatches.add(match);
    }

    public void addAwayMatch(Match match) {
        awayMatches.add(match);
    }

    public Team() {}
}
