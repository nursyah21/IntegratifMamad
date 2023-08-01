package com.transaksi.Akbar.entity;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "transaksi")
public class TransaksiEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_transaksi")
    private Long idTransaksi;
    @Column(name = "id_kendaraan")
    private Integer idKendaraan;
    @Column(name = "ver_kendaraan")
    private Integer versiKendaraan;
    @Column(name = "tanggal_sewa")
    private Date tanggalSewa;
    @Column(name = "tanggal_kembali")
    private Date tanggalKembali;
    @Column(name = "id_penyewa")
    private Integer idPenyewa;
    @Column(name = "id_pegawai")
    private Integer idPegawai;
    @Column(name = "harga_sewa")
    private Integer hargaSewa;
    @Column(name = "total_harga")
    private Integer totalHargaSewa;
    public TransaksiEntity() {
    }

    public TransaksiEntity(Long idTransaksi, Integer idKendaraan, Integer versiKendaraan, Date tanggalSewa, Date tanggalKembali, Integer idPenyewa, Integer idPegawai, Integer hargaSewa, Integer totalHargaSewa) {
        this.idTransaksi = idTransaksi;
        this.idKendaraan = idKendaraan;
        this.versiKendaraan = versiKendaraan;
        this.tanggalSewa = tanggalSewa;
        this.tanggalKembali = tanggalKembali;
        this.idPenyewa = idPenyewa;
        this.idPegawai = idPegawai;
        this.hargaSewa = hargaSewa;
        this.totalHargaSewa = totalHargaSewa;
    }

    public Long getIdTransaksi() {
        return idTransaksi;
    }

    public void setIdTransaksi(Long idTransaksi) {
        this.idTransaksi = idTransaksi;
    }

    public Integer getIdKendaraan() {
        return idKendaraan;
    }

    public void setIdKendaraan(Integer idKendaraan) {
        this.idKendaraan = idKendaraan;
    }

    public Integer getVersiKendaraan() {
        return versiKendaraan;
    }

    public void setVersiKendaraan(Integer versiKendaraan) {
        this.versiKendaraan = versiKendaraan;
    }

    public Date getTanggalSewa() {
        return tanggalSewa;
    }

    public void setTanggalSewa(Date tanggalSewa) {
        this.tanggalSewa = tanggalSewa;
    }

    public Date getTanggalKembali() {
        return tanggalKembali;
    }

    public void setTanggalKembali(Date tanggalKembali) {
        this.tanggalKembali = tanggalKembali;
    }

    public Integer getIdPenyewa() {
        return idPenyewa;
    }

    public void setIdPenyewa(Integer idPenyewa) {
        this.idPenyewa = idPenyewa;
    }

    public Integer getIdPegawai() {
        return idPegawai;
    }

    public void setIdPegawai(Integer idPegawai) {
        this.idPegawai = idPegawai;
    }

    public Integer getHargaSewa() {
        return hargaSewa;
    }

    public void setHargaSewa(Integer hargaSewa) {
        this.hargaSewa = hargaSewa;
    }

    public Integer getTotalHargaSewa() {
        return totalHargaSewa;
    }

    public void setTotalHargaSewa(Integer totalHargaSewa) {
        this.totalHargaSewa = totalHargaSewa;
    }

}