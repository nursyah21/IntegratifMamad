package com.rental.loginregis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class LoginregisApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoginregisApplication.class, args);
	}

}
