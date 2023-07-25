package com.matchamang.yuridan.repository;

import com.matchamang.yuridan.entity.StatusKetersediaanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StatusKetersediaanRepository extends JpaRepository<StatusKetersediaanEntity, Long> {
    @Query("SELECT s FROM StatusKetersediaanEntity s WHERE s.idKendaraan = :idKendaraan")
    StatusKetersediaanEntity findByIdKendaraan(@Param("idKendaraan") Long idKendaraan);

}

