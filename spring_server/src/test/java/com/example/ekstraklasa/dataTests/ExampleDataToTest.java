package com.example.ekstraklasa.dataTests;

import com.example.ekstraklasa.models.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ExampleDataToTest {

    public List<Users> users = new ArrayList<>();
    public List<Team> teams = new ArrayList<>();
    public List<Match> matches = new ArrayList<>();
    public List<FavouriteTeam> favouriteTeams = new ArrayList<>();

    public ExampleDataToTest() {
        this.prepareData();
    }

    private void prepareData(){
        users.add(new Users(1L, "user", "user", Role.USER));
        users.add(new Users(2L, "admin", "admin", Role.ADMIN));
        teams.add(new Team(1L,"Cracovia Kraków", 4, 3, 2, 0, 1, 1));
        teams.add(new Team(2L,"Górnik Zabrze", 0, 1, 4, 2, 0, 0));
        teams.add(new Team(3L,"Jagielonia Białystok", 2, 3, 3, 0, 0, 2));
        teams.add(new Team(4L,"Lech Poznań", 4, 4, 2, 0, 1, 1));
        LocalDate today =  LocalDate.now();
        matches.add(new Match(teams.get(0), teams.get(1), 2, 1, 1, teams.get(1).getName().split(" ")[1], today));
        matches.add(new Match(teams.get(2), teams.get(3), 2, 2, 1, teams.get(3).getName().split(" ")[1], today));
        matches.add(new Match(teams.get(0), teams.get(2), 1, 1, 2, teams.get(1).getName().split(" ")[1], today.plusDays(7)));
        matches.add(new Match(teams.get(1), teams.get(3), 0, 2, 2, teams.get(2).getName().split(" ")[1], today.plusDays(7)));
        favouriteTeams.add(new FavouriteTeam(1L, teams.get(0), users.get(1)));
        favouriteTeams.add(new FavouriteTeam(2L, teams.get(1), users.get(1)));
        favouriteTeams.add(new FavouriteTeam(3L, teams.get(2), users.get(0)));
    }

    public List<Users> getUsers() {
        return users;
    }

    public List<Team> getTeams() {
        return teams;
    }

    public List<Match> getMatches() {
        return matches;
    }

    public List<FavouriteTeam> getFavouriteTeams() {
        return favouriteTeams;
    }
}
