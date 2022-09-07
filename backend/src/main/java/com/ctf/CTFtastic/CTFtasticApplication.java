package com.ctf.CTFtastic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController

public class CTFtasticApplication {
	@RequestMapping("/")
	public String home() {
		return "TEST";
	}

	public static void main(String[] args) {
		SpringApplication.run(CTFtasticApplication.class, args);
	}

}

