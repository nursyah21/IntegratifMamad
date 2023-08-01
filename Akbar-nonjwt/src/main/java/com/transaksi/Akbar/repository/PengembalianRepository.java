package com.transaksi.Akbar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.transaksi.Akbar.entity.PengembalianEntity;

import java.util.*;

@Repository
public interface PengembalianRepository extends JpaRepository<PengembalianEntity, Long> {
    Optional<PengembalianEntity> findByTransaksiIdTransaksi(Long idTransaksi);
}
