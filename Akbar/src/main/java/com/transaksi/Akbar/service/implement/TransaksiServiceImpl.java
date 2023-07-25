package com.transaksi.Akbar.service.implement;

import com.transaksi.Akbar.DTO.KendaraanResponse;
import com.transaksi.Akbar.DTO.PegawaiResponse;
import com.transaksi.Akbar.DTO.PenyewaResponse;
import com.transaksi.Akbar.DTO.TransaksiDTO;
import com.transaksi.Akbar.entity.TransaksiEntity;
import com.transaksi.Akbar.repository.TransaksiRepository;
import com.transaksi.Akbar.service.TransaksiService;
// import com.transaksi.Akbar.config.ApplicationConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class TransaksiServiceImpl implements TransaksiService {
    private final TransaksiRepository transaksiRepository;
    private final RestTemplate restTemplate;

    // informasi API yang digunakan (ubahlah sesuai kebutuhan) <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    private static String server = "abbr";
    private static String portKendaraan = "9001";
    private static String portPenyewa = "9001";
    private static String portPegawai = "7776";

    // informasi API yang digunakan (ubahlah sesuai kebutuhan) <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    @Autowired
    public TransaksiServiceImpl(TransaksiRepository transaksiRepository, RestTemplate restTemplate) {
        this.transaksiRepository = transaksiRepository;
        this.restTemplate = restTemplate;
    }

    @Override
    public void createTransaksi(TransaksiDTO transaksiDTO) {
        Integer idKendaraan = transaksiDTO.getIdKendaraan();

        // Buat URL dengan parameter idKendaraan
        String url = "http://"+server+":"+portKendaraan+"/kendaraan/find/id:" + idKendaraan;

        // Set header Content-Type: application/json
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Buat URI dengan URL dan parameter
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url);

        // Buat request dengan method GET dan header
        ResponseEntity<KendaraanResponse> responseEntity = restTemplate.exchange(
                builder.build().encode().toUri(),
                HttpMethod.GET,
                new HttpEntity<>(headers),
                KendaraanResponse.class
        );

        // Dapatkan response body
        KendaraanResponse response = responseEntity.getBody();

        // Misalkan response mengandung versiKendaraan dan hargaSewa
        Integer versiKendaraan = response.getVersion();
        Integer hargaSewa = response.getHargaSewa();

        // Hitung totalHargaSewa
        Date tanggalSewa = transaksiDTO.getTanggalSewa();
        Date tanggalKembali = transaksiDTO.getTanggalKembali();

        long millisecondsPerDay = 24 * 60 * 60 * 1000; // Jumlah milidetik dalam sehari

        long selisihHari = (tanggalKembali.getTime() - tanggalSewa.getTime()) / millisecondsPerDay;
        int totalHarga = hargaSewa * ((int) selisihHari + 1);


        // Buat objek TransaksiEntity
        TransaksiEntity transaksiEntity = new TransaksiEntity();
        transaksiEntity.setIdKendaraan(idKendaraan);
        transaksiEntity.setVersiKendaraan(versiKendaraan);
        transaksiEntity.setHargaSewa(hargaSewa);
        transaksiEntity.setTotalHargaSewa(totalHarga);
        transaksiEntity.setTanggalSewa(tanggalSewa);
        transaksiEntity.setTanggalKembali(tanggalKembali);
        transaksiEntity.setIdPenyewa(transaksiDTO.getIdPenyewa());
        transaksiEntity.setIdPegawai(transaksiDTO.getIdPegawai());

        // Simpan transaksi
        transaksiRepository.save(transaksiEntity);

        // Ubah status ketersediaan kendaraan
        String statusKetersediaan = "false";
        String ubahStatusKendaraanUrl = "http://"+server+":"+portKendaraan+"/kendaraan/status/" + idKendaraan + "/" + statusKetersediaan;

        restTemplate.put(ubahStatusKendaraanUrl, null);
        // Cek status respons jika diperlukan
    }

    @Override
    public List<TransaksiDTO> findAllTransaksi() {
        List<TransaksiEntity> transaksiEntities = transaksiRepository.findAll();
        return mapToTransaksiDTOWithDetails(transaksiEntities);
    }

    @Override
    public TransaksiDTO findTransaksiById(Long idTransaksi) {
        Optional<TransaksiEntity> transaksiOptional = transaksiRepository.findById(idTransaksi);
        if (transaksiOptional.isPresent()) {
            TransaksiEntity transaksiEntity = transaksiOptional.get();
            TransaksiDTO transaksiDTO = mapToTransaksiDTO(transaksiEntity);
            return transaksiDTO;
        }
        return null;
    }

    private List<TransaksiDTO> mapToTransaksiDTOWithDetails(List<TransaksiEntity> transaksiEntities) {
        return transaksiEntities.stream()
                .map(transaksiEntity -> {
                    TransaksiDTO transaksiDTO = mapToTransaksiDTO(transaksiEntity);
//                    transaksiDTO.setKendaraan(getKendaraanDetails(transaksiEntity.getIdKendaraan(), transaksiEntity.getVersiKendaraan()));
//                    transaksiDTO.setPenyewa(getPenyewaDetails(transaksiEntity.getIdPenyewa()));
//                    transaksiDTO.setPegawai(getPegawaiDetails(transaksiEntity.getIdPegawai()));
                    return transaksiDTO;
                })
                .collect(Collectors.toList());
    }

    private TransaksiDTO mapToTransaksiDTO(TransaksiEntity transaksiEntity) {
        TransaksiDTO transaksiDTO = new TransaksiDTO();
        transaksiDTO.setIdTransaksi(transaksiEntity.getIdTransaksi());
        transaksiDTO.setVersiKendaraan(transaksiEntity.getVersiKendaraan());
        transaksiDTO.setTanggalSewa(transaksiEntity.getTanggalSewa());
        transaksiDTO.setTanggalKembali(transaksiEntity.getTanggalKembali());
        transaksiDTO.setHargaSewa(transaksiEntity.getHargaSewa());
        transaksiDTO.setTotalHargaSewa(transaksiEntity.getTotalHargaSewa());

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

        // Mendapatkan data pegawai
        Integer idPegawai = transaksiEntity.getIdPegawai();
        PegawaiResponse pegawaiResponse = getPegawaiDetails(idPegawai);
        transaksiDTO.setPegawai(pegawaiResponse);
        transaksiDTO.setIdPegawai(transaksiEntity.getIdPegawai());

        return transaksiDTO;
    }

    private KendaraanResponse getKendaraanDetails(Integer idKendaraan, Integer versiKendaraan) {
        String kendaraanUrl = String.format("http://" + server + ":" + portKendaraan + "/kendaraan/find-global/id:" + idKendaraan + "/v:" + versiKendaraan);
        KendaraanResponse kendaraanResponse = restTemplate.getForObject(kendaraanUrl, KendaraanResponse.class);
        return kendaraanResponse;
    }

    private PenyewaResponse getPenyewaDetails(Integer idPenyewa) {
        String penyewaUrl = String.format("http://" + server + ":" + portPenyewa + "/penyewa/find/" + idPenyewa);
        PenyewaResponse penyewaResponse = restTemplate.getForObject(penyewaUrl, PenyewaResponse.class);
        return penyewaResponse;
    }

    private PegawaiResponse getPegawaiDetails(Integer idPegawai) {
        String pegawaiUrl = String.format("http://" + server + ":" + portPegawai + "/karyawan/" + idPegawai);
        PegawaiResponse pegawaiResponse = restTemplate.getForObject(pegawaiUrl, PegawaiResponse.class);
        return pegawaiResponse;
    }
}
