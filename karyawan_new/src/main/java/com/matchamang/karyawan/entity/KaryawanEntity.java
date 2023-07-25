package com.matchamang.karyawan.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Table( name = "karyawan",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
        })
public class KaryawanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String namaKaryawan;
    private String nikKaryawan;
    private String telpKaryawan;
    private String alamatKaryawan;
    private String roleKaryawan;
}