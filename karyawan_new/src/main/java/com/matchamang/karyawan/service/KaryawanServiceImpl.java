package com.matchamang.karyawan.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.matchamang.karyawan.dto.KaryawanDTO;
import com.matchamang.karyawan.entity.KaryawanEntity;
import com.matchamang.karyawan.repository.KaryawanRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class KaryawanServiceImpl implements KaryawanService{

    @Autowired
    KaryawanRepository karyawanRepository;

    @Override
    public KaryawanEntity create(KaryawanEntity karyawanEntity) {
        final KaryawanEntity result = karyawanRepository.save(karyawanEntity);
        return result;
    }

    @Override
    public KaryawanEntity update(Long id, KaryawanEntity karyawanEntity) {
        KaryawanEntity result = finbById(id);
        if (result != null) {
            result.setNamaKaryawan(karyawanEntity.getNamaKaryawan());
            return karyawanRepository.save(result);
        }
        return null;
    }

    @Override
    public Boolean delete(Long id) {
        final KaryawanEntity result = finbById(id);
        if (result != null) {
            karyawanRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<KaryawanEntity> findAll() {
        return karyawanRepository.findAll();
    }

    @Override
    public KaryawanEntity finbById(Long id) {
        Optional<KaryawanEntity> result = karyawanRepository.findById(id);
        if (result.isPresent()) {
            return result.get();
        }
        return null;
    }

    final ObjectMapper mapper = new ObjectMapper();

    @Override
    public KaryawanDTO mapToDto(KaryawanEntity karyawanEntity) {
        return mapper.convertValue(karyawanEntity, KaryawanDTO.class);
    }

    @Override
    public KaryawanEntity mapToEntity(KaryawanDTO karyawanDTO) {
        return mapper.convertValue(karyawanDTO, KaryawanEntity.class);
    }
}