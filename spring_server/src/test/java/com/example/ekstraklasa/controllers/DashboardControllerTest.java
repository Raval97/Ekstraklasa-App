package com.example.ekstraklasa.controllers;

import com.example.ekstraklasa.dataTests.ExampleDataToTest;
import com.example.ekstraklasa.models.Match;
import com.example.ekstraklasa.models.Role;
import com.example.ekstraklasa.models.Team;
import com.example.ekstraklasa.models.Users;
import com.example.ekstraklasa.repositories.FavouriteTeamRepository;
import com.example.ekstraklasa.repositories.MatchRepository;
import com.example.ekstraklasa.repositories.TeamRepository;
import com.example.ekstraklasa.repositories.UserRepository;
import com.example.ekstraklasa.services.FavouriteTeamService;
import com.example.ekstraklasa.services.MatchService;
import com.example.ekstraklasa.services.TeamService;
import com.example.ekstraklasa.services.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class DashboardControllerTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private TeamRepository teamRepository;
    @Mock
    private MatchRepository matchRepository;
    @Mock
    private FavouriteTeamRepository favouriteTeamRepository;

    private UserService userService;
    private TeamService teamService;
    private MatchService matchService;
    private FavouriteTeamService favouriteTeamService;
    private DashboardController dashboardController;
    private ExampleDataToTest dateTests;

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void init() {
        userService = new UserService(userRepository);
        teamService = new TeamService(teamRepository);
        matchService = new MatchService(matchRepository);
        favouriteTeamService = new FavouriteTeamService(favouriteTeamRepository);
        dashboardController = new DashboardController(userService, teamService, favouriteTeamService , matchService);
        dateTests = new ExampleDataToTest();
        mockMvc = MockMvcBuilders.standaloneSetup(dashboardController).build();
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    void shouldRegisterNewUser() throws Exception {
        ExampleDataToTest dateTests = new ExampleDataToTest();
        given(teamRepository.findAll()).willReturn(dateTests.getTeams());

        JSONObject requestBody = new JSONObject();
        requestBody.put("username", "user1");
        requestBody.put("password",  "user1");
        requestBody.put("favouriteTeams", new JSONArray(Arrays.asList(1, 2)));
        MvcResult mvcResult = mockMvc.perform(post("/signup")
                .content(requestBody.toString()))
                .andExpect(status().is(200))
                .andReturn();
        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        Role userRole = objectMapper.convertValue(jsonNode.get("user").get("role"), Role.class);
        Team[] teams = objectMapper.convertValue(jsonNode.get("favouriteTeams"), Team[].class);

        MatcherAssert.assertThat(userRole, Matchers.equalTo(Role.USER));
        MatcherAssert.assertThat(teams.length, Matchers.equalTo(2));
    }

    @Test
    void shouldNotRegisterNewUser() throws Exception {
        Users existingUser = dateTests.getUsers().get(0);
        ExampleDataToTest dateTests = new ExampleDataToTest();
        given(teamRepository.findAll()).willReturn(dateTests.getTeams());
        given(userRepository.findByUsername(existingUser.getUsername())).willReturn(existingUser);

        JSONObject requestBody = new JSONObject();
        requestBody.put("username", existingUser.getUsername());
        requestBody.put("password",  "user1");
        requestBody.put("favouriteTeams", new JSONArray(Arrays.asList(1, 2)));
        MvcResult mvcResult = mockMvc.perform(post("/signup")
                .content(requestBody.toString()))
                .andExpect(status().is(409))
                .andReturn();
        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        String errorMessage = objectMapper.convertValue(jsonNode.get("error"), String.class);

        MatcherAssert.assertThat(errorMessage, Matchers.equalTo("Username is not unique"));
    }

    @Test
    void shouldGetTeams() throws Exception {
        ExampleDataToTest dateTests = new ExampleDataToTest();
        given(teamRepository.findAll()).willReturn(dateTests.getTeams());

        MvcResult mvcResult = mockMvc.perform(get("/dashboard/teams"))
                .andExpect(status().is(200))
                .andReturn();
        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        Team[] teams = objectMapper.convertValue(jsonNode.get("teams"), Team[].class);

        MatcherAssert.assertThat(teams.length, Matchers.equalTo(4));
    }

    @Test
    void shouldGetMatches() throws Exception {
        ExampleDataToTest dateTests = new ExampleDataToTest();
        given(matchRepository.findAll()).willReturn(dateTests.getMatches());

        MvcResult mvcResult = mockMvc.perform(get("/dashboard/matches"))
                .andExpect(status().is(200))
                .andReturn();
        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        Match[] matches = objectMapper.convertValue(jsonNode.get("matches"), Match[].class);

        MatcherAssert.assertThat(matches.length, Matchers.equalTo(4));
    }

    @Test
    void shouldGetMatch() throws Exception {
        Long id = 1L;
        ExampleDataToTest dateTests = new ExampleDataToTest();
        given(matchRepository.findById(id)).willReturn(Optional.of(dateTests.getMatches().get(0)));

        MvcResult mvcResult = mockMvc.perform(get("/dashboard/matches/"+id))
                .andExpect(status().is(200))
                .andReturn();
        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        Match match = objectMapper.convertValue(jsonNode.get("match"), Match.class);

        MatcherAssert.assertThat(match, Matchers.notNullValue());
        MatcherAssert.assertThat(match.getHomeTeam().getName(), Matchers.equalTo("Cracovia Kraków"));
        MatcherAssert.assertThat(match.getAwayTeam().getName(), Matchers.equalTo("Górnik Zabrze"));
    }

}
