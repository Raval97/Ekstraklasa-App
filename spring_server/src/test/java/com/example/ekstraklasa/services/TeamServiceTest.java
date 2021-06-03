package com.example.ekstraklasa.services;

import com.example.ekstraklasa.dataTests.ExampleDataToTest;
import com.example.ekstraklasa.models.Match;
import com.example.ekstraklasa.models.Team;
import com.example.ekstraklasa.repositories.TeamRepository;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

@ExtendWith(MockitoExtension.class)
class TeamServiceTest {

    @Mock
    private TeamRepository teamRepository;
    @InjectMocks
    private TeamService teamService;


    @Test
    void shouldUpdateStatisticsOfTeams() {
        ExampleDataToTest dateTests = new ExampleDataToTest();
        Team homeTeam = dateTests.getTeams().get(0);
        Team awayTeam = dateTests.getTeams().get(1);
        int homeTeamPointsBeforeRequest = homeTeam.getPoints();
        int homeTeamWinsRequest = homeTeam.getWins();
        int awayTeamLosesGoalsBeforeRequest = awayTeam.getGoalsLoses();
        int awayTeamLosesBeforeRequest = awayTeam.getLoses();
        dateTests.getMatches().add(
                new Match(homeTeam, awayTeam, 2, 0, 3, "Kraków", LocalDate.now())
        );
        teamService.updateStatisticsOfTeam(homeTeam);
        teamService.updateStatisticsOfTeam(awayTeam);

        MatcherAssert.assertThat(homeTeam.getPoints(), Matchers.equalTo(homeTeamPointsBeforeRequest + 3));
        MatcherAssert.assertThat(homeTeam.getWins(), Matchers.equalTo(homeTeamWinsRequest + 1));
        MatcherAssert.assertThat(awayTeam.getGoalsLoses(), Matchers.equalTo(awayTeamLosesGoalsBeforeRequest + 2));
        MatcherAssert.assertThat(awayTeam.getLoses(), Matchers.equalTo(awayTeamLosesBeforeRequest + 1));
    }
}
