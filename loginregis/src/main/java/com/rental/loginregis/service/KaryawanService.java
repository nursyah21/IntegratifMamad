package com.rental.loginregis.service;

import com.rental.loginregis.dto.KaryawanDTO;
import com.rental.loginregis.model.KaryawanEntity;

import java.util.List;

public interface KaryawanService {

    KaryawanEntity create(KaryawanEntity karyawanEntity);
    KaryawanEntity update(Long id, KaryawanEntity karyawanEntity);
    Boolean delete(Long id);
    List<KaryawanEntity> findAll();
    KaryawanEntity finbById(Long id);
    KaryawanDTO mapToDto(KaryawanEntity karyawanEntity);
    KaryawanEntity mapToEntity(KaryawanDTO karyawanDTO);

}