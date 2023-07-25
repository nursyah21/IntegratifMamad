package com.transaksi.Akbar.DTO;

public class KendaraanResponse {
    private Long idKendaraan;
    private Integer version;
    private String merkKendaraan;
    private String tipeKendaraan;
    private String jenisKendaraan;
    private String tahunKeluaran;
    private Integer kapasitasKursi;
    private Integer hargaSewa;
    private boolean statusKetersediaan;
    private boolean statusHapus;

    public KendaraanResponse() {
    }

    public KendaraanResponse(Long idKendaraan, Integer version, String merkKendaraan, String tipeKendaraan, String jenisKendaraan, String tahunKeluaran, Integer kapasitasKursi, Integer hargaSewa, boolean statusKetersediaan, boolean statusHapus) {
        this.idKendaraan = idKendaraan;
        this.version = version;
        this.merkKendaraan = merkKendaraan;
        this.tipeKendaraan = tipeKendaraan;
        this.jenisKendaraan = jenisKendaraan;
        this.tahunKeluaran = tahunKeluaran;
        this.kapasitasKursi = kapasitasKursi;
        this.hargaSewa = hargaSewa;
        this.statusKetersediaan = statusKetersediaan;
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

    public boolean isStatusKetersediaan() {
        return statusKetersediaan;
    }

    public void setStatusKetersediaan(boolean statusKetersediaan) {
        this.statusKetersediaan = statusKetersediaan;
    }

    public boolean isStatusHapus() {
        return statusHapus;
    }

    public void setStatusHapus(boolean statusHapus) {
        this.statusHapus = statusHapus;
    }
}
