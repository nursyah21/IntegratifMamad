package com.transaksi.Akbar.DTO;

import jakarta.persistence.Column;

public class PenyewaResponse {
    private Long idPenyewa;
    private String namaPenyewa;
    private String NIKPenyewa;
    private String noTlpnPenyewa;
    private String alamatPenyewa;
    private boolean statusSedangSewa;
    private boolean statusHapus;

    public PenyewaResponse() {
    }

    public PenyewaResponse(Long idPenyewa, String namaPenyewa, String NIKPenyewa, String noTlpnPenyewa, String alamatPenyewa, boolean statusSedangSewa, boolean statusHapus) {
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
