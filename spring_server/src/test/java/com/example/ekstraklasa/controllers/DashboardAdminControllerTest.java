package com.example.ekstraklasa.controllers;

import com.example.ekstraklasa.models.Match;
import com.example.ekstraklasa.models.Role;
import com.example.ekstraklasa.models.Users;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.json.JSONObject;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@AutoConfigureMockMvc
@SpringBootTest()
@WithMockUser(username = "admin", roles = "ADMIN")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class DashboardAdminControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    private static Users exampleUser = new Users();

    @Order(1)
    @Test
    void shouldGetUsers() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/users"))
                .andExpect(status().is(200))
                .andReturn();
        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        jsonNode = prepareJsonToUserModel(jsonNode);
        Users[] users = objectMapper.convertValue(jsonNode.get("users"), Users[].class);

        MatcherAssert.assertThat(users, Matchers.notNullValue());
        MatcherAssert.assertThat(users.length, Matchers.equalTo(4));
        exampleUser = users[0];
    }

    @Order(2)
    @Test
    void shouldChangeUserPermission() throws Exception {
        MvcResult mvcResult = mockMvc.perform(put("/users/"+exampleUser.getId()))
                .andExpect(status().is(200))
                .andReturn();
        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        String userRole = objectMapper.convertValue(jsonNode.get("user_role"), String.class);

        MatcherAssert.assertThat(userRole, Matchers.notNullValue());
        MatcherAssert.assertThat(userRole, Matchers.equalTo(oppositeRole(exampleUser.getRole())));
    }

    private String oppositeRole(Role role) {
        return (role.equals(Role.USER)) ? "ADMIN" : "USER";
    }

    @Order(3)
    @Test
    void shouldAddNewMatch() throws Exception {
        int countOfMatchesBeforeRequest = getCountOfMatchesInDatabase();
        JSONObject requestBody = new JSONObject();
        requestBody.put("homeTeam", 13);
        requestBody.put("homeScore", 2);
        requestBody.put("awayTeam", 4);
        requestBody.put("awayScore", 2);
        requestBody.put("round", 3);
        requestBody.put("place", "Poznan");
        requestBody.put("date", LocalDate.now());
        MvcResult mvcResult = mockMvc.perform(post("/dashboard/matches")
                .content(requestBody.toString()))
                .andExpect(status().is(200))
                .andReturn();
        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        Match createdMatch = objectMapper.convertValue(jsonNode.get("match"), Match.class);

        MatcherAssert.assertThat(createdMatch, Matchers.notNullValue());
        MatcherAssert.assertThat(createdMatch.getHomeScore(), Matchers.equalTo(2));
        MatcherAssert.assertThat(createdMatch.getAwayScore(), Matchers.equalTo(2));
        MatcherAssert.assertThat(createdMatch.getPlace(), Matchers.equalTo("Poznan"));
        MatcherAssert.assertThat(countOfMatchesBeforeRequest, Matchers.equalTo(getCountOfMatchesInDatabase() - 1));
    }

    @Order(4)
    @Test
    void shouldUpdateMatch() throws Exception {
        JSONObject requestBody = new JSONObject();
        requestBody.put("homeTeam", 14);
        requestBody.put("homeScore", 3);
        requestBody.put("awayTeam", 4);
        requestBody.put("awayScore", 1);
        requestBody.put("round", 3);
        requestBody.put("place", "Warszawa");
        requestBody.put("date", LocalDate.now());
        MvcResult mvcResult = mockMvc.perform(put("/dashboard/matches/1")
                .content(requestBody.toString()))
                .andExpect(status().is(200))
                .andReturn();
        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        Match updatedMatch = objectMapper.convertValue(jsonNode.get("match"), Match.class);

        MatcherAssert.assertThat(updatedMatch, Matchers.notNullValue());
        MatcherAssert.assertThat(updatedMatch.getHomeScore(), Matchers.equalTo(3));
        MatcherAssert.assertThat(updatedMatch.getAwayScore(), Matchers.equalTo(1));
        MatcherAssert.assertThat(updatedMatch.getPlace(), Matchers.equalTo("Warszawa"));
    }

    @Order(5)
    @Test
    void shouldDeleteMatch() throws Exception {
        int countOfMatchesBeforeRequest = getCountOfMatchesInDatabase();
        MvcResult mvcResult = mockMvc.perform(delete("/dashboard/matches/1"))
                .andExpect(status().is(200))
                .andReturn();
        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        Match deletedMatch = objectMapper.convertValue(jsonNode.get("match"), Match.class);

        MatcherAssert.assertThat(deletedMatch, Matchers.notNullValue());
        MatcherAssert.assertThat(countOfMatchesBeforeRequest, Matchers.equalTo(getCountOfMatchesInDatabase() + 1));
    }

    @Order(6)
    @Test
    void shouldNotDeleteMatch() throws Exception {
        MvcResult mvcResult = mockMvc.perform(delete("/dashboard/matches/999"))
                .andExpect(status().is(404))
                .andReturn();
        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        String response = objectMapper.convertValue(jsonNode.get("error"), String.class);

        MatcherAssert.assertThat(response, Matchers.equalTo("Wrong index of match"));
    }


    private JsonNode prepareJsonToUserModel(JsonNode jsonNode){
        List<String> variablesToRemoveFromNode = Arrays.asList(
                "enabled", "authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired"
        );
        if (jsonNode.has("users") && (jsonNode.get("users") instanceof ArrayNode nodeArray)) {
            nodeArray.forEach(node -> {
                if (node instanceof ObjectNode newNode) {
                    variablesToRemoveFromNode.forEach(name -> {
                        if (newNode.has(name))
                            newNode.remove(name);
                    });
                }
            });
        }
        return jsonNode;
    }

    private int getCountOfMatchesInDatabase() throws Exception {
        String responseFromMatchesEndpoint = mockMvc.perform(get("/dashboard/matches"))
                .andExpect(status().is(200))
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        JsonNode jsonNode = objectMapper.readTree(responseFromMatchesEndpoint);
        Match[] allMatchesInDatabase = objectMapper.convertValue(jsonNode.get("matches"), Match[].class);
        return  allMatchesInDatabase.length;
    }
}
