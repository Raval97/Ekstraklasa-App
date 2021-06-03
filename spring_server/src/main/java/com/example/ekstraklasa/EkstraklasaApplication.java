package com.example.ekstraklasa;

import com.example.ekstraklasa.models.*;
import com.example.ekstraklasa.repositories.FavouriteTeamRepository;
import com.example.ekstraklasa.repositories.MatchRepository;
import com.example.ekstraklasa.repositories.TeamRepository;
import com.example.ekstraklasa.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.time.LocalDate;

@SpringBootApplication
public class EkstraklasaApplication {

    public static void main(String[] args) {
        System.setProperty("server.servlet.context-path", "/Ekstraklasa");
        SpringApplication.run(EkstraklasaApplication.class, args);
    }


    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final FavouriteTeamRepository favouriteTeamRepository;
    private final MatchRepository matchRepository;

    @Autowired
    public EkstraklasaApplication(UserRepository userRepository, TeamRepository teamRepository,
                                  FavouriteTeamRepository favouriteTeamRepository, MatchRepository matchRepository) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.favouriteTeamRepository = favouriteTeamRepository;
        this.matchRepository = matchRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void get() {
        Users user1 = new Users("user", "user");
        Users user2 = new Users("user2", "user2");
        Users user3 = new Users("user3", "user3");
        Users admin = new Users("admin", "admin", Role.ADMIN);
        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);
        userRepository.save(admin);
        Team team1 = new Team("Cracovia Kraków", 4, 3, 2, 0, 1, 1);
        Team team2 = new Team("Górnik Zabrze", 0, 1, 4, 2, 0, 0);
        Team team3 = new Team("Jagielonia Białystok", 2, 3, 3, 0, 0, 2);
        Team team4 = new Team("Lech Poznań", 4, 4, 2, 0, 1, 1);
        Team team5 = new Team("Lechia Gdańsk", 1, 2, 4, 1, 0, 1);
        Team team6 = new Team("Legia Warszawa", 4, 4, 3, 0, 1, 1);
        Team team7 = new Team("Piast Gliwice", 6, 6, 2, 0, 2, 0);
        Team team8 = new Team("Podbeskidzie Bielsko-Biała", 0, 2, 6, 2, 0, 0);
        Team team9 = new Team("Pogoń Szczeciń", 0, 0, 5, 2, 0, 0);
        Team team10 = new Team("Raków Częstochowa", 3, 4, 2, 1, 1, 0);
        Team team11 = new Team("Śląsk Wrocław", 6, 3, 0, 0, 2, 0);
        Team team12 = new Team("Stal Mielec", 3, 2, 2, 1, 1, 0);
        Team team13 = new Team("Warta Poznań", 0, 0, 3, 2, 0, 0);
        Team team14 = new Team("Wisła Kraków", 6, 4, 1, 0, 2, 0);
        Team team15 = new Team("Wisła Płock", 4, 3, 4, 0, 1, 1);
        Team team16 = new Team("Zagłębie Lubin", 1, 4, 5, 1, 0, 1);
        teamRepository.save(team1);
        teamRepository.save(team2);
        teamRepository.save(team3);
        teamRepository.save(team4);
        teamRepository.save(team5);
        teamRepository.save(team6);
        teamRepository.save(team7);
        teamRepository.save(team8);
        teamRepository.save(team9);
        teamRepository.save(team10);
        teamRepository.save(team11);
        teamRepository.save(team12);
        teamRepository.save(team13);
        teamRepository.save(team14);
        teamRepository.save(team15);
        teamRepository.save(team16);
        LocalDate today =  LocalDate.now();
        Match match1 = new Match(team1, team2, 2, 1, 1, team1.getName().split(" ")[1], today);
        Match match2 = new Match(team3, team4, 2, 2, 1, team3.getName().split(" ")[1], today);
        Match match3 = new Match(team5, team6, 1, 1, 1, team5.getName().split(" ")[1], today.plusDays(1));
        Match match4 = new Match(team7, team8, 3, 1, 1, team7.getName().split(" ")[1], today.plusDays(1));
        Match match5 = new Match(team9, team10, 0, 3, 1, team9.getName().split(" ")[1], today.plusDays(1));
        Match match6 = new Match(team11, team12, 1, 0, 1, team11.getName().split(" ")[1], today.plusDays(1));
        Match match7 = new Match(team13, team14, 0, 2, 1, team13.getName().split(" ")[1], today.plusDays(2));
        Match match8 = new Match(team15, team16, 3, 3, 1, team15.getName().split(" ")[1], today.plusDays(3));
        matchRepository.save(match1);
        matchRepository.save(match2);
        matchRepository.save(match3);
        matchRepository.save(match4);
        matchRepository.save(match5);
        matchRepository.save(match6);
        matchRepository.save(match7);
        matchRepository.save(match8);
        Match match9 = new Match(team1, team3, 1, 1, 2, team1.getName().split(" ")[1], today.plusDays(7));
        Match match10 = new Match(team2, team4, 0, 2, 2, team2.getName().split(" ")[1], today.plusDays(7));
        Match match11 = new Match(team5, team7, 1, 3, 2, team5.getName().split(" ")[1], today.plusDays(8));
        Match match12 = new Match(team6, team8, 3, 2, 2, team6.getName().split(" ")[1], today.plusDays(8));
        Match match13 = new Match(team9, team11, 0, 2, 2, team9.getName().split(" ")[1], today.plusDays(8));
        Match match14 = new Match(team10, team12, 1, 2, 2, team10.getName().split(" ")[1], today.plusDays(9));
        Match match15 = new Match(team13, team15, 0, 1, 2, team13.getName().split(" ")[1], today.plusDays(9));
        Match match16 = new Match(team14, team16, 2, 1, 2, team14.getName().split(" ")[1], today.plusDays(10));
        matchRepository.save(match9);
        matchRepository.save(match10);
        matchRepository.save(match11);
        matchRepository.save(match12);
        matchRepository.save(match13);
        matchRepository.save(match14);
        matchRepository.save(match15);
        matchRepository.save(match16);
        FavouriteTeam ft1 = new FavouriteTeam(team1, admin);
        FavouriteTeam ft2 = new FavouriteTeam(team3, admin);
        FavouriteTeam ft3 = new FavouriteTeam(team13, admin);
        favouriteTeamRepository.save(ft1);
        favouriteTeamRepository.save(ft2);
        favouriteTeamRepository.save(ft3);
    }
}
