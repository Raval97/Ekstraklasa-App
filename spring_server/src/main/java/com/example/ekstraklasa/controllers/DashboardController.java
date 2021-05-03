package com.example.ekstraklasa.controllers;

import com.example.ekstraklasa.models.Team;
import com.example.ekstraklasa.services.MatchService;
import com.example.ekstraklasa.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class DashboardController {

    private final TeamService teamService;
    private final MatchService matchService;

    @Autowired
    public DashboardController(TeamService teamService, MatchService matchService) {
        this.teamService = teamService;
        this.matchService = matchService;
    }

    @RequestMapping(value = "/dashboard/teams", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTeams() {
        Map<String,Object> response = teamService.listAll();
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<Map<String,Object>>(response, status);
    }

    @RequestMapping(value = "/dashboard/teams/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTeam(@PathVariable int id) {
        Map<String,Object> response = teamService.get(id);
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK :
                response.get("Status").equals(400) ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/dashboard/teams/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteTeam(@PathVariable int id) {
        Map<String, Object> response = teamService.delete(id);
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK :
                response.get("Status").equals(400) ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/dashboard/teams/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateTeam(@PathVariable int id, @RequestBody String object) {
        Map<String, Object> response = teamService.editTeam(id, object);
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/dashboard/teams", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewTeam(@RequestBody String object) {
        Map<String, Object> response = teamService.save(object);
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

    ///////////////////////////////////////////////////

    @RequestMapping(value = "/dashboard/matches", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMatches() {
        Map<String,Object> response = matchService.listAll();
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<Map<String,Object>>(response, status);
    }

    @RequestMapping(value = "/dashboard/matches/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMatch(@PathVariable int id) {
        Map<String,Object> response = matchService.get(id);
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK :
                response.get("Status").equals(400) ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/dashboard/matches/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteMatch(@PathVariable int id) {
        Map<String, Object> response = matchService.delete(id);
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK :
                response.get("Status").equals(400) ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/dashboard/matches/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewMatch(@PathVariable int id, @RequestBody String object) {
        Optional<Team> homeTeam = teamService.getTeamFromPostRequest(object, "homeTeam");
        Optional<Team> awayTeam = teamService.getTeamFromPostRequest(object, "awayTeam");
        Map<String, Object> response = matchService.editMatch(id, object, homeTeam, awayTeam);
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/dashboard/matches", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewMatch(@RequestBody String object) {
        Optional<Team> homeTeam = teamService.getTeamFromPostRequest(object, "homeTeam");
        Optional<Team> awayTeam = teamService.getTeamFromPostRequest(object, "awayTeam");
        Map<String, Object> response = matchService.save(object, homeTeam, awayTeam);
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }
}
