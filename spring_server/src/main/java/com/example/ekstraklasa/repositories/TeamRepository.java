package com.example.ekstraklasa.repositories;


import com.example.ekstraklasa.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {


    @Query(value = "select team.* from team Where team.name = :name", nativeQuery = true)
    Team findByName(@Param("name") String name);

    @Query(value = "select team.* from team left join favourite_team ft on team.id = ft.team Where ft.users = :id",
            nativeQuery = true)
    List<Team> findFavouriteTeamByUserId(@Param("id") Long id);
}
