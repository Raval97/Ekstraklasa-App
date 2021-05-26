package com.example.ekstraklasa.services;

import com.example.ekstraklasa.models.Match;
import com.example.ekstraklasa.models.Team;
import com.example.ekstraklasa.repositories.MatchRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class MatchService {

    private MatchRepository repo;

    @Autowired
    public MatchService(MatchRepository userRepository) {
        this.repo = userRepository;
    }

    public Map<String, Object> listAll() {
        List<Match> matches = repo.findAll();
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            result.put("matches", matches);
            result.put("Status", 200);
        } catch (Exception ex) {
            result.put("Error", ex.getMessage());
            result.put("Status", 500);
        }
        return result;
    }

    public Optional<Match> getMatch(long id) {
        return repo.findById(id);
    }

    public Map<String, Object> get(long id) {
        Optional<Match> match = repo.findById(id);
        Map<String, Object> result = new HashMap<>();
        try {
            if (match.isPresent()) {
                result.put("match", match.get());
                result.put("Status", 200);
            } else {
                result.put("Error", "Wrong index of match");
                result.put("Status", 400);
            }
        } catch (Exception ex) {
            result.put("Error", ex.getMessage());
            result.put("Status", 500);
        }
        return result;
    }

    public Optional<Match> getFromRequest(String object, Optional<Team> homeTeam, Optional<Team> awayTeam) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode jsonNode = mapper.readTree(object);
            int homeScore = mapper.convertValue(jsonNode.get("homeScore"), Integer.class);
            int awayScore = mapper.convertValue(jsonNode.get("awayScore"), Integer.class);
            int round = mapper.convertValue(jsonNode.get("round"), Integer.class);
            String place = mapper.convertValue(jsonNode.get("place"), String.class);
            LocalDate date = LocalDate.parse(mapper.convertValue(jsonNode.get("date"), String.class));
            Match newMatch = new Match(homeTeam.get(), awayTeam.get(), homeScore, awayScore, round, place, date);
            return Optional.of(newMatch);
        } catch (Exception ex) {
            System.out.println("ex");
        }
        return Optional.empty();
    }

    public Map<String, Object> save(Optional<Match> newMatch) {
        Map<String, Object> result = new HashMap<>();
        if (newMatch.isPresent()) {
            repo.save(newMatch.get());
            result.put("match", newMatch);
            result.put("Status", 200);
        } else {
            result.put("error", "Wrong data format");
            result.put("Status", 500);
        }
        return result;
    }

    public Map<String, Object> editMatch(Optional<Match> oldMatch, String object, Optional<Team> homeTeam, Optional<Team> awayTeam) {
        Map<String, Object> result = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode jsonNode = mapper.readTree(object);
            int homeScore = mapper.convertValue(jsonNode.get("homeScore"), Integer.class);
            int awayScore = mapper.convertValue(jsonNode.get("awayScore"), Integer.class);
            int round = mapper.convertValue(jsonNode.get("round"), Integer.class);
            String place = mapper.convertValue(jsonNode.get("place"), String.class);
            LocalDate date = LocalDate.parse(mapper.convertValue(jsonNode.get("date"), String.class));
            if (oldMatch.isPresent()) {
                oldMatch.get().setHomeScore(homeScore);
                oldMatch.get().setAwayScore(awayScore);
                oldMatch.get().setRound(round);
                oldMatch.get().setPlace(place);
                oldMatch.get().setDate(date);
                oldMatch.get().setHomeTeam(homeTeam.get());
                oldMatch.get().setAwayTeam(awayTeam.get());
                repo.save(oldMatch.get());
                result.put("match", oldMatch.get());
                result.put("Status", 200);
            } else {
                result.put("Error", "Wrong index of match");
                result.put("Status", 400);
            }
        } catch (Exception ex) {
            result.put("error", "Wrong data format");
            result.put("Status", 500);
        }
        return result;
    }

    public Map<String, Object> delete(Optional<Match> match) {
        Map<String, Object> result = new HashMap<>();
        try {
            if (match.isPresent()) {
                repo.deleteById(match.get().getId());
                result.put("match", match.get());
                result.put("Status", 200);
            } else {
                result.put("Error", "Wrong index of match");
                result.put("Status", 400);
            }
        } catch (Exception ex) {
            result.put("Error", ex.getMessage());
            result.put("Status", 500);
        }
        return result;
    }

}
