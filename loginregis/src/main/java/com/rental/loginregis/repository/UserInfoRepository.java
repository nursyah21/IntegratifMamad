package com.rental.loginregis.repository;

import com.rental.loginregis.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface  UserInfoRepository extends JpaRepository<UserInfo, Long> {

    // Optional<UserInfo> findByUsername(String username);
    Optional<UserInfo> findByUsername(String username);
}
