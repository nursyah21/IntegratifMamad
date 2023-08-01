package com.transaksi.Akbar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class AkbarApplication {

	public static void main(String[] args) {
		SpringApplication.run(AkbarApplication.class, args);
	}

}
