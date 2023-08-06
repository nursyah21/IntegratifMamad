package com.transaksi.Akbar.service.implement;

import com.transaksi.Akbar.DTO.KendaraanResponse;
import com.transaksi.Akbar.DTO.PegawaiResponse;
import com.transaksi.Akbar.DTO.PenyewaResponse;
import com.transaksi.Akbar.DTO.TransaksiDTO;
import com.transaksi.Akbar.DTO.PengembalianDTO;
import com.transaksi.Akbar.entity.TransaksiEntity;
import com.transaksi.Akbar.entity.PengembalianEntity;
import com.transaksi.Akbar.repository.TransaksiRepository;
import com.transaksi.Akbar.repository.PengembalianRepository;
import com.transaksi.Akbar.service.TransaksiService;
// import com.transaksi.Akbar.config.ApplicationConfig;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class TransaksiServiceImpl implements TransaksiService {
    private final TransaksiRepository transaksiRepository;
    private final PengembalianRepository pengembalianRepository;
    private final RestTemplate restTemplate;

    // informasi API yang digunakan (ubahlah sesuai kebutuhan) <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    private static String server = "localhost";
    // private static String serverPegawai = "localhost";
    // private static String serverPenyewa = "localhost";
    // private static String serverPegawai = "localhost";
    private static String yuridan = "localhost:9001";
    
    // private static String yuridan = "yuridan.serveo.net";
    
    private static String portKendaraan = "9001";
    private static String portPenyewa = "9001";
    private static String portPegawai = "6969";

    private static final Logger LOGGER = LoggerFactory.getLogger(TransaksiServiceImpl.class);

    // informasi API yang digunakan (ubahlah sesuai kebutuhan) <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    @Autowired
    public TransaksiServiceImpl(TransaksiRepository transaksiRepository, PengembalianRepository pengembalianRepository, RestTemplate restTemplate) {
        this.transaksiRepository = transaksiRepository;
        this.pengembalianRepository = pengembalianRepository;
        this.restTemplate = restTemplate;
    }
    final Logger logger = LoggerFactory.getLogger(TransaksiServiceImpl.class);

    @Override
    public void createTransaksi(TransaksiDTO transaksiDTO) {

        try{
            Integer idKendaraan = transaksiDTO.getIdKendaraan();

            logger.info("step 1");
            // Buat URL dengan parameter idKendaraan
            // String url = "http://"+server+":"+portKendaraan+"/kendaraan/find/id:" + idKendaraan;
            String url = "http://"+yuridan+"/kendaraan/find/id:" + idKendaraan;

            // Set header Content-Type: application/json
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            UriComponentsBuilder builder = null;
            ResponseEntity<KendaraanResponse> responseEntity = null;

            try{
                // Buat URI dengan URL dan parameter
                builder = UriComponentsBuilder.fromUriString(url);

                // Buat request dengan method GET dan header
                responseEntity = restTemplate.exchange(
                        builder.build().encode().toUri(),
                        HttpMethod.GET,
                        new HttpEntity<>(headers),
                        KendaraanResponse.class
                );
            }catch (Exception e){
                logger.info(e.getMessage());
            }


            logger.info("step 1.1");

            // Dapatkan response body
            KendaraanResponse response = responseEntity.getBody();

            // Misalkan response mengandung versiKendaraan dan hargaSewa
            Integer versiKendaraan = response.getVersion();
            Integer hargaSewa = response.getHargaSewa();

            logger.info("step 1.2");

            // Hitung totalHargaSewa
            Date tanggalSewa = transaksiDTO.getTanggalSewa();
            Date tanggalKembali = transaksiDTO.getTanggalKembali();

            logger.info("step 1.3");

            long millisecondsPerDay = 24 * 60 * 60 * 1000; // Jumlah milidetik dalam sehari

            long selisihHari = (tanggalKembali.getTime() - tanggalSewa.getTime()) / millisecondsPerDay;
            int totalHarga = hargaSewa * ((int) selisihHari + 1);

            logger.info("step 2");

            // Buat objek TransaksiEntity
            TransaksiEntity transaksiEntity = new TransaksiEntity();
            try {
                transaksiEntity.setIdKendaraan(idKendaraan);
                transaksiEntity.setVersiKendaraan(versiKendaraan);
                transaksiEntity.setHargaSewa(hargaSewa);
                transaksiEntity.setTotalHargaSewa(totalHarga);
                transaksiEntity.setTanggalSewa(tanggalSewa);
                transaksiEntity.setTanggalKembali(tanggalKembali);
                transaksiEntity.setIdPenyewa(transaksiDTO.getIdPenyewa());
                transaksiEntity.setIdPegawai(transaksiDTO.getIdPegawai());
                logger.info(String.format("%d %d %d %d %s %s %d %d", idKendaraan, versiKendaraan, hargaSewa, totalHarga,
                        tanggalSewa, tanggalKembali, transaksiDTO.getIdPenyewa(), transaksiDTO.getIdPegawai()));
                // Simpan transaksi
                transaksiRepository.save(transaksiEntity);
            }catch (Exception e){
               throw e;
            }


            logger.info("step 3");

            String statusKetersediaan = "false";
            String ubahStatusKendaraanUrl = "http://"+yuridan+"/kendaraan/status/" + idKendaraan + "/" + statusKetersediaan;

            restTemplate.put(ubahStatusKendaraanUrl, null);

            // Buat objek PengembalianEntity
            PengembalianEntity pengembalianEntity = new PengembalianEntity();
            pengembalianEntity.setTransaksi(transaksiEntity);
            pengembalianEntity.setStatusSewa("sedang_proses"); // Status awal transaki
            pengembalianEntity.setNotePengembalian("tidak ada catatan"); // Default note pengembalian
            pengembalianEntity.setTambahanHari(0); // Default tambahan hari
            pengembalianEntity.setTotalBayar(0); // Default total bayar (bisa diubah sesuai kebutuhan)

            // Simpan pengembalian
            pengembalianRepository.save(pengembalianEntity);

            logger.info("finish");
        }catch (Exception e){
            logger.info(e.getMessage());
        }
    }

    @Override
    public void editPengembalian(Long idTransaksi, String newNotePengembalian, Integer newTambahanHari) {
        // Temukan entitas PengembalianEntity berdasarkan idTransaksi
        Optional<PengembalianEntity> pengembalianOptional = pengembalianRepository.findByTransaksiIdTransaksi(idTransaksi);

        if (pengembalianOptional.isPresent()) {
            PengembalianEntity pengembalianEntity = pengembalianOptional.get();

            // Ubah notePengembalian dan tambahanHari pada pengembalianEntity
            pengembalianEntity.setNotePengembalian(newNotePengembalian);
            pengembalianEntity.setTambahanHari(newTambahanHari);

            // Hitung totalBayar berdasarkan hargaSewa dan tambahanHari
            TransaksiEntity transaksiEntity = pengembalianEntity.getTransaksi();
            Integer hargaSewa = transaksiEntity.getHargaSewa();

            Date tanggalSewa = transaksiEntity.getTanggalSewa();
            Date tanggalKembali = transaksiEntity.getTanggalKembali();

            long millisecondsPerDay = 24 * 60 * 60 * 1000; // Jumlah milidetik dalam sehari
            long selisihHari = (tanggalKembali.getTime() - tanggalSewa.getTime()) / millisecondsPerDay;
            int totalHarga = hargaSewa * ((int) selisihHari + 1);

            // Hitung totalBayar dengan menambahkan hargaSewa per hari tambahanHari
            int totalBayar = totalHarga + (hargaSewa * newTambahanHari);

            // Set totalBayar pada pengembalianEntity
            pengembalianEntity.setTotalBayar(totalBayar);

            // Simpan perubahan pada pengembalianEntity
            pengembalianRepository.save(pengembalianEntity);
        } else {
            throw new EntityNotFoundException("idTransaksi " + idTransaksi + " tidak ditemukan.");
        }
    }
//    private static  final Logger logger = LoggerFactory.getLogger(TransaksiServiceImpl.class);
    @Override
    public void editStatusSewa(Long idTransaksi, String newStatusSewa) {
        Optional<TransaksiEntity> transaksiOptional = transaksiRepository.findById(idTransaksi);
        if (transaksiOptional.isPresent()) {
            TransaksiEntity transaksiEntity = transaksiOptional.get();

            // Mendapatkan data pengembalian (jika ada)
            Optional<PengembalianEntity> pengembalianOptional = pengembalianRepository.findByTransaksiIdTransaksi(idTransaksi);
            if (pengembalianOptional.isPresent()) {
                PengembalianEntity pengembalianEntity = pengembalianOptional.get();
                String currentStatusSewa = pengembalianEntity.getStatusSewa();

                logger.info("transkasi impl-> " + newStatusSewa);
                logger.info("transkasi impl-> " + currentStatusSewa);
                if (currentStatusSewa == null || !currentStatusSewa.equals(newStatusSewa)) {
                    // Ubah statusSewa pada pengembalianEntity
                    pengembalianEntity.setStatusSewa(newStatusSewa);

                    // Simpan perubahan pada pengembalianEntity
                    pengembalianRepository.save(pengembalianEntity);

                    // Jika statusSewa berubah menjadi "selesai", ubah statusKendaraan menjadi true
                    if ("selesai".equals(newStatusSewa)) {
                        Integer idKendaraan = transaksiEntity.getIdKendaraan();
                        String ubahStatusKendaraanUrl = String.format("http://" + yuridan + "/kendaraan/status/id:" + idKendaraan + "/st:true");

                        restTemplate.put(ubahStatusKendaraanUrl, null);
                        // Anda juga dapat menangani respon dari permintaan PUT jika diperlukan
                    }
                }
            }
        }
    }

    @Override
    public List<TransaksiDTO> findAllTransaksi() {
        List<TransaksiEntity> transaksiEntities = null;
        List<TransaksiDTO> result = null;
        try{
            transaksiEntities = transaksiRepository.findAll();
            result = mapToTransaksiDTOWithDetails(transaksiEntities);
        }catch (Exception e){
            logger.info(e.getMessage());
        }
        return result;
    }

    @Override
    public TransaksiDTO findTransaksiById(Long idTransaksi) {
        Optional<TransaksiEntity> transaksiOptional = transaksiRepository.findById(idTransaksi);
        if (transaksiOptional.isPresent()) {
            TransaksiEntity transaksiEntity = transaksiOptional.get();
            TransaksiDTO transaksiDTO = mapToTransaksiDTO(transaksiEntity);

            // Cek apakah ada PengembalianEntity untuk transaksi ini
            Optional<PengembalianEntity> pengembalianOptional = pengembalianRepository.findByTransaksiIdTransaksi(idTransaksi);
            if (pengembalianOptional.isPresent()) {
                PengembalianEntity pengembalianEntity = pengembalianOptional.get();
                PengembalianDTO pengembalianDTO = new PengembalianDTO();
                pengembalianDTO.setIdPengembalian(pengembalianEntity.getIdPengembalian());
                pengembalianDTO.setStatusSewa(pengembalianEntity.getStatusSewa());
                pengembalianDTO.setNotePengembalian(pengembalianEntity.getNotePengembalian());
                pengembalianDTO.setTambahanHari(pengembalianEntity.getTambahanHari());
                pengembalianDTO.setTotalBayar(pengembalianEntity.getTotalBayar());

                transaksiDTO.setPengembalian(pengembalianDTO);
            }

            return transaksiDTO;
        }
        return null;
    }

    private List<TransaksiDTO> mapToTransaksiDTOWithDetails(List<TransaksiEntity> transaksiEntities) {
        try {
            return transaksiEntities.stream()
                    .map(transaksiEntity -> {
                        TransaksiDTO transaksiDTO = mapToTransaksiDTO(transaksiEntity);
                        return transaksiDTO;
                    })
                    .collect(Collectors.toList());
        }catch (Exception e){
            logger.info(e.getMessage());
            return null;
        }

    }

    private TransaksiDTO mapToTransaksiDTO(TransaksiEntity transaksiEntity) {
        TransaksiDTO transaksiDTO = new TransaksiDTO();

        try{
            transaksiDTO.setIdTransaksi(transaksiEntity.getIdTransaksi());
            transaksiDTO.setVersiKendaraan(transaksiEntity.getVersiKendaraan());
            transaksiDTO.setTanggalSewa(transaksiEntity.getTanggalSewa());
            transaksiDTO.setTanggalKembali(transaksiEntity.getTanggalKembali());
            transaksiDTO.setHargaSewa(transaksiEntity.getHargaSewa());
            transaksiDTO.setTotalHargaSewa(transaksiEntity.getTotalHargaSewa());
            logger.info("step 1");
            // Mendapatkan data kendaraan
            Integer idKendaraan = transaksiEntity.getIdKendaraan();

            Integer versiKendaraan = transaksiEntity.getVersiKendaraan();
            KendaraanResponse kendaraanResponse = getKendaraanDetails(idKendaraan, versiKendaraan);
            transaksiDTO.setKendaraan(kendaraanResponse);
            transaksiDTO.setIdKendaraan(transaksiEntity.getIdKendaraan());

            // Mendapatkan data penyewa
            Integer idPenyewa = transaksiEntity.getIdPenyewa();
            PenyewaResponse penyewaResponse = getPenyewaDetails(idPenyewa);
            transaksiDTO.setPenyewa(penyewaResponse);
            transaksiDTO.setIdPenyewa(transaksiEntity.getIdPenyewa());

            logger.info("step 2");

            // Mendapatkan data pegawai
//        Integer idPegawai = transaksiEntity.getIdPegawai();
//        PegawaiResponse pegawaiResponse = getPegawaiDetails(idPegawai);
//        transaksiDTO.setPegawai(pegawaiResponse);
            transaksiDTO.setIdPegawai(transaksiEntity.getIdPegawai());

            Optional<PengembalianEntity> pengembalianOptional = pengembalianRepository.findByTransaksiIdTransaksi(transaksiEntity.getIdTransaksi());
            if (pengembalianOptional.isPresent()) {
                PengembalianEntity pengembalianEntity = pengembalianOptional.get();
                PengembalianDTO pengembalianDTO = new PengembalianDTO();
                pengembalianDTO.setIdPengembalian(pengembalianEntity.getIdPengembalian());
                pengembalianDTO.setStatusSewa(pengembalianEntity.getStatusSewa());
                pengembalianDTO.setNotePengembalian(pengembalianEntity.getNotePengembalian());
                pengembalianDTO.setTambahanHari(pengembalianEntity.getTambahanHari());
                pengembalianDTO.setTotalBayar(pengembalianEntity.getTotalBayar());

                transaksiDTO.setPengembalian(pengembalianDTO);
            }
            logger.info("finish");
        }catch (Exception e){
            logger.info(e.getMessage());
        }

        return transaksiDTO;
    }

    private KendaraanResponse getKendaraanDetails(Integer idKendaraan, Integer versiKendaraan) {
        String kendaraanUrl = String.format("http://" + yuridan + "/kendaraan/find-global/id:" + idKendaraan + "/v:" + versiKendaraan);
        KendaraanResponse kendaraanResponse = restTemplate.getForObject(kendaraanUrl, KendaraanResponse.class);
        return kendaraanResponse;
    }

    private PenyewaResponse getPenyewaDetails(Integer idPenyewa) {
        String penyewaUrl = String.format("http://" + yuridan + "/penyewa/find/" + idPenyewa);
        PenyewaResponse penyewaResponse = restTemplate.getForObject(penyewaUrl, PenyewaResponse.class);
        return penyewaResponse;
    }

//    private PegawaiResponse getPegawaiDetails(Integer idPegawai) {
//        String pegawaiUrl = String.format("http://" + server + ":" + portPegawai + "/karyawan/" + idPegawai);
//        PegawaiResponse pegawaiResponse = restTemplate.getForObject(pegawaiUrl, PegawaiResponse.class);
//        return pegawaiResponse;
//    }
}
