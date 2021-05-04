package com.example.ekstraklasa.services;

import com.example.ekstraklasa.models.Team;
import com.example.ekstraklasa.repositories.TeamRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public Map<String, Object> getAllFavouriteByUserId(Long id) {
        List<Team> teams =  repo.findFavouriteTeamByUserId(id);
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("teams", teams);
            result.put("Status", 200);
        } catch (Exception ex) {
            result.put("Error", ex.getMessage());
            result.put("Status", 500);
        }
        return result;
    }

    public Optional<List<Team>> getAllByName(String object) {
        Optional<List<Team>> teams;
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode jsonNode = mapper.readTree(object);
            List<String> names = mapper.convertValue(jsonNode.get("favouriteTeams"), List.class);
            teams = Optional.of(new ArrayList<>());
            names.forEach(name -> {
                teams.get().add(repo.findByName(name));
            });
            return teams;
        } catch (Exception ex) {
            System.out.println("error");
        }
        return Optional.empty();
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
            int goalsLoses = mapper.convertValue(jsonNode.get("goalsLoses"), Integer.class);
            int loses = mapper.convertValue(jsonNode.get("loses"), Integer.class);
            int wins = mapper.convertValue(jsonNode.get("wins"), Integer.class);
            int draws = mapper.convertValue(jsonNode.get("draws"), Integer.class);
            Team newTeam = new Team(name, points, goalsScores, goalsLoses, loses, wins, draws);
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
                    team.get().setGoalsLoses(mapper.convertValue(jsonNode.get("goalsLoses"), Integer.class));
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

    public void updateStatisticsOfTeam(Team team) {
        final int[] points = {0};
        final int[] goalsScore = {0};
        final int[] goalsLoses = {0};
        final int[] wins = {0};
        final int[] draws = {0};
        final int[] loses = {0};
        team.getHomeMatches().forEach(match -> {
            if (match != null) {
                if ((match.getHomeScore() - match.getAwayScore()) > 0) {
                    points[0] += 3;
                    wins[0] += 1;
                } else if ((match.getHomeScore() - match.getAwayScore()) == 0) {
                    points[0] += 1;
                    draws[0] += 1;
                } else
                    loses[0] += 1;
                goalsScore[0] += match.getHomeScore();
                goalsLoses[0] += match.getAwayScore();
            }
        });
        team.getAwayMatches().forEach(match -> {
            if (match != null) {
                if ((match.getHomeScore() - match.getAwayScore()) < 0) {
                    points[0] += 3;
                    wins[0] += 1;
                } else if ((match.getHomeScore() - match.getAwayScore()) == 0) {
                    points[0] += 1;
                    draws[0] += 1;
                } else
                    loses[0] += 1;
                goalsLoses[0] += match.getHomeScore();
                goalsScore[0] += match.getAwayScore();
            }
        });
        team.setPoints(points[0]);
        team.setDraws(draws[0]);
        team.setLoses(loses[0]);
        team.setWins(wins[0]);
        team.setGoalsLoses(goalsLoses[0]);
        team.setGoalsScores(goalsScore[0]);
        repo.save(team);
    }
}
