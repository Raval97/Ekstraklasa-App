package com.example.ekstraklasa.security;

import com.example.ekstraklasa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private UserService userDetailsService;

    @Autowired
    public WebSecurityConfig(UserService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(HttpMethod.GET, "/dashboard/**").permitAll()
                .antMatchers("/favourite_team/**").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/signup/**").permitAll()
                .antMatchers(HttpMethod.POST, "/update_account/**").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/dashboard/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/dashboard/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/dashboard/**").hasRole("ADMIN")
                .antMatchers("/users/**").hasRole("ADMIN")
                .and().formLogin().permitAll()
                .successHandler(authSuccessHandler()).failureHandler(authFailureHandler())
                .and().logout().permitAll().logoutSuccessUrl("/dashboard/teams")
                .and().httpBasic()
                .and().csrf().disable().cors();
    }

    @Bean
    public AuthenticationSuccessHandler authSuccessHandler() {
        return new UrlAuthenticationSuccessHandler();
    }

    @Bean
    public AuthenticationFailureHandler authFailureHandler() {
        return new UrlAuthenticationFailureHandler();
    }

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}

