package com.transaksi.Akbar.DTO;

import java.util.*;

public class TransaksiDTO {
    private Long idTransaksi;
    private Integer idKendaraan;
    private Integer versiKendaraan;
    private Date tanggalSewa;
    private Date tanggalKembali;
    private Integer idPenyewa;
    private Integer hargaSewa;
    private Integer totalHargaSewa;
    private Integer idPegawai;
//    private PegawaiResponse pegawai;
    private KendaraanResponse kendaraan;
    private PenyewaResponse penyewa;
    private PengembalianDTO pengembalian;
    public TransaksiDTO() {
    }

    public TransaksiDTO(Long idTransaksi, Integer idKendaraan, Integer versiKendaraan, Date tanggalSewa, Date tanggalKembali, Integer idPenyewa, Integer hargaSewa, Integer totalHargaSewa, Integer idPegawai, KendaraanResponse kendaraan, PenyewaResponse penyewa, PengembalianDTO pengembalian) {
        this.idTransaksi = idTransaksi;
        this.idKendaraan = idKendaraan;
        this.versiKendaraan = versiKendaraan;
        this.tanggalSewa = tanggalSewa;
        this.tanggalKembali = tanggalKembali;
        this.idPenyewa = idPenyewa;
        this.hargaSewa = hargaSewa;
        this.totalHargaSewa = totalHargaSewa;
        this.idPegawai = idPegawai;
        this.kendaraan = kendaraan;
        this.penyewa = penyewa;
        this.pengembalian = pengembalian;
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

    public KendaraanResponse getKendaraan() {
        return kendaraan;
    }

    public void setKendaraan(KendaraanResponse kendaraan) {
        this.kendaraan = kendaraan;
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

    public PenyewaResponse getPenyewa() {
        return penyewa;
    }

    public void setPenyewa(PenyewaResponse penyewa) {
        this.penyewa = penyewa;
    }

    public Integer getIdPegawai() {
        return idPegawai;
    }

    public void setIdPegawai(Integer idPegawai) {
        this.idPegawai = idPegawai;
    }

//    public PegawaiResponse getPegawai() {
//        return pegawai;
//    }
//
//    public void setPegawai(PegawaiResponse pegawai) {this.pegawai = pegawai;}

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

    public PengembalianDTO getPengembalian() {
        return pengembalian;
    }

    public void setPengembalian(PengembalianDTO pengembalian) {
        this.pengembalian = pengembalian;
    }
}
