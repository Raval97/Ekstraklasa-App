package com.example.ekstraklasa.services;

import com.example.ekstraklasa.models.Match;
import com.example.ekstraklasa.models.Team;
import com.example.ekstraklasa.repositories.TeamRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TeamService {

    private TeamRepository repo;

    @Autowired
    public TeamService(TeamRepository userRepository) {
        this.repo = userRepository;
    }

    public Map<String, Object> listAll() {
        List<Team> teams = repo.findAll();
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            result.put("teams", teams);
            result.put("Status", 200);
        } catch (Exception ex) {
            result.put("Error", ex.getMessage());
            result.put("Status", 500);
        }
        return result;
    }

    public Map<String, Object> get(long id) {
        Optional<Team> team = repo.findById(id);
        Map<String, Object> result = new HashMap<>();
        try {
            if (team.isPresent()) {
                result.put("team", team.get());
                result.put("Status", 200);
            } else {
                result.put("Error", "Wrong index of team");
                result.put("Status", 400);
            }
        } catch (Exception ex) {
            result.put("Error", ex.getMessage());
            result.put("Status", 500);
        }
        return result;
    }

    public Map<String, Object> save(String object) {
        Map<String, Object> result = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode jsonNode = mapper.readTree(object);
            String name = mapper.convertValue(jsonNode.get("name"), String.class);
            int points = mapper.convertValue(jsonNode.get("points"), Integer.class);
            int goalsScores = mapper.convertValue(jsonNode.get("goalsScores"), Integer.class);
            int goalLoses = mapper.convertValue(jsonNode.get("goalLoses"), Integer.class);
            int loses = mapper.convertValue(jsonNode.get("loses"), Integer.class);
            int wins = mapper.convertValue(jsonNode.get("wins"), Integer.class);
            int draws = mapper.convertValue(jsonNode.get("draws"), Integer.class);
            Team newTeam = new Team(name, points, goalsScores, goalLoses, loses, wins, draws);
            repo.save(newTeam);
            result.put("team", newTeam);
            result.put("Status", 200);
        } catch (Exception ex) {
            result.put("error", "Wrong data format");
            result.put("Status", 500);
        }
        return result;
    }

    public Map<String, Object> editTeam(long id, String object) {
        Optional<Team> team = repo.findById(id);
        Map<String, Object> result = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            if (team.isPresent()) {
                try {
                    JsonNode jsonNode = mapper.readTree(object);
                    team.get().setName(mapper.convertValue(jsonNode.get("name"), String.class));
                    team.get().setPoints(mapper.convertValue(jsonNode.get("points"), Integer.class));
                    team.get().setGoalsScores(mapper.convertValue(jsonNode.get("goalsScores"), Integer.class));
                    team.get().setGoalLoses(mapper.convertValue(jsonNode.get("goalLoses"), Integer.class));
                    team.get().setLoses(mapper.convertValue(jsonNode.get("loses"), Integer.class));
                    team.get().setWins(mapper.convertValue(jsonNode.get("wins"), Integer.class));
                    team.get().setDraws(mapper.convertValue(jsonNode.get("draws"), Integer.class));
                    repo.save(team.get());
                    result.put("team", team.get());
                    result.put("Status", 200);
                } catch (Exception ex) {
                    result.put("error", "Wrong data format");
                    result.put("Status", 500);
                }
            } else {
                result.put("Error", "Wrong index of team");
                result.put("Status", 400);
            }
        } catch (Exception ex) {
            result.put("Error", ex.getMessage());
            result.put("Status", 500);
        }
        return result;
    }

    public Map<String, Object> delete(long id) {
        Optional<Team> team = repo.findById(id);
        Map<String, Object> result = new HashMap<>();
        try {
            if (team.isPresent()) {
                repo.deleteById(id);
                result.put("team", team.get());
                result.put("Status", 200);
            } else {
                result.put("Error", "Wrong index of team");
                result.put("Status", 400);
            }
        } catch (Exception ex) {
            result.put("Error", ex.getMessage());
            result.put("Status", 500);
        }
        return result;
    }

    public Optional<Team> getTeamFromPostRequest(String object, String typeOfTeam) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode jsonNode = mapper.readTree(object);
            Long teamId = mapper.convertValue(jsonNode.get(typeOfTeam), Long.class);
            return repo.findById(teamId);
        } catch (Exception ex) {
            System.out.println("error" + ex);
        }
        return Optional.empty();
    }

}
