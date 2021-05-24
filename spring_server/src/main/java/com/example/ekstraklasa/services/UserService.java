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
        List<Users> users = repo.findAll();
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            result.put("users", users);
            result.put("Status", 200);
        } catch (Exception ex) {
            result.put("Error", ex.getMessage());
            result.put("Status", 500);
        }
        return result;
    }

    public Map<String, Object> editUserPermission(long id) {
        Optional<Users> user = repo.findById(id);
        Map<String, Object> result = new HashMap<>();
        try {
            if (user.isPresent()) {
                user.get().setRole(user.get().getRole().equals(Role.USER) ? Role.ADMIN : Role.USER);
                repo.save(user.get());
                result.put("user_role", user.get().getRole());
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

    public void save(Users user) {
        repo.save(user);
    }

    public Users findUserByUsername(String s) {
        return repo.findByUsername(s);
    }

    public Boolean isUsernameUnique(String username) {
        Optional<Users> user = Optional.ofNullable(repo.findByUsername(username));
        return user.isEmpty();
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
}
