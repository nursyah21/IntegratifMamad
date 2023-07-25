package com.matchamang.yuridan.service.implement;

import com.matchamang.yuridan.DTO.KendaraanDTO;
import com.matchamang.yuridan.entity.KendaraanLogEntity;
import com.matchamang.yuridan.entity.StatusKetersediaanEntity;
import com.matchamang.yuridan.repository.KendaraanLogRepository;
import com.matchamang.yuridan.repository.StatusKetersediaanRepository;
import com.matchamang.yuridan.service.KendaraanService;
import com.matchamang.yuridan.repository.KendaraanRepository;
import com.matchamang.yuridan.entity.KendaraanEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class KendaraanServiceImpl implements KendaraanService {

    // private final String FOTO_DIRECTORY = "jetbrains://idea/navigate/reference?project=yuridan&path=fotoKendaraan";
    private final KendaraanRepository kendaraanRepository;
    private final KendaraanLogRepository kendaraanLogRepository;
    private final StatusKetersediaanRepository statusKetersediaanRepository;
    public KendaraanServiceImpl(KendaraanRepository kendaraanRepository, KendaraanLogRepository kendaraanLogRepository, StatusKetersediaanRepository statusKetersediaanRepository) {
        this.kendaraanRepository = kendaraanRepository;
        this.kendaraanLogRepository = kendaraanLogRepository;
        this.statusKetersediaanRepository = statusKetersediaanRepository;
    }


    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public KendaraanEntity createKendaraan(KendaraanEntity kendaraan) {
        KendaraanEntity createdKendaraan = kendaraanRepository.save(kendaraan);

        StatusKetersediaanEntity statusKetersediaan = new StatusKetersediaanEntity();
        statusKetersediaan.setIdKendaraan(createdKendaraan.getIdKendaraan());
        statusKetersediaanRepository.save(statusKetersediaan);

        return createdKendaraan;
    }

    @Override
    public List<KendaraanDTO> findAllKendaraanWithStatusKetersediaan() {
        List<KendaraanEntity> kendaraanList = kendaraanRepository.findAll();
        List<KendaraanDTO> kendaraanDTOList = new ArrayList<>();

        for (KendaraanEntity kendaraan : kendaraanList) {
            KendaraanDTO kendaraanDTO = new KendaraanDTO();
            kendaraanDTO.setIdKendaraan(kendaraan.getIdKendaraan());
            kendaraanDTO.setVersion(kendaraan.getVersion());
            kendaraanDTO.setMerkKendaraan(kendaraan.getMerkKendaraan());
            kendaraanDTO.setTipeKendaraan(kendaraan.getTipeKendaraan());
            kendaraanDTO.setJenisKendaraan(kendaraan.getJenisKendaraan());
            kendaraanDTO.setTahunKeluaran(kendaraan.getTahunKeluaran());
            kendaraanDTO.setKapasitasKursi(kendaraan.getKapasitasKursi());
            kendaraanDTO.setHargaSewa(kendaraan.getHargaSewa());
            kendaraanDTO.setStatusHapus(kendaraan.isStatusHapus());

            // Melakukan join dengan tabel StatusKetersediaanEntity
            StatusKetersediaanEntity statusKetersediaan = statusKetersediaanRepository.findByIdKendaraan(kendaraan.getIdKendaraan());
            kendaraanDTO.setStatusKetersediaan(statusKetersediaan != null ? statusKetersediaan.isStatusKetersediaan() : false);

            kendaraanDTOList.add(kendaraanDTO);
        }

        return kendaraanDTOList;
    }

    @Override
    public List<KendaraanDTO> findAllKendaraanNormal() {
        List<KendaraanEntity> kendaraanList = kendaraanRepository.findAll();
        List<KendaraanDTO> kendaraanDTOList = new ArrayList<>();

        for (KendaraanEntity kendaraan : kendaraanList) {
            if (!kendaraan.isStatusHapus()) {
                KendaraanDTO kendaraanDTO = new KendaraanDTO();
                kendaraanDTO.setIdKendaraan(kendaraan.getIdKendaraan());
                kendaraanDTO.setVersion(kendaraan.getVersion());
                kendaraanDTO.setMerkKendaraan(kendaraan.getMerkKendaraan());
                kendaraanDTO.setTipeKendaraan(kendaraan.getTipeKendaraan());
                kendaraanDTO.setJenisKendaraan(kendaraan.getJenisKendaraan());
                kendaraanDTO.setTahunKeluaran(kendaraan.getTahunKeluaran());
                kendaraanDTO.setKapasitasKursi(kendaraan.getKapasitasKursi());
                kendaraanDTO.setHargaSewa(kendaraan.getHargaSewa());

                // Melakukan join dengan tabel StatusKetersediaanEntity
                StatusKetersediaanEntity statusKetersediaan = statusKetersediaanRepository.findByIdKendaraan(kendaraan.getIdKendaraan());
                kendaraanDTO.setStatusKetersediaan(statusKetersediaan != null ? statusKetersediaan.isStatusKetersediaan() : false);

                kendaraanDTOList.add(kendaraanDTO);
            }
        }

        return kendaraanDTOList;
    }

    @Override
    public KendaraanDTO findKendaraanById(Long idKendaraan) {
        // Mencari kendaraan berdasarkan ID
        Optional<KendaraanEntity> optionalKendaraan = kendaraanRepository.findById(idKendaraan);
        if (optionalKendaraan.isPresent()) {
            KendaraanEntity kendaraan = optionalKendaraan.get();

            // Mencari status ketersediaan berdasarkan ID kendaraan
            StatusKetersediaanEntity statusKetersediaan = statusKetersediaanRepository.findByIdKendaraan(idKendaraan);

            KendaraanDTO kendaraanDTO = new KendaraanDTO();
            kendaraanDTO.setIdKendaraan(kendaraan.getIdKendaraan());
            kendaraanDTO.setVersion(kendaraan.getVersion());
            kendaraanDTO.setMerkKendaraan(kendaraan.getMerkKendaraan());
            kendaraanDTO.setTipeKendaraan(kendaraan.getTipeKendaraan());
            kendaraanDTO.setJenisKendaraan(kendaraan.getJenisKendaraan());
            kendaraanDTO.setTahunKeluaran(kendaraan.getTahunKeluaran());
            kendaraanDTO.setKapasitasKursi(kendaraan.getKapasitasKursi());
            kendaraanDTO.setHargaSewa(kendaraan.getHargaSewa());
            kendaraanDTO.setStatusKetersediaan(statusKetersediaan.isStatusKetersediaan());
            kendaraanDTO.setStatusHapus(kendaraan.isStatusHapus());


            return kendaraanDTO;
        } else {
            throw new EntityNotFoundException("Kendaraan not found");
        }
    }

    @Override
    public KendaraanEntity editKendaraan(KendaraanEntity kendaraan) {
        KendaraanEntity oldKendaraan = kendaraanRepository.findById(kendaraan.getIdKendaraan())
                .orElseThrow(() -> new EntityNotFoundException("Kendaraan not found"));

        try {
            KendaraanLogEntity kendaraanLog = new KendaraanLogEntity();
            kendaraanLog.setIdKendaraan(oldKendaraan.getIdKendaraan().intValue()); // Mengubah idKendaraan menjadi int
            kendaraanLog.setVersion(oldKendaraan.getVersion());
            kendaraanLog.setTanggalPerubahan(new Date());
            kendaraanLog.setMerkKendaraan(oldKendaraan.getMerkKendaraan());
            kendaraanLog.setTipeKendaraan(oldKendaraan.getTipeKendaraan());
            kendaraanLog.setJenisKendaraan(oldKendaraan.getJenisKendaraan());
            kendaraanLog.setTahunKeluaran(oldKendaraan.getTahunKeluaran());
            kendaraanLog.setKapasitasKursi(oldKendaraan.getKapasitasKursi());
            kendaraanLog.setHargaSewa(oldKendaraan.getHargaSewa());

            kendaraanLogRepository.save(kendaraanLog);

            oldKendaraan.setMerkKendaraan(kendaraan.getMerkKendaraan());
            oldKendaraan.setTipeKendaraan(kendaraan.getTipeKendaraan());
            oldKendaraan.setJenisKendaraan(kendaraan.getJenisKendaraan());
            oldKendaraan.setTahunKeluaran(kendaraan.getTahunKeluaran());
            oldKendaraan.setKapasitasKursi(kendaraan.getKapasitasKursi());
            oldKendaraan.setHargaSewa(kendaraan.getHargaSewa());

            KendaraanEntity editedKendaraan = kendaraanRepository.save(oldKendaraan);

            return editedKendaraan;
        } catch (Exception ex) {
            throw new RuntimeException("Kendaraan has been updated or deleted by another transaction. Please try again.", ex);
        }
    }

    @Override
    public KendaraanEntity ubahStatusHapus(Long idKendaraan, boolean statusHapus) {
        // Mendapatkan kendaraan berdasarkan ID
        KendaraanEntity kendaraan = kendaraanRepository.findById(idKendaraan)
                .orElseThrow(() -> new EntityNotFoundException("Kendaraan not found"));

        // Mengubah nilai statusHapus
        kendaraan.setStatusHapus(statusHapus);

        // Menyimpan perubahan
        KendaraanEntity updatedKendaraan = kendaraanRepository.save(kendaraan);

        return updatedKendaraan;
    }

//    @Override
//    public KendaraanEntity createKendaraan(KendaraanEntity kendaraan, MultipartFile fotoKendaraan) {
//        try {
//            String fileName = fotoKendaraan.getOriginalFilename();
//            String filePath = FOTO_DIRECTORY + File.separator + fileName;
//            File dest = new File(filePath);
//            FileUtils.writeByteArrayToFile(dest, fotoKendaraan.getBytes());
//
//            kendaraan.setFotoKendaraanUrl(filePath);
//
//            return kendaraanRepository.save(kendaraan);
//        } catch (IOException e) {
//            // Handle IO exception
//            return null;
//        }
//    }

    @Override
    public void deleteKendaraan(Long idKendaraan) {
        kendaraanRepository.deleteById(idKendaraan);
    }

    @Override
    public List<KendaraanLogEntity> findKendaraanLogByKendaraanId(int idKendaraan) {
        return kendaraanLogRepository.findByIdKendaraan(idKendaraan);
    }

    @Override
    public List<KendaraanLogEntity> findKendaraanLogByIdAndVersion(int idKendaraan, int version) {
        return kendaraanLogRepository.findByIdKendaraanAndVersion(idKendaraan, version);
    }

    @Override
    public void updateStatusKetersediaan(Long idKendaraan, boolean statusKetersediaan) {
        Optional<StatusKetersediaanEntity> optionalStatus = statusKetersediaanRepository.findById(idKendaraan);
        if (optionalStatus.isPresent()) {
            StatusKetersediaanEntity status = optionalStatus.get();
            status.setStatusKetersediaan(statusKetersediaan);
            statusKetersediaanRepository.save(status);
        } else {
            throw new EntityNotFoundException("Status Ketersediaan not found");
        }
    }
    @Override
    public KendaraanDTO findByIdAndVersionGlobal(Long idKendaraan, Integer version) {
        KendaraanEntity kendaraanEntity = kendaraanRepository.findByIdAndVersion(idKendaraan, version);

        if (kendaraanEntity == null) {
            KendaraanLogEntity kendaraanLogEntity = kendaraanLogRepository.findByIdAndVersion(idKendaraan.intValue(), version);
            if (kendaraanLogEntity == null) {
                throw new EntityNotFoundException("Kendaraan not found with id and version");
            }
            // Konversi KendaraanLogEntity menjadi KendaraanDTO
            return convertToKendaraanDTO(kendaraanLogEntity);
        }

        // Konversi KendaraanEntity menjadi KendaraanDTO
        return convertToKendaraanDTO(kendaraanEntity);
    }

    private KendaraanDTO convertToKendaraanDTO(KendaraanEntity kendaraanEntity) {
        KendaraanDTO kendaraanDTO = new KendaraanDTO();
        kendaraanDTO.setIdKendaraan(kendaraanEntity.getIdKendaraan());
        kendaraanDTO.setVersion(kendaraanEntity.getVersion());
        kendaraanDTO.setMerkKendaraan(kendaraanEntity.getMerkKendaraan());
        kendaraanDTO.setTipeKendaraan(kendaraanEntity.getTipeKendaraan());
        kendaraanDTO.setJenisKendaraan(kendaraanEntity.getJenisKendaraan());
        kendaraanDTO.setTahunKeluaran(kendaraanEntity.getTahunKeluaran());
        kendaraanDTO.setKapasitasKursi(kendaraanEntity.getKapasitasKursi());
        kendaraanDTO.setHargaSewa(kendaraanEntity.getHargaSewa());
        kendaraanDTO.setStatusHapus(kendaraanEntity.isStatusHapus());
        StatusKetersediaanEntity statusKetersediaan = statusKetersediaanRepository.findByIdKendaraan(kendaraanEntity.getIdKendaraan());
        kendaraanDTO.setStatusKetersediaan(statusKetersediaan != null ? statusKetersediaan.isStatusKetersediaan() : false);
        return kendaraanDTO;
    }

    private KendaraanDTO convertToKendaraanDTO(KendaraanLogEntity kendaraanLogEntity) {
        KendaraanDTO kendaraanDTO = new KendaraanDTO();
        kendaraanDTO.setIdKendaraan(Long.valueOf(kendaraanLogEntity.getIdKendaraan()));
        kendaraanDTO.setVersion(kendaraanLogEntity.getVersion());
        kendaraanDTO.setMerkKendaraan(kendaraanLogEntity.getMerkKendaraan());
        kendaraanDTO.setTipeKendaraan(kendaraanLogEntity.getTipeKendaraan());
        kendaraanDTO.setJenisKendaraan(kendaraanLogEntity.getJenisKendaraan());
        kendaraanDTO.setTahunKeluaran(kendaraanLogEntity.getTahunKeluaran());
        kendaraanDTO.setKapasitasKursi(kendaraanLogEntity.getKapasitasKursi());
        kendaraanDTO.setHargaSewa(kendaraanLogEntity.getHargaSewa());
        StatusKetersediaanEntity statusKetersediaan = statusKetersediaanRepository.findByIdKendaraan(Long.valueOf(kendaraanLogEntity.getIdKendaraan()));
        kendaraanDTO.setStatusKetersediaan(statusKetersediaan != null ? statusKetersediaan.isStatusKetersediaan() : false);
        kendaraanDTO.setStatusHapus(true);

        return kendaraanDTO;
    }
}


