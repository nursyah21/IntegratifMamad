package com.rental.loginregis.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rental.loginregis.dto.KaryawanDTO;
import com.rental.loginregis.model.KaryawanEntity;
import com.rental.loginregis.repository.KaryawanRepository;
import com.rental.loginregis.model.UserInfo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.HashSet;

@Service
@Transactional
public class KaryawanServiceImpl implements KaryawanService{

    @Autowired
    KaryawanRepository karyawanRepository;

    private JdbcTemplate jdbcTemplate;

    public KaryawanServiceImpl(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

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
            result.setNikKaryawan(karyawanEntity.getNikKaryawan());
            result.setTelpKaryawan(karyawanEntity.getTelpKaryawan());
            result.setAlamatKaryawan(karyawanEntity.getAlamatKaryawan());
            result.setRoleKaryawan(karyawanEntity.getRoleKaryawan());
            return karyawanRepository.save(result);
        }
        return null;
    }

    @Override
    public Boolean delete(Long id) {
        final KaryawanEntity result = finbById(id);
        if (result != null) {
            // karyawanRepository.deleteById(id);
            // delete by manual because cascade not work, maybe sometimes will fix it
            String sql1 = "DELETE FROM users_roles ur WHERE ur.user_id = ?";
            String sql2 = "DELETE FROM role r WHERE r.id = ?";
            String sql3 = "DELETE FROM karyawan k WHERE k.id = ?";

            // Execute the query
            jdbcTemplate.update(sql1, id);
            jdbcTemplate.update(sql2, id);
            jdbcTemplate.update(sql3, id);

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