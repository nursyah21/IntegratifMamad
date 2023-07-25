package com.matchamang.yuridan.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "tb_kendaraan_log")
public class KendaraanLogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_log")
    private Long id;

    @Column(name = "id_kendaraan")
    private int idKendaraan;

    @Column(name = "version")
    private int version;

    @Column(name = "tanggal_perubahan")
    private Date tanggalPerubahan;

    @Column(name = "merk_kendaraan")
    private String merkKendaraan;

    @Column(name = "tipe_kendaraan")
    private String tipeKendaraan;

    @Column(name = "jenis_kendaraan")
    private String jenisKendaraan;

    @Column(name = "tahun_keluaran")
    private String tahunKeluaran;

    @Column(name = "kapasitas_kursi")
    private int kapasitasKursi;

    @Column(name = "harga_sewa")
    private int hargaSewa;

    public KendaraanLogEntity() {
    }

    public KendaraanLogEntity(Long id, int idKendaraan, int version, Date tanggalPerubahan, String merkKendaraan, String tipeKendaraan, String jenisKendaraan, String tahunKeluaran, int kapasitasKursi, int hargaSewa) {
        this.id = id;
        this.idKendaraan = idKendaraan;
        this.version = version;
        this.tanggalPerubahan = tanggalPerubahan;
        this.merkKendaraan = merkKendaraan;
        this.tipeKendaraan = tipeKendaraan;
        this.jenisKendaraan = jenisKendaraan;
        this.tahunKeluaran = tahunKeluaran;
        this.kapasitasKursi = kapasitasKursi;
        this.hargaSewa = hargaSewa;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getIdKendaraan() {
        return idKendaraan;
    }

    public void setIdKendaraan(int idKendaraan) {
        this.idKendaraan = idKendaraan;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public Date getTanggalPerubahan() {
        return tanggalPerubahan;
    }

    public void setTanggalPerubahan(Date tanggalPerubahan) {
        this.tanggalPerubahan = tanggalPerubahan;
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

    public int getKapasitasKursi() {
        return kapasitasKursi;
    }

    public void setKapasitasKursi(int kapasitasKursi) {
        this.kapasitasKursi = kapasitasKursi;
    }

    public int getHargaSewa() {
        return hargaSewa;
    }

    public void setHargaSewa(int hargaSewa) {
        this.hargaSewa = hargaSewa;
    }
}
