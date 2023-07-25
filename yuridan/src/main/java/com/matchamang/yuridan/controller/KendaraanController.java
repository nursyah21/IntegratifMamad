package com.matchamang.yuridan.controller;

import com.matchamang.yuridan.DTO.KendaraanDTO;
import com.matchamang.yuridan.entity.KendaraanLogEntity;
import com.matchamang.yuridan.service.KendaraanService;
import com.matchamang.yuridan.entity.KendaraanEntity;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@RestController
@RequestMapping("/kendaraan")
public class KendaraanController {

    private final KendaraanService kendaraanService;

    @Autowired
    public KendaraanController(KendaraanService kendaraanService) {this.kendaraanService = kendaraanService;}

    @PostMapping("/create")
    public ResponseEntity<KendaraanEntity> createKendaraan(@RequestBody KendaraanDTO kendaraanDTO) {
        KendaraanEntity kendaraan = kendaraanService.createKendaraan(kendaraanDTO.toEntity());
        return new ResponseEntity<>(kendaraan, HttpStatus.CREATED);
    }

//    @PostMapping("/create")
//    public ResponseEntity<KendaraanEntity> createKendaraan(
//            @RequestPart("kendaraan") KendaraanEntity kendaraan,
//            @RequestPart("fotoKendaraan") MultipartFile fotoKendaraan) {
//        KendaraanEntity createdKendaraan = kendaraanService.createKendaraan(kendaraan, fotoKendaraan);
//        return new ResponseEntity<>(createdKendaraan, HttpStatus.CREATED);
//    }

//    @GetMapping("/super-all")
//    public ResponseEntity<List<KendaraanEntity>> getAllKendaraanSortedByJenis() {
//        List<KendaraanEntity> kendaraanDTOList = kendaraanService.findAllKendaraanSortedByJenis();
//
//        return ResponseEntity.ok(kendaraanDTOList);
//    }

    @GetMapping("/super-all")
    public List<KendaraanDTO> getAllKendaraanWithStatusKetersediaan() {
        return kendaraanService.findAllKendaraanWithStatusKetersediaan();
    }

    @GetMapping("/all")
    public List<KendaraanDTO> findAllKendaraanNormal() {
        return kendaraanService.findAllKendaraanNormal();
    }

    @GetMapping("/find/id:{idKendaraan}")
    public ResponseEntity<KendaraanDTO> getKendaraanById(@PathVariable Long idKendaraan) {
        KendaraanDTO kendaraanDTO = kendaraanService.findKendaraanById(idKendaraan);
        return ResponseEntity.ok(kendaraanDTO);
    }

    @PutMapping("/edit")
    public ResponseEntity<KendaraanEntity> editKendaraan(@RequestBody KendaraanEntity kendaraan) {
        KendaraanEntity editedKendaraan = kendaraanService.editKendaraan(kendaraan);
        return ResponseEntity.ok(editedKendaraan);
    }

    @PutMapping("/hapus/{idKendaraan}/{statusHapus}")
    public ResponseEntity<String> ubahStatusHapus(@PathVariable Long idKendaraan, @PathVariable boolean statusHapus) {
        KendaraanEntity updatedKendaraan = kendaraanService.ubahStatusHapus(idKendaraan, statusHapus);
        return ResponseEntity.ok("Status hapus kendaraan berhasil diubah");
    }

    @DeleteMapping("/hapus-permanen/{idKendaraan}")
    public ResponseEntity<Void> deleteKendaraan(@PathVariable Long idKendaraan) {
        kendaraanService.deleteKendaraan(idKendaraan);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/log/id:{idKendaraan}")
    public ResponseEntity<List<KendaraanLogEntity>> getKendaraanLogByKendaraanId(@PathVariable int idKendaraan) {
        List<KendaraanLogEntity> kendaraanLogs = kendaraanService.findKendaraanLogByKendaraanId(idKendaraan);
        return ResponseEntity.ok(kendaraanLogs);
    }

    @GetMapping("/log/id:{idKendaraan}/v:{version}")
    public ResponseEntity<List<KendaraanLogEntity>> getKendaraanLogByKendaraanIdAndVersion(@PathVariable int idKendaraan, @PathVariable int version) {
        List<KendaraanLogEntity> kendaraanLogs = kendaraanService.findKendaraanLogByIdAndVersion(idKendaraan, version);
        return ResponseEntity.ok(kendaraanLogs);
    }

    @PutMapping("/status/{idKendaraan}/{statusKetersediaan}")
    public ResponseEntity<String> updateStatusKetersediaan(@PathVariable Long idKendaraan, @PathVariable boolean statusKetersediaan) {
        try {
            kendaraanService.updateStatusKetersediaan(idKendaraan, statusKetersediaan);
            return ResponseEntity.ok("Status ketersediaan kendaraan berhasil diubah");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Terjadi kesalahan dalam mengubah status ketersediaan kendaraan");
        }
    }

    @GetMapping("/find-global/id:{idKendaraan}/v:{version}")
    public ResponseEntity<KendaraanDTO> getKendaraanByIdAndVersion(@PathVariable Long idKendaraan, @PathVariable Integer version) {
        KendaraanDTO kendaraanDTO = kendaraanService.findByIdAndVersionGlobal(idKendaraan, version);

        if (kendaraanDTO != null) {
            return ResponseEntity.ok(kendaraanDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

