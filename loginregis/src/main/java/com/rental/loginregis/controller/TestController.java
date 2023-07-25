package com.rental.loginregis.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/test")
public class TestController {
@GetMapping
    public String Test(){
        return "allowed" ;
    }

}
