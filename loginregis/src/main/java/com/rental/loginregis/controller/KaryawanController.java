package com.rental.loginregis.controller;

import com.rental.loginregis.dto.KaryawanDTO;
import com.rental.loginregis.model.KaryawanEntity;
import com.rental.loginregis.service.KaryawanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/karyawan")
public class KaryawanController {

    @Autowired
    KaryawanService karyawanService;

    @PostMapping("/create")
    public KaryawanDTO create(@RequestBody KaryawanDTO request) {
        KaryawanEntity karyawanEntity = karyawanService.mapToEntity(request);
        KaryawanEntity result = karyawanService.create(karyawanEntity);
        return karyawanService.mapToDto(result);
    }

    @PutMapping("/update/{id}")
    public KaryawanDTO update(@PathVariable Long id, @RequestBody KaryawanDTO request) {
        KaryawanEntity karyawanEntity = karyawanService.mapToEntity(request);
        KaryawanEntity result = karyawanService.update(id, karyawanEntity);
        return karyawanService.mapToDto(result);
    }

    @GetMapping("/all")
    public List<KaryawanDTO> findAll() {
        return karyawanService.findAll().stream().map(karyawanEntity -> karyawanService.mapToDto(karyawanEntity))
                .collect(Collectors.toList());
        //pliss don't show the password

    }

    @GetMapping("/{id}")
    public KaryawanDTO findById(@PathVariable Long id) {
        KaryawanEntity karyawanEntity = karyawanService.finbById(id);
        // Convert KaryawanEntity to KaryawanDTO
        KaryawanDTO karyawanDTO = new KaryawanDTO(
                karyawanEntity.getId(),
                karyawanEntity.getUsername(),
                karyawanEntity.getPassword(),
                karyawanEntity.getNamaKaryawan(),
                karyawanEntity.getNikKaryawan(),
                karyawanEntity.getTelpKaryawan(),
                karyawanEntity.getAlamatKaryawan(),
                karyawanEntity.getRoleKaryawan()
        );
        return karyawanDTO;
    }

    @DeleteMapping("/delete/{id}")
    public Boolean delete(@PathVariable Long id) {
        return karyawanService.delete(id);
    }
}