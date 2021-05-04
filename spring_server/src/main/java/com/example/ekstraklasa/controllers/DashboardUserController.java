package com.example.ekstraklasa.controllers;

import com.example.ekstraklasa.models.Team;
import com.example.ekstraklasa.models.Users;
import com.example.ekstraklasa.services.FavouriteTeamService;
import com.example.ekstraklasa.services.MatchService;
import com.example.ekstraklasa.services.TeamService;
import com.example.ekstraklasa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class DashboardUserController {

    private final UserService userService;
    private final TeamService teamService;
    private final FavouriteTeamService favouriteTeamService;
    private final MatchService matchService;

    @Autowired
    public DashboardUserController(UserService userService, TeamService teamService,
                                   FavouriteTeamService favouriteTeamService, MatchService matchService) {
        this.userService = userService;
        this.teamService = teamService;
        this.favouriteTeamService = favouriteTeamService;
        this.matchService = matchService;
    }

    @RequestMapping(value = "/favourite_teams", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUsersFavouriteTeams() {
        Users user = userService.findUserByUsername(Users.getUserName());
        Map<String,Object> response = teamService.getAllFavouriteByUserId(user.getId());
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/favourite_teams", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveUsersFavouriteTeams(@RequestBody String object) {
        Users user = userService.findUserByUsername(Users.getUserName());
        Optional<List<Team>> teams = teamService.getAllByName(object);
        favouriteTeamService.deleteAllByUserId(user.getId());
        Map<String,Object> response = favouriteTeamService.saveAllByUserId(teams, user);
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

}
