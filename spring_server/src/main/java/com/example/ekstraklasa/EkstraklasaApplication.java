package com.example.ekstraklasa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EkstraklasaApplication {

    public static void main(String[] args) {
        System.setProperty("server.servlet.context-path", "/Ekstraklasa");
        SpringApplication.run(EkstraklasaApplication.class, args);
    }

}
