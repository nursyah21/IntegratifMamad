package com.rental.loginregis.repository;

import com.rental.loginregis.model.KaryawanEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KaryawanRepository extends JpaRepository<KaryawanEntity, Long> {
}