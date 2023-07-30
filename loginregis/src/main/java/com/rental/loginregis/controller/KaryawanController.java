package com.rental.loginregis.controller;

import com.rental.loginregis.dto.KaryawanDTO;
import com.rental.loginregis.model.KaryawanEntity;
import com.rental.loginregis.service.KaryawanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/karyawan")
public class KaryawanController {

    @Autowired
    KaryawanService karyawanService;

    private static final Logger LOGGER = LoggerFactory.getLogger(KaryawanController.class);
    
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

    // @CrossOrigin
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public List<KaryawanDTO> findAll() {
        LOGGER.info("get all");
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

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/delete/{id}")
    public Boolean delete(@PathVariable Long id) {
        return karyawanService.delete(id);
    }
}