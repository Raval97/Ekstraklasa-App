package com.example.ekstraklasa.security;

import com.example.ekstraklasa.models.*;
import com.example.ekstraklasa.repositories.FavouriteTeamRepository;
import com.example.ekstraklasa.repositories.MatchRepository;
import com.example.ekstraklasa.repositories.TeamRepository;
import com.example.ekstraklasa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.time.LocalDate;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private UserService userDetailsService;
    private TeamRepository teamRepository;
    private FavouriteTeamRepository favouriteTeamRepository;
    private MatchRepository matchRepository;

    @Autowired
    public WebSecurityConfig(UserService userDetailsService, TeamRepository teamRepository,
                             FavouriteTeamRepository favouriteTeamRepository, MatchRepository matchRepository) {
        this.userDetailsService = userDetailsService;
        this.teamRepository = teamRepository;
        this.favouriteTeamRepository = favouriteTeamRepository;
        this.matchRepository = matchRepository;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(HttpMethod.GET, "/dashboard/**").permitAll()
                .antMatchers("/favourite_team/**").hasRole("USER")
                .antMatchers(HttpMethod.POST, "/dashboard/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/dashboard/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/dashboard/**").hasRole("ADMIN")
                .antMatchers("/users/**").hasRole("ADMIN")
                .and().formLogin().permitAll()
                .successHandler(authSuccessHandler()).failureHandler(authFailureHandler())
                .and().logout().permitAll().logoutSuccessUrl("/dashboard/teams")
                .and().httpBasic()
                .and().csrf().disable().cors();
    }

    @Bean
    public AuthenticationSuccessHandler authSuccessHandler() {
        return new UrlAuthenticationSuccessHandler();
    }

    @Bean
    public AuthenticationFailureHandler authFailureHandler() {
        return new UrlAuthenticationFailureHandler();
    }


    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @EventListener(ApplicationReadyEvent.class)
    public void get() {
        Users user1 = new Users("user", passwordEncoder().encode("user"));
        Users user2 = new Users("user2", passwordEncoder().encode("user2"));
        Users user3 = new Users("user3", passwordEncoder().encode("user3"));
        Users admin = new Users("admin", passwordEncoder().encode("admin"), Role.ADMIN);
        userDetailsService.save(user1);
        userDetailsService.save(user2);
        userDetailsService.save(user3);
        userDetailsService.save(admin);
        Team team1 = new Team("Cracovia Kraków", 3, 2, 1, 0, 1, 0);
        Team team2 = new Team("Górnik Zabrze", 0, 1, 2, 1, 0, 0);
        Team team3 = new Team("Jagielonia Białystok", 1, 2, 2, 0, 0, 1);
        Team team4 = new Team("Lech Poznań", 1, 2, 2, 0, 0, 1);
        Team team5 = new Team("Lechia Gdańsk", 1, 1, 1, 0, 0, 1);
        Team team6 = new Team("Legia Warszawa", 1, 1, 1, 0, 0, 1);
        Team team7 = new Team("Piast Gliwice", 3, 3, 1, 0, 1, 0);
        Team team8 = new Team("Podbeskidzie Bielsko-Biała", 0, 1, 3, 1, 0, 0);
        Team team9 = new Team("Pogoń Szczeciń", 0, 0, 3, 1, 0, 0);
        Team team10 = new Team("Raków Częstochowwa", 3, 3, 0, 0, 1, 0);
        Team team11 = new Team("Śląsk Wrocław", 3, 1, 0, 0, 1, 0);
        Team team12 = new Team("Stal Mielec", 0, 0, 1, 1, 0, 0);
        Team team13 = new Team("Warta Poznań", 0, 0, 2, 1, 0, 0);
        Team team14 = new Team("Wisła Kraków", 3, 2, 0, 0, 1, 0);
        Team team15 = new Team("Wisła Płock", 1, 3, 3, 0, 0, 1);
        Team team16 = new Team("Zagłębie Lubin", 1, 3, 3, 0, 0, 1);
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
        FavouriteTeam ft1 = new FavouriteTeam(team1, user1);
        FavouriteTeam ft2 = new FavouriteTeam(team2, user1);
        favouriteTeamRepository.save(ft1);
        favouriteTeamRepository.save(ft2);
    }
}

