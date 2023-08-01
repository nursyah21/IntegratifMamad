package com.transaksi.Akbar.DTO;

public class PegawaiResponse {
    private Long id;
    private String namaKaryawan;

    public PegawaiResponse() {
    }

    public PegawaiResponse(Long id, String namaKaryawan, String emailKaryawan, String nikKaryawan, String telpKaryawan, String alamatKaryawan, Integer roleKaryawan) {
        this.id = id;
        this.namaKaryawan = namaKaryawan;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNamaKaryawan() {
        return namaKaryawan;
    }

    public void setNamaKaryawan(String namaKaryawan) {
        this.namaKaryawan = namaKaryawan;
    }
}
