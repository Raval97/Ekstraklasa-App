package com.example.ekstraklasa.controllers;

import com.example.ekstraklasa.models.FavouriteTeam;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class DashboardController {

    private final UserService userService;
    private final TeamService teamService;
    private final FavouriteTeamService favouriteTeamService;
    private final MatchService matchService;

    @Autowired
    public DashboardController(UserService userService, TeamService teamService,
                               FavouriteTeamService favouriteTeamService, MatchService matchService) {
        this.userService = userService;
        this.teamService = teamService;
        this.favouriteTeamService = favouriteTeamService;
        this.matchService = matchService;
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerNewUser(@RequestBody String object) {
        Optional<List<Team>> favouriteTeams = teamService.readAllFromRequest(object);
        Optional<Users> newUser = userService.register(object);
        Map<String, Object> response = new HashMap<>();
        HttpStatus status;
        if(newUser.isPresent() && favouriteTeams.isPresent()){
            if(userService.isUsernameUnique(newUser.get().getUsername())) {
                userService.save(newUser.get());
                favouriteTeams.get().forEach(ft -> favouriteTeamService.save(new FavouriteTeam(ft, newUser.get())));
                response.put("user", newUser.get());
                response.put("favouriteTeams", favouriteTeams.get());
                response.put("Status", 200);
                status = HttpStatus.OK;
            }
            else {
                response.put("error", "Username is not unique");
                response.put("Status", 400);
                status = HttpStatus.BAD_REQUEST;
            }
        } else {
            response.put("error", "Wrong data format");
            response.put("Status", 500);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/dashboard/teams", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTeams() {
        Map<String,Object> response = teamService.listAll();
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

//    @RequestMapping(value = "/dashboard/teams/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> getTeam(@PathVariable int id) {
//        Map<String,Object> response = teamService.get(id);
//        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK :
//                response.get("Status").equals(400) ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
//        return new ResponseEntity<>(response, status);
//    }

    @RequestMapping(value = "/dashboard/matches", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMatches() {
        Map<String,Object> response = matchService.listAll();
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/dashboard/matches/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMatch(@PathVariable int id) {
        Map<String,Object> response = matchService.get(id);
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK :
                response.get("Status").equals(400) ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

}
