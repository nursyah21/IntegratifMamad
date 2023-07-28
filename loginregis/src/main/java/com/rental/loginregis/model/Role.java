package com.rental.loginregis.model;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "roles")
public class Role {
    // getters and setters are not shown for brevity   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
     
    @Column(nullable = false, length = 50, unique = true)
    private String name;
 
    public Role() { }
     
    public Role(String name) {
        this.name = name;
    }
     
    public Role(Integer id) {
        this.id = id;
    }
 

    @Override
    public String toString() {
        return this.name;
    }

    public void setId(Integer id){
        this.id = id;
    }
    public void setName(String name){
        this.name = name;
    }
}