package com.example.ekstraklasa.repositories;


import com.example.ekstraklasa.models.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    @Query(value = "select match.* from team left join match on match.away_team=team.id Where team.id = :id",
            nativeQuery = true)
    List<Match> findAwayMatchesByTeamId(@Param("id") Long id);

    @Query(value = "select match.* from team left join match on match.home_team=team.id Where team.id = :id",
            nativeQuery = true)
    List<Match> findHomeMatchesByTeamId(@Param("id") Long id);
}
