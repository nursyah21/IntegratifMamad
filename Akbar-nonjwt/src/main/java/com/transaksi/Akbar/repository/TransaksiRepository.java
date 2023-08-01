package com.transaksi.Akbar.repository;

import com.transaksi.Akbar.entity.TransaksiEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransaksiRepository extends JpaRepository<TransaksiEntity, Long> {
}
