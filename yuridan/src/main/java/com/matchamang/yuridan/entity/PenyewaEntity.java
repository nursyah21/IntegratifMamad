package com.matchamang.yuridan.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_penyewa")
public class PenyewaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_penyewa")
    private Long idPenyewa;
    @Column(name = "nama_penyewa")
    private String namaPenyewa;
    @Column(name = "NIK_penyewa")
    private String NIKPenyewa;
    @Column(name = "no_tlpn_penyewa")
    private String noTlpnPenyewa;
    @Column(name = "alamat_penyewa")
    private String alamatPenyewa;
    @Column(name = "status_sedang_sewa")
    private boolean statusSedangSewa = false;
    @Column(name = "status_hapus")
    private boolean statusHapus = false;

    public PenyewaEntity() {

    }

    public PenyewaEntity(Long idPenyewa, String namaPenyewa, String NIKPenyewa, String noTlpnPenyewa, String alamatPenyewa, boolean statusSedangSewa, boolean statusHapus) {
        this.idPenyewa = idPenyewa;
        this.namaPenyewa = namaPenyewa;
        this.NIKPenyewa = NIKPenyewa;
        this.noTlpnPenyewa = noTlpnPenyewa;
        this.alamatPenyewa = alamatPenyewa;
        this.statusSedangSewa = statusSedangSewa;
        this.statusHapus = statusHapus;
    }

    public Long getIdPenyewa() {
        return idPenyewa;
    }

    public void setIdPenyewa(Long idPenyewa) {
        this.idPenyewa = idPenyewa;
    }

    public String getNamaPenyewa() {
        return namaPenyewa;
    }

    public void setNamaPenyewa(String namaPenyewa) {
        this.namaPenyewa = namaPenyewa;
    }

    public String getNIKPenyewa() {
        return NIKPenyewa;
    }

    public void setNIKPenyewa(String NIKPenyewa) {
        this.NIKPenyewa = NIKPenyewa;
    }

    public String getNoTlpnPenyewa() {
        return noTlpnPenyewa;
    }

    public void setNoTlpnPenyewa(String noTlpnPenyewa) {
        this.noTlpnPenyewa = noTlpnPenyewa;
    }

    public String getAlamatPenyewa() {
        return alamatPenyewa;
    }

    public void setAlamatPenyewa(String alamatPenyewa) {
        this.alamatPenyewa = alamatPenyewa;
    }

    public boolean isStatusSedangSewa() {
        return statusSedangSewa;
    }

    public void setStatusSedangSewa(boolean statusSedangSewa) {
        this.statusSedangSewa = statusSedangSewa;
    }

    public boolean isStatusHapus() {
        return statusHapus;
    }

    public void setStatusHapus(boolean statusHapus) {
        this.statusHapus = statusHapus;
    }

}
