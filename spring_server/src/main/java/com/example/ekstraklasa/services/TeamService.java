package com.example.ekstraklasa.services;

import com.example.ekstraklasa.models.Team;
import com.example.ekstraklasa.repositories.TeamRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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
        List<Team> teams = repo.findFavouriteTeamByUserId(id);
        List<Long> teamsIds = new ArrayList<>();
        teams.forEach(team -> teamsIds.add(team.getId()));
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("teams", teamsIds);
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
            System.out.println(object);
            List<Integer> ids = mapper.convertValue(jsonNode.get("favouriteTeams"), List.class);
            teams = Optional.of(new ArrayList<>());
            ids.forEach(id -> {
                teams.get().add(repo.findById(id.longValue()).get());
            });
            return teams;
        } catch (Exception ex) {
            System.out.println("error:" + ex);
        }
        return Optional.empty();
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

    public Optional<List<Team>> readAllFromRequest(String object) {
        List<Team> allTeams = repo.findAll();
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode jsonNode = mapper.readTree(object);
            List<Long> favouriteTeamsId = mapper.convertValue(jsonNode.get("favouriteTeams"), List.class);
            List<Team> favouriteTeams = allTeams.stream().filter(team -> favouriteTeamsId.contains(team.getId().intValue())).collect(Collectors.toList());
            return Optional.of(favouriteTeams);
        } catch (Exception ex) {
            System.out.println(ex);
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
