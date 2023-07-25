package com.matchamang.yuridan.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_kendaraan_status")
public class StatusKetersediaanEntity {

    @Id
    @Column(name = "id_kendaraan")
    private Long idKendaraan;

    @Column(name = "status_ketersediaan")
    private boolean statusKetersediaan  = true;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_kendaraan")
    private KendaraanEntity kendaraan;

    public Long getIdKendaraan() {
        return idKendaraan;
    }

    public void setIdKendaraan(Long idKendaraan) {
        this.idKendaraan = idKendaraan;
    }

    public boolean isStatusKetersediaan() {
        return statusKetersediaan;
    }

    public void setStatusKetersediaan(boolean statusKetersediaan) {
        this.statusKetersediaan = statusKetersediaan;
    }

    public KendaraanEntity getKendaraan() {
        return kendaraan;
    }

    public void setKendaraan(KendaraanEntity kendaraan) {
        this.kendaraan = kendaraan;
    }

    // getters/setters
}
