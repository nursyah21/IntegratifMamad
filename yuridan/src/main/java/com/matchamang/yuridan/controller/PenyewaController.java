package com.matchamang.yuridan.controller;

import com.matchamang.yuridan.entity.PenyewaEntity;
import com.matchamang.yuridan.service.PenyewaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/penyewa")
public class PenyewaController {
    private final PenyewaService penyewaService;

    @Autowired
    public PenyewaController(PenyewaService penyewaService) {
        this.penyewaService = penyewaService;
    }

    @PostMapping("/create")
    public PenyewaEntity saveOrUpdatePenyewa(@RequestBody PenyewaEntity penyewa) {
        return penyewaService.saveOrUpdatePenyewa(penyewa);
    }

    @GetMapping("/super-all")
    public ResponseEntity<List<PenyewaEntity>> getAllPenyewa() {
        List<PenyewaEntity> AllPenyewaList = penyewaService.getAllPenyewa();
        return new ResponseEntity<>(AllPenyewaList, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PenyewaEntity>> getAllActivePenyewa() {
        List<PenyewaEntity> PenyewaList = penyewaService.getAllActivePenyewa();
        return new ResponseEntity<>(PenyewaList, HttpStatus.OK);
    }
    @GetMapping("/sedang-sewa")
    public ResponseEntity<List<PenyewaEntity>> getAllSedangSewa() {
        List<PenyewaEntity> activePenyewaList = penyewaService.getAllSedangSewa();
        return new ResponseEntity<>(activePenyewaList, HttpStatus.OK);
    }
    @PutMapping("/hapus/{penyewaId}/{statusHapus}")
    public ResponseEntity<Void> updateStatusHapus(@PathVariable Long penyewaId,
                                                  @PathVariable boolean statusHapus) {
        penyewaService.updateStatusHapus(penyewaId, statusHapus);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/sedang-sewa/{penyewaId}/{statusSedangSewa}")
    public ResponseEntity<Void> updateStatusSedangSewa(@PathVariable Long penyewaId,
                                                       @PathVariable boolean statusSedangSewa) {
        penyewaService.updateStatusSedangSewa(penyewaId, statusSedangSewa);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/hapus-permanen/{penyewaId}")
    public ResponseEntity<Void> deletePenyewa(@PathVariable Long penyewaId) {
        penyewaService.deletePenyewa(penyewaId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/find/{idPenyewa}")
    public ResponseEntity<?> findPenyewaById(@PathVariable Long idPenyewa) {
        PenyewaEntity penyewa = penyewaService.findPenyewaById(idPenyewa);
        return ResponseEntity.ok(penyewa);
    }

}
