package com.example.ekstraklasa.services;

import com.example.ekstraklasa.models.Role;
import com.example.ekstraklasa.models.Users;
import com.example.ekstraklasa.repositories.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private UserRepository repo;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.repo = userRepository;
    }

    public Map<String, Object> listAll() {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            List<Users> users = repo.findAll();
            result.put("users", users);
            result.put("status", 200);
        } catch (Exception ex) {
            result.put("error", ex.getMessage());
            result.put("status", 500);
        }
        return result;
    }

    public Map<String, Object> editUserPermission(long id) {
        Map<String, Object> result = new HashMap<>();
        try {
            Optional<Users> user = repo.findById(id);
            if (user.isPresent()) {
                user.get().setRole(user.get().getRole().equals(Role.USER) ? Role.ADMIN : Role.USER);
                repo.save(user.get());
                result.put("user_role", user.get().getRole());
                result.put("status", 200);

            } else {
                result.put("error", "Wrong id of user");
                result.put("status", 404);
            }
        } catch (Exception ex) {
            result.put("error", ex.getMessage());
            result.put("status", 500);
        }
        return result;
    }

    public void save(Users user) {
        repo.save(user);
    }

    public Users findUserByUsername(String s) {
        return repo.findByUsername(s);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return repo.findByUsername(s);
    }

    public Optional<Users> register(String object) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode jsonNode = mapper.readTree(object);
            String username = mapper.convertValue(jsonNode.get("username"), String.class);
            String password = mapper.convertValue(jsonNode.get("password"), String.class);
            Users newUser = new Users(username, password);
            return Optional.of(newUser);
        } catch (Exception ex) {
            System.out.println(ex);
        }
        return Optional.empty();
    }

    public Map<String, Object> update(Users user, String object) {
        Map<String, Object> response = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode jsonNode = mapper.readTree(object);
            String username = mapper.convertValue(jsonNode.get("username"), String.class);
            String password = mapper.convertValue(jsonNode.get("password"), String.class);
            if (isUsernameChange(user, username) && !isUsernameUnique(username)) {
                throw new Exception("Username is not unique");
            }
            user.setUsername(username);
            user.setPassword(password);
            repo.save(user);
            response.put("user", user);
            response.put("status", 200);
        } catch (Exception ex) {
            if (ex.getMessage().equals("Username is not unique")) {
                response.put("error", ex.getMessage());
                response.put("status", 409);
            } else {
                response.put("error", "Wrong data format");
                response.put("status", 400);
            }
        }
        return response;
    }

    public Boolean isUsernameUnique(String username) {
        Optional<Users> user = Optional.ofNullable(repo.findByUsername(username));
        return user.isEmpty();
    }

    private boolean isUsernameChange(Users user, String newUsername) {
        return !user.getUsername().equals(newUsername);
    }

}
