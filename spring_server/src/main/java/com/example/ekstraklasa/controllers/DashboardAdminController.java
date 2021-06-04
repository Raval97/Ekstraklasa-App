package com.example.ekstraklasa.controllers;

import com.example.ekstraklasa.models.Match;
import com.example.ekstraklasa.models.Team;
import com.example.ekstraklasa.services.MatchService;
import com.example.ekstraklasa.services.TeamService;
import com.example.ekstraklasa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class DashboardAdminController {

    private final UserService userService;
    private final TeamService teamService;
    private final MatchService matchService;

    @Autowired
    public DashboardAdminController(UserService userService, TeamService teamService, MatchService matchService) {
        this.userService = userService;
        this.teamService = teamService;
        this.matchService = matchService;
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUsers() {
        Map<String,Object> response = userService.listAll();
        HttpStatus status = response.get("status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeUserPermission(@PathVariable int id) {
        Map<String,Object> response = userService.editUserPermission(id);
        HttpStatus status = response.get("status").equals(200) ? HttpStatus.OK :
                response.get("status").equals(404) ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/dashboard/matches/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteMatch(@PathVariable int id) {
        Optional<Match> match = matchService.getMatch(id);
        Map<String, Object> response = matchService.delete(match);
        if(((int)response.get("status")) == 200) {
            teamService.updateStatisticsOfTeam(match.get().getHomeTeam());
            teamService.updateStatisticsOfTeam(match.get().getAwayTeam());
        }
        HttpStatus status = response.get("status").equals(200) ? HttpStatus.OK :
                response.get("status").equals(404) ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/dashboard/matches/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateMatch(@PathVariable int id, @RequestBody String object) {
        Optional<Team> newHomeTeam = teamService.getTeamFromPostRequest(object, "homeTeam");
        Optional<Team> newAwayTeam = teamService.getTeamFromPostRequest(object, "awayTeam");
        Optional<Match> oldMatch = matchService.getMatch(id);
        List<Team> teams = new ArrayList<>();
        oldMatch.ifPresent(match -> teams.addAll(Arrays.asList(match.getHomeTeam(), match.getAwayTeam())));
        Map<String, Object> response = matchService.editMatch(oldMatch, object, newHomeTeam, newAwayTeam);
        if(newHomeTeam.isPresent() && newAwayTeam.isPresent()) {
            teams.addAll(Arrays.asList(newHomeTeam.get(), newAwayTeam.get()));
            teams.stream()
                    .filter(Team.distinctByKey(Team::getName))
                    .forEach(teamService::updateStatisticsOfTeam);
        }
        HttpStatus status = response.get("status").equals(200) ? HttpStatus.OK :
                response.get("status").equals(404) ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/dashboard/matches", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewMatch(@RequestBody String object) {
        Optional<Team> homeTeam = teamService.getTeamFromPostRequest(object, "homeTeam");
        Optional<Team> awayTeam = teamService.getTeamFromPostRequest(object, "awayTeam");
        Optional<Match> newMatch = matchService.getFromRequest(object, homeTeam, awayTeam);
        Map<String, Object> response = matchService.save(newMatch);
        if(newMatch.isPresent() && homeTeam.isPresent() && awayTeam.isPresent()) {
            teamService.updateStatisticsOfTeam(homeTeam.get());
            teamService.updateStatisticsOfTeam(awayTeam.get());
        }
        HttpStatus status = response.get("status").equals(200) ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>(response, status);
    }

}
