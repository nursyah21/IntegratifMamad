package com.transaksi.Akbar.DTO;

public class PengembalianDTO {
    private Long idPengembalian;
    private String statusSewa;
    private String notePengembalian;
    private Integer tambahanHari;
    private Integer totalBayar;

    public PengembalianDTO() {
    }

    public PengembalianDTO(Long idPengembalian, String statusSewa, String notePengembalian, Integer tambahanHari, Integer totalBayar) {
        this.idPengembalian = idPengembalian;
        this.statusSewa = statusSewa;
        this.notePengembalian = notePengembalian;
        this.tambahanHari = tambahanHari;
        this.totalBayar = totalBayar;
    }

    public Long getIdPengembalian() {
        return idPengembalian;
    }

    public void setIdPengembalian(Long idPengembalian) {
        this.idPengembalian = idPengembalian;
    }

    public String getStatusSewa() {
        return statusSewa;
    }

    public void setStatusSewa(String statusSewa) {
        this.statusSewa = statusSewa;
    }

    public String getNotePengembalian() {
        return notePengembalian;
    }

    public void setNotePengembalian(String notePengembalian) {
        this.notePengembalian = notePengembalian;
    }

    public Integer getTambahanHari() {
        return tambahanHari;
    }

    public void setTambahanHari(Integer tambahanHari) {
        this.tambahanHari = tambahanHari;
    }

    public Integer getTotalBayar() {
        return totalBayar;
    }

    public void setTotalBayar(Integer totalBayar) {
        this.totalBayar = totalBayar;
    }
}
