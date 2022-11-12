package com.ctf.CTFtastic;

import com.ctf.CTFtastic.model.request.StartChallengeRequest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController

public class CTFtasticApplication {
	@RequestMapping("/team_capitan")
	@PreAuthorize("hasAnyRole('ROLE_TEAM_CAPITAN')")
	public String home() {
		return "ROLE_TEAM_CAPITAN";
	}

	@RequestMapping("/ctfadmin")
	@PreAuthorize("hasAnyRole('ROLE_CTF_ADMIN')")
	public String test1() {
		return "ROLE_CTF_ADMIN";
	}

	@RequestMapping("/user")
	@PreAuthorize("hasAnyRole('USER')")
	public String test2() {
		return "USER";
	}

	@RequestMapping("/nouser")
	public ResponseEntity<String> test3(@RequestBody StartChallengeRequest str) {
		System.out.println("DZIALA +" + str.getTeamName());
		return ResponseEntity.ok("nouser");
	}

	public static void main(String[] args) {
		SpringApplication.run(CTFtasticApplication.class, args);

	}

}

