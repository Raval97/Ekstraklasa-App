package com.example.ekstraklasa.controllers;

import com.example.ekstraklasa.models.Users;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.json.JSONArray;
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
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest()
@WithMockUser(username = "user")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class DashboardUserControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Order(1)
    @Test
    void shouldSaveUsersFavouriteTeams() throws Exception {
        JSONObject requestBody = new JSONObject();
        requestBody.put("favouriteTeams", new JSONArray(Arrays.asList(2, 3)));
        MvcResult mvcResult = mockMvc.perform(put("/favourite_teams")
                .content(requestBody.toString()))
                .andExpect(status().is(200))
                .andReturn();
        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        String[] favouriteTeams = objectMapper.convertValue(jsonNode.get("favouriteTeam"), String[].class);

        MatcherAssert.assertThat(favouriteTeams.length, Matchers.equalTo(2));
        MatcherAssert.assertThat(favouriteTeams, Matchers.equalTo(new String[]{"Górnik Zabrze", "Jagielonia Białystok"}));

    }

    @Order(2)
    @Test
    void shouldGetUsersFavouriteTeams() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/favourite_teams"))
                .andExpect(status().is(200))
                .andReturn();
        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        Long[] favouriteTeams = objectMapper.convertValue(jsonNode.get("teams"), Long[].class);

        MatcherAssert.assertThat(favouriteTeams.length, Matchers.equalTo(2));
        MatcherAssert.assertThat(favouriteTeams[0], Matchers.equalTo(2L));
    }

    @Order(3)
    @Test
    void shouldNotUpdateAccountUsername() throws Exception {
        JSONObject requestBody = new JSONObject();
        requestBody.put("incorrect_parameter", "new_user");
        requestBody.put("incorrect_parameter", "user");
        MvcResult mvcResult = mockMvc.perform(put("/update_account")
                .content(requestBody.toString()))
                .andDo(print())
                .andExpect(status().is(400))
                .andReturn();
        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        String response = objectMapper.convertValue(jsonNode.get("error"), String.class);

        MatcherAssert.assertThat(response, Matchers.equalTo("Wrong data format"));
    }

    @Order(4)
    @Test
    void shouldUpdateAccountUsername() throws Exception {
        JSONObject requestBody = new JSONObject();
        requestBody.put("username", "new_user");
        requestBody.put("password", "new_user");
        MvcResult mvcResult = mockMvc.perform(put("/update_account")
                .content(requestBody.toString()))
                .andDo(print())
                .andExpect(status().is(200))
                .andReturn();

        JsonNode jsonNode = objectMapper.readTree(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8));
        jsonNode = prepareJsonToUserModel(jsonNode);
        Users user = objectMapper.convertValue(jsonNode.get("user"), Users.class);

        MatcherAssert.assertThat(user, Matchers.notNullValue());
        MatcherAssert.assertThat(user.getUsername(), Matchers.equalTo("new_user"));
    }

    private JsonNode prepareJsonToUserModel(JsonNode jsonNode){
        List<String> variablesToRemoveFromNode = Arrays.asList(
                "enabled", "authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired"
        );
        if (jsonNode.has("user") && (jsonNode.get("user") instanceof ObjectNode node)) {
            variablesToRemoveFromNode.forEach(name -> {
                if (node.has(name))
                    node.remove(name);
            });
        }
        return jsonNode;
    }

}
