package com.example.ekstraklasa.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;

@Getter
@Setter
@Entity
@Table(name = "team")
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
    @JsonBackReference(value = "homeMatches")
    @JsonIgnoreProperties(ignoreUnknown = true)
    @OneToMany(mappedBy = "homeTeam", cascade = CascadeType.ALL)
    private Set<Match> homeMatches = new HashSet<>();
    @JsonBackReference(value = "awayMatches")
    @JsonIgnoreProperties(ignoreUnknown = true)
    @OneToMany(mappedBy = "awayTeam", cascade = CascadeType.ALL)
    private Set<Match> awayMatches = new HashSet<>();
    @JsonBackReference(value = "favouriteTeams")
    @JsonIgnoreProperties(ignoreUnknown = true)
    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private Set<FavouriteTeam> favouriteTeams = new HashSet<>();

    public Team(String name, int points, int goalsScores, int goalsLoses, int loses, int wins, int draws) {
        this.name = name;
        this.points = points;
        this.goalsScores = goalsScores;
        this.goalsLoses = goalsLoses;
        this.loses = loses;
        this.wins = wins;
        this.draws = draws;
    }

    public Team(Long id, String name, int points, int goalsScores, int goalsLoses, int loses, int wins, int draws) {
        this.id = id;
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

    public Team() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Team)) return false;
        Team team = (Team) o;
        return getPoints() == team.getPoints() && getGoalsScores() == team.getGoalsScores() &&
                getGoalsLoses() == team.getGoalsLoses() && getLoses() == team.getLoses() &&
                getWins() == team.getWins() && getDraws() == team.getDraws() &&
                Objects.equals(getId(), team.getId()) && Objects.equals(getName(), team.getName()) &&
                Objects.equals(getHomeMatches(), team.getHomeMatches()) && Objects.equals(getAwayMatches(),
                team.getAwayMatches()) && Objects.equals(getFavouriteTeams(), team.getFavouriteTeams());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getPoints(), getGoalsScores(),
                getGoalsLoses(), getLoses(), getWins(), getDraws());
    }

    public static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
        Set<Object> seen = ConcurrentHashMap.newKeySet();
        return t -> seen.add(keyExtractor.apply(t));
    }

}
