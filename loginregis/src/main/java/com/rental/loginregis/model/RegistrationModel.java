package com.rental.loginregis.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public class RegistrationModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false, length = 16, unique = true)
    @NotNull
    @Length(min = 5, max = 16)
    private String username;

    @Column(nullable = false, length = 16)
    @NotNull
    @Length(min = 8, max = 16)
    private String password;

    @Column(length = 50)
    @Length(max = 50)
    private String namaKaryawan;

    @Column(length = 50)
    @Length(max = 50)
    private String nikKaryawan;

    @Column(length = 50)
    @Length(max = 50)
    private String telpKaryawan;

    @Column(length = 50)
    @Length(max = 50)
    private String alamatKaryawan;

    @Column(length = 50)
    @Length(max = 50)
    private String roleKaryawan;


    public RegistrationModel(){

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNamaKaryawan() {
        return namaKaryawan;
    }

    public void setNamaKaryawan(String namaKaryawan) {
        this.namaKaryawan = namaKaryawan;
    }

    public String getNikKaryawan() {
        return nikKaryawan;
    }

    public void setNikKaryawan(String nikKaryawan) {
        this.nikKaryawan = nikKaryawan;
    }

    public String getTelpKaryawan() {
        return telpKaryawan;
    }

    public void setTelpKaryawan(String telpKaryawan) {
        this.telpKaryawan = telpKaryawan;
    }

    public String getAlamatKaryawan() {
        return alamatKaryawan;
    }

    public void setAlamatKaryawan(String alamatKaryawan) {
        this.alamatKaryawan = alamatKaryawan;
    }

    public String getRoleKaryawan() {
        return roleKaryawan;
    }

    public void setRoleKaryawan(String roleKaryawan) {
        this.roleKaryawan = roleKaryawan;
    }
}
