package com.example.ekstraklasa.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name="favourite_team")
public class FavouriteTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn
    private Team team;
    @ManyToOne
    @JoinColumn
    private Users users;

    public FavouriteTeam(Team team, Users users) {
        this.team = team;
        this.users = users;
    }

    public FavouriteTeam() {}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FavouriteTeam)) return false;
        FavouriteTeam that = (FavouriteTeam) o;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getTeam(), that.getTeam()) && Objects.equals(getUsers(), that.getUsers());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

}
