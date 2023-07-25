package com.matchamang.yuridan.repository;

import com.matchamang.yuridan.entity.PenyewaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

public interface PenyewaRepository extends JpaRepository<PenyewaEntity, Long> {
    PenyewaEntity findByNIKPenyewa(String NIKPenyewa);
    List<PenyewaEntity> findByStatusHapus(boolean statusHapus);
    List<PenyewaEntity> findByStatusSedangSewa(boolean statusSedangSewa);
}
