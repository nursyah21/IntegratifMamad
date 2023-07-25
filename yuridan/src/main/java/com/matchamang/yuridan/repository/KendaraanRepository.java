package com.matchamang.yuridan.repository;

import com.matchamang.yuridan.entity.KendaraanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface KendaraanRepository extends JpaRepository<KendaraanEntity, Long> {
    @Query("SELECT k FROM KendaraanEntity k WHERE k.statusHapus = false")
    List<KendaraanEntity> findAllByStatusHapusFalseAsc();
    @Query("SELECT k FROM KendaraanEntity k ORDER BY k.jenisKendaraan ASC")
    List<KendaraanEntity> findAllByOrderByJenisKendaraanAsc();
    @Query("SELECT k FROM KendaraanEntity k WHERE k.idKendaraan = :idKendaraan AND k.version = :version")
    KendaraanEntity findByIdAndVersion(@Param("idKendaraan") Long idKendaraan, @Param("version") Integer version);
}
