package com.matchamang.yuridan.repository;

import com.matchamang.yuridan.entity.KendaraanEntity;
import com.matchamang.yuridan.entity.KendaraanLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface KendaraanLogRepository extends JpaRepository<KendaraanLogEntity, Long> {
    List<KendaraanLogEntity> findByIdKendaraan(int idKendaraan);
    List<KendaraanLogEntity> findByIdKendaraanAndVersion(int idKendaraan, int version);
    @Query("SELECT k FROM KendaraanLogEntity k WHERE k.idKendaraan = :idKendaraan AND k.version = :version")
    KendaraanLogEntity findByIdAndVersion(@Param("idKendaraan") Integer idKendaraan, @Param("version") Integer version);
}
