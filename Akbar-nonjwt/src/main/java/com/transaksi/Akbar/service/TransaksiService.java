package com.transaksi.Akbar.service;

import com.transaksi.Akbar.DTO.TransaksiDTO;

import java.util.List;

public interface TransaksiService {
    void createTransaksi(TransaksiDTO transaksiDTO);
    List<TransaksiDTO> findAllTransaksi();
    TransaksiDTO findTransaksiById(Long idTransaksi);
    void editStatusSewa(Long idTransaksi, String newStatusSewa);
    void editPengembalian(Long idTransaksi, String newNotePengembalian, Integer newTambahanHari);
}
