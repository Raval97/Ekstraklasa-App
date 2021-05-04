package com.example.ekstraklasa.repositories;


import com.example.ekstraklasa.models.FavouriteTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteTeamRepository extends JpaRepository<FavouriteTeam, Long> {

    @Query(value = "Select * from favourite_team ft Where ft.users = :id", nativeQuery = true)
    List<FavouriteTeam> getAllByUserId(long id);
}
