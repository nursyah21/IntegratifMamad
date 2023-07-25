package com.matchamang.yuridan.service;

import com.matchamang.yuridan.DTO.KendaraanDTO;
import  com.matchamang.yuridan.entity.KendaraanEntity;
import com.matchamang.yuridan.entity.KendaraanLogEntity;

import java.util.List;

public interface KendaraanService {
    KendaraanEntity createKendaraan(KendaraanEntity kendaraan);
    List<KendaraanDTO> findAllKendaraanWithStatusKetersediaan();
    List<KendaraanDTO> findAllKendaraanNormal();
    KendaraanDTO findKendaraanById(Long idKendaraan);
    KendaraanEntity editKendaraan(KendaraanEntity kendaraan);
    KendaraanEntity ubahStatusHapus(Long idKendaraan, boolean statusHapus);
    void deleteKendaraan(Long idKendaraan);
    List<KendaraanLogEntity> findKendaraanLogByKendaraanId(int idKendaraan);
    List<KendaraanLogEntity> findKendaraanLogByIdAndVersion(int idKendaraan, int version);
    void updateStatusKetersediaan(Long idKendaraan, boolean statusKetersediaan);
    KendaraanDTO findByIdAndVersionGlobal(Long idKendaraan, Integer version);
}
