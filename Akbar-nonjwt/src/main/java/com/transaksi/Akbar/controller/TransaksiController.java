package com.transaksi.Akbar.controller;

import com.transaksi.Akbar.DTO.TransaksiDTO;
import com.transaksi.Akbar.service.TransaksiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/transaksi")
public class TransaksiController {
    private final TransaksiService transaksiService;

    @Autowired
    public TransaksiController(TransaksiService transaksiService) {
        this.transaksiService = transaksiService;
    }

    @PostMapping("/baru")
    public ResponseEntity<?> createTransaksi(
            @RequestBody TransaksiDTO transaksiDTO
    ) {
        transaksiService.createTransaksi(transaksiDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @PutMapping("/id:{idTransaksi}/edit-status")
    public void editStatusSewa(
            @PathVariable Long idTransaksi,
            @RequestBody Map<String, Object> StatusSewaData
    ) {
        String newStatusSewa = (String) StatusSewaData.get("statusSewa");
        transaksiService.editStatusSewa(idTransaksi, newStatusSewa);
    }
    @PutMapping("/id:{idTransaksi}/edit-pengembalian")
    public void editPengembalian(
            @PathVariable Long idTransaksi,
            @RequestBody Map<String, Object> pengembalianData
    ) {
        String newNotePengembalian = (String) pengembalianData.get("notePengembalian");
        Integer newTambahanHari = (Integer) pengembalianData.get("tambahanHari");
        transaksiService.editPengembalian(idTransaksi, newNotePengembalian, newTambahanHari);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<TransaksiDTO>> findAllTransaksi() {
        List<TransaksiDTO> transaksiDTOList = transaksiService.findAllTransaksi();
        return ResponseEntity.ok(transaksiDTOList);
    }
    @GetMapping("/find/id:{idTransaksi}")
    public ResponseEntity<TransaksiDTO> findTransaksiById(@PathVariable Long idTransaksi) {
        TransaksiDTO transaksiDTO = transaksiService.findTransaksiById(idTransaksi);
        if (transaksiDTO != null) {
            return ResponseEntity.ok(transaksiDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
