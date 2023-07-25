package com.matchamang.karyawan.repository;

import com.matchamang.karyawan.entity.KaryawanEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KaryawanRepository extends JpaRepository<KaryawanEntity, Long> {
}