package com.matchamang.yuridan.service.implement;

import com.matchamang.yuridan.entity.PenyewaEntity;
import com.matchamang.yuridan.repository.PenyewaRepository;
import com.matchamang.yuridan.service.PenyewaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PenyewaServiceImpl implements PenyewaService {
    private final PenyewaRepository penyewaRepository;

    @Autowired
    public PenyewaServiceImpl(PenyewaRepository penyewaRepository) {
        this.penyewaRepository = penyewaRepository;
    }

    @Override
    public PenyewaEntity saveOrUpdatePenyewa(PenyewaEntity penyewa) {
        PenyewaEntity existingPenyewa = penyewaRepository.findByNIKPenyewa(penyewa.getNIKPenyewa());

        if (existingPenyewa != null) {
            existingPenyewa.setNamaPenyewa(penyewa.getNamaPenyewa());
            existingPenyewa.setNoTlpnPenyewa(penyewa.getNoTlpnPenyewa());
            existingPenyewa.setAlamatPenyewa(penyewa.getAlamatPenyewa());
            return penyewaRepository.save(existingPenyewa);
        } else {
            penyewa.setNIKPenyewa(penyewa.getNIKPenyewa());
            return penyewaRepository.saveAndFlush(penyewa);
        }
    }

    @Override
    public List<PenyewaEntity> getAllPenyewa() {
        return penyewaRepository.findAll();
    }

    @Override
    public List<PenyewaEntity> getAllSedangSewa() {
        return penyewaRepository.findByStatusSedangSewa(true);
    }

    @Override
    public List<PenyewaEntity> getAllActivePenyewa() {
        return penyewaRepository.findByStatusHapus(false);
    }

    @Override
    public void updateStatusHapus(Long penyewaId, boolean statusHapus) {
        PenyewaEntity penyewa = penyewaRepository.findById(penyewaId)
                .orElseThrow(() -> new RuntimeException("Penyewa not found with id: " + penyewaId));

        penyewa.setStatusHapus(statusHapus);
        penyewaRepository.save(penyewa);
    }

    @Override
    public void updateStatusSedangSewa(Long penyewaId, boolean statusSedangSewa) {
        PenyewaEntity penyewa = penyewaRepository.findById(penyewaId)
                .orElseThrow(() -> new RuntimeException("Penyewa not found with id: " + penyewaId));

        penyewa.setStatusSedangSewa(statusSedangSewa);
        penyewaRepository.save(penyewa);
    }

    @Override
    public void deletePenyewa(Long penyewaId) {
        penyewaRepository.deleteById(penyewaId);
    }
    @Override
    public PenyewaEntity findPenyewaById(Long idPenyewa) {
        return penyewaRepository.findById(idPenyewa)
                .orElseThrow(() -> new EntityNotFoundException("Penyewa not found"));
    }
}