package com.rental.loginregis.model;

import jakarta.validation.constraints.NotNull;

public class LoginInfo {
    @NotNull
    private String username;

    @NotNull
    private String password;

    public LoginInfo(){

    }

    public LoginInfo(String username, String password){
        this.username = username;
        this.password = password;
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
}

