package com.ctf.CTFtastic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController

public class CTFtasticApplication {
	@RequestMapping("/")
	@PreAuthorize("hasAnyRole('ROLE_TEAM_CAPITAN')")
	public String home() {
		return "TEST";
	}

	@RequestMapping("/test1")
	@PreAuthorize("hasAnyRole('ROLE_CTF_ADMIN')")
	public String test1() {
		return "test1";
	}

	@RequestMapping("/test2")
	@PreAuthorize("hasAnyRole('USER')")
	public String test2() {
		return "test2";
	}

	public static void main(String[] args) {
		SpringApplication.run(CTFtasticApplication.class, args);

	}

}

