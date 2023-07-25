package com.matchamang.yuridan.service;

import com.matchamang.yuridan.entity.PenyewaEntity;

import java.util.List;

public interface PenyewaService {
    PenyewaEntity saveOrUpdatePenyewa(PenyewaEntity penyewa);
    List<PenyewaEntity> getAllPenyewa();
    List<PenyewaEntity> getAllActivePenyewa();
    List<PenyewaEntity> getAllSedangSewa();
    void updateStatusHapus(Long penyewaId, boolean statusHapus);
    void updateStatusSedangSewa(Long penyewaId, boolean statusSedangSewa);
    void deletePenyewa(Long penyewaId);
    PenyewaEntity findPenyewaById(Long idPenyewa);
}