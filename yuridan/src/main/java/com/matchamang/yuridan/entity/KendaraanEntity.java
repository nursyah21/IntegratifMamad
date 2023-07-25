package com.matchamang.yuridan.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_kendaraan")
public class KendaraanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_kendaraan")
    private Long idKendaraan;
    @Version
    private Integer version;
    @Column(name = "merk_kendaraan")
    private String merkKendaraan;
    @Column(name = "tipe_kendaraan")
    private String tipeKendaraan;
    @Column(name = "jenis_kendaraan")
    private String jenisKendaraan;
    @Column(name = "tahun_keluaran")
    private String tahunKeluaran;
    @Column(name = "kapasitas_kursi")
    private Integer kapasitasKursi;
    @Column(name = "harga_sewa")
    private Integer hargaSewa;
    @Column(name = "status_hapus")
    private boolean statusHapus = false;

    public KendaraanEntity() {
    }

    public KendaraanEntity(Long idKendaraan, Integer version, String merkKendaraan, String tipeKendaraan, String jenisKendaraan, String tahunKeluaran, Integer kapasitasKursi, Integer hargaSewa, boolean statusHapus) {
        this.idKendaraan = idKendaraan;
        this.version = version;
        this.merkKendaraan = merkKendaraan;
        this.tipeKendaraan = tipeKendaraan;
        this.jenisKendaraan = jenisKendaraan;
        this.tahunKeluaran = tahunKeluaran;
        this.kapasitasKursi = kapasitasKursi;
        this.hargaSewa = hargaSewa;
        this.statusHapus = statusHapus;
    }

    public Long getIdKendaraan() {
        return idKendaraan;
    }

    public void setIdKendaraan(Long idKendaraan) {
        this.idKendaraan = idKendaraan;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public String getMerkKendaraan() {
        return merkKendaraan;
    }

    public void setMerkKendaraan(String merkKendaraan) {
        this.merkKendaraan = merkKendaraan;
    }

    public String getTipeKendaraan() {
        return tipeKendaraan;
    }

    public void setTipeKendaraan(String tipeKendaraan) {
        this.tipeKendaraan = tipeKendaraan;
    }

    public String getJenisKendaraan() {
        return jenisKendaraan;
    }

    public void setJenisKendaraan(String jenisKendaraan) {
        this.jenisKendaraan = jenisKendaraan;
    }

    public String getTahunKeluaran() {
        return tahunKeluaran;
    }

    public void setTahunKeluaran(String tahunKeluaran) {
        this.tahunKeluaran = tahunKeluaran;
    }

    public Integer getKapasitasKursi() {
        return kapasitasKursi;
    }

    public void setKapasitasKursi(Integer kapasitasKursi) {
        this.kapasitasKursi = kapasitasKursi;
    }

    public Integer getHargaSewa() {
        return hargaSewa;
    }

    public void setHargaSewa(Integer hargaSewa) {
        this.hargaSewa = hargaSewa;
    }

    public boolean isStatusHapus() {
        return statusHapus;
    }

    public void setStatusHapus(boolean statusHapus) {
        this.statusHapus = statusHapus;
    }

    @OneToOne(mappedBy = "kendaraan", cascade = CascadeType.ALL)
    private StatusKetersediaanEntity statusKetersediaan;

    public StatusKetersediaanEntity getStatusKetersediaan() {
        return statusKetersediaan;
    }

    public void setStatusKetersediaan(StatusKetersediaanEntity statusKetersediaan) {
        this.statusKetersediaan = statusKetersediaan;
    }
}
