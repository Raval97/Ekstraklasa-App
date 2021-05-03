package com.example.ekstraklasa.services;

import com.example.ekstraklasa.models.Role;
import com.example.ekstraklasa.models.Users;
import com.example.ekstraklasa.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private UserRepository repo;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.repo = userRepository;
    }

    public List<Users> listAll() {
        return repo.findAllUser();
    }

    public Users get(long id) {
        return repo.findByIdUser(id);
    }

    public void save(Users user){
        repo.save(user);
    }

    public void delete(long id) {
        repo.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return repo.findByUsername(s);
    }

    public Users findUserByUsername(String s) {
        return repo.findByUsername(s);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void get() {
        Users user1 = new Users("user", "user");
        Users user2 = new Users("user2", "user2");
        Users user3 = new Users("user3", "user3");
        Users admin = new Users("admin", "admin", Role.ADMIN);
        repo.save(user1);
        repo.save(user2);
        repo.save(user3);
        repo.save(admin);
    }
}
