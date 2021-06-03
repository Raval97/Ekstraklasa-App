package com.example.ekstraklasa.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.service.spi.InjectService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "users")
public class Users implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private Role role;
    @JsonBackReference
    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
    private Set<FavouriteTeam> favouriteTeams = new HashSet<>();

    public Users(String username, String password) {
        this(username, password, Role.USER);
    }

    public Users(String username, String password, Role role) {
        this.username = username;
        this.password = passwordEncoder().encode(password);
        this.role = role;
    }

    public Users(Long id, String username, String password, Role role) {
        this.id = id;
        this.username = username;
        this.password = passwordEncoder().encode(password);
        this.role = role;
    }

    public Users() {
        super();
    }

    public void setPassword(String password) {
        this.password = passwordEncoder().encode(password);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + role.toString()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @InjectService
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    public static String getUserName() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        String userName = null;
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            userName = userDetails.getUsername();
        }
        return userName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Users)) return false;
        Users users = (Users) o;
        return Objects.equals(getId(), users.getId()) && Objects.equals(getUsername(),
                users.getUsername()) && Objects.equals(getPassword(), users.getPassword())
                && getRole() == users.getRole() && Objects.equals(getFavouriteTeams(), users.getFavouriteTeams());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getUsername(), getPassword(), getRole());
    }

}
