package com.example.ekstraklasa.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.ekstraklasa.models.Users;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

    Users findByUsername(String username);

    @Query(value = "SELECT * FROM users u WHERE u.id= :id", nativeQuery = true)
    Users findByIdUser(@Param("id") Long id);

    @Query(value = "SELECT * FROM users u Order BY id", nativeQuery = true)
    List<Users> findAllUser();
}
