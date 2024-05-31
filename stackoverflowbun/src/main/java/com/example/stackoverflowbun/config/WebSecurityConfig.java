package com.example.stackoverflowbun.config;
//


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()  // Assuming CSRF isn't needed for API calls
        http.csrf().disable().authorizeRequests().anyRequest().permitAll();
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Ensures statelessness, as we're doing API security
//                .and()
//                .authorizeHttpRequests((requests) -> requests
//                        .requestMatchers("/", "/home", "/login", "/user/register/**","/user/getUserByUsername/**","/question/getQuestions").permitAll()  // Allow unauthenticated access to register
//                        .requestMatchers(HttpMethod.POST, "/question/insertQuestion").permitAll()
//
//                        .anyRequest().authenticated()
//                )
//                .httpBasic();  // Basic Authentication, replace if using another method

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user =
                User.withDefaultPasswordEncoder()
                        .username("user")
                        .password("password")
                        .roles("USER")
                        .build();

        return new InMemoryUserDetailsManager(user);
    }
}


