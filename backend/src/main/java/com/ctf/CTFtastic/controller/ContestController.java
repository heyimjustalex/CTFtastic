package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.model.PageableOfT;
import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.model.entity.Team;
import com.ctf.CTFtastic.model.projection.ContestForListVM;
import com.ctf.CTFtastic.model.request.StartChallengeRequest;
import com.ctf.CTFtastic.service.ContestService;
import com.ctf.CTFtastic.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import javax.print.DocFlavor;
import java.util.*;

@RestController
public class ContestController {
    @Autowired
    private ContestService contestService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/contests", method = RequestMethod.GET)
    public PageableOfT<ContestForListVM> getAll() {
        Pageable pageable = PageRequest.of(0,100);
        Page<ContestForListVM> pagesContest = contestService.getAllForListView(pageable);

        List<ContestForListVM> contests = pagesContest.getContent();

        PageableOfT<ContestForListVM> contestToView = PageableOfT.<ContestForListVM>builder()
                .elements(contests)
                .currentPage(pagesContest.getNumber())
                .totalElements(pagesContest.getTotalElements())
                .totalPages(pagesContest.getTotalPages())
                .build();

        return contestToView;
    }


    @PostMapping(value = "/start-ctf")
    public ResponseEntity<String> startCTF(Authentication authentication)
    {
        try{
            Optional<Participant> user = userService.findByEmail(authentication.getName());

            if (user.isEmpty() || !user.get().getRole().getName().equals("ROLE_CTF_ADMIN")) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        try {
            boolean flag = true;
            contestService.updateStart(flag);
            return ResponseEntity.ok().body("{}");
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/contests/strat")
    public String startContestForTeam(Authentication authentication)
    {
        Team team = null;
        System.out.println("Test");
        //try{
            Optional<Participant> user = userService.findByEmail(authentication.getName());

            if (user.isEmpty() || !user.get().getRole().getName().equals("ROLE_TEAM_CAPITAN")) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
            team = user.get().getTeam();

            RestTemplate restTemplate = new RestTemplate();

            String uri = "http://localhost:8080/nouser"; // or any other uri

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");

            Map<String, String> elements =  new HashMap<>();
            elements.put("teamName", "test");
            String returnData = "";
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                returnData = objectMapper.writeValueAsString(elements);
            }catch (Exception ex){}
            System.out.println(returnData);

            StartChallengeRequest str = StartChallengeRequest.builder()
                    .teamName("TEST")
                    .build();

            ObjectMapper objectMapper = new ObjectMapper();
            HttpEntity<String> entity = new HttpEntity<>(returnData, headers);
            String answer =
                    restTemplate.postForObject(uri, entity, String.class);

            return "";

        //}catch (Exception ex){
        //    throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        //}
    }
}

