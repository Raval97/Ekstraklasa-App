package com.example.ekstraklasa.services;

import com.example.ekstraklasa.models.FavouriteTeam;
import com.example.ekstraklasa.models.Team;
import com.example.ekstraklasa.models.Users;
import com.example.ekstraklasa.repositories.FavouriteTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FavouriteTeamService {

    private FavouriteTeamRepository repo;

    @Autowired
    public FavouriteTeamService(FavouriteTeamRepository favouriteTeamRepository) {
        this.repo = favouriteTeamRepository;
    }

    public Map<String, Object> saveAllByUserId(Optional<List<Team>> teams, Users user) {
        Map<String, Object> result = new HashMap<>();
        List<String> names = new ArrayList<>();
        if (teams.isPresent()) {
            teams.get().forEach(team -> {
                FavouriteTeam ft = new FavouriteTeam(team, user);
                repo.save(ft);
                names.add(ft.getTeam().getName());
            });
            result.put("favouriteTeam", names);
            result.put("Status", 200);
        } else{
            result.put("error", "Wrong data format");
            result.put("Status", 500);
        }
        return result;
    }

    public void deleteAllByUserId(Long id){
        List<FavouriteTeam> fav = repo.getAllByUserId(id);
        fav.forEach(f -> repo.deleteById(f.getId()));
    }

}
