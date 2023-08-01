package com.transaksi.Akbar.entity;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "pengembalian")
public class PengembalianEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pengembalian")
    private Long idPengembalian;

    @OneToOne
    @JoinColumn(name = "id_transaksi")
    private TransaksiEntity transaksi;

    @Column(name = "status_sewa")
    private String statusSewa;

    @Column(name = "note_pengembalian")
    private String notePengembalian;

    @Column(name = "tambahan_hari")
    private Integer tambahanHari;

    @Column(name = "total_bayar")
    private Integer totalBayar;

    public PengembalianEntity() {
    }

    public PengembalianEntity(Long idPengembalian, TransaksiEntity transaksi, String statusSewa, String notePengembalian, Integer tambahanHari, Integer totalBayar) {
        this.idPengembalian = idPengembalian;
        this.transaksi = transaksi;
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

    public TransaksiEntity getTransaksi() {
        return transaksi;
    }

    public void setTransaksi(TransaksiEntity transaksi) {
        this.transaksi = transaksi;
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