package com.rental.loginregis.model;

public class MyRole {
    private String roles;

    public MyRole(){}

    public MyRole(String roles) {
        this.roles = roles;
    }

    public String getRole(){
        return roles;
    }

    public void setRole(String roles) {
        this.roles = roles;
    }
}