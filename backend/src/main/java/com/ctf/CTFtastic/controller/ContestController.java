package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.model.PageableOfT;
import com.ctf.CTFtastic.model.entity.Challenge;
import com.ctf.CTFtastic.model.entity.Participant;
import com.ctf.CTFtastic.model.entity.Solution;
import com.ctf.CTFtastic.model.entity.Team;
import com.ctf.CTFtastic.model.projection.*;
import com.ctf.CTFtastic.model.request.StartChallengeRequest;
import com.ctf.CTFtastic.service.ChallengeService;
import com.ctf.CTFtastic.service.ContestService;
import com.ctf.CTFtastic.service.TeamEncoder;
import com.ctf.CTFtastic.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import javax.print.DocFlavor;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@RestController
public class ContestController {
    @Autowired
    private ContestService contestService;

    @Autowired
    private UserService userService;

    @Autowired
    private ChallengeService challengeService;

    @Value("${link.start.team}")
    private String linkStart;
    @Value("${link.stop.team}")
    private String linkStop;

    @Value("${link.senddocker.file}")
    private String linkSendDockerFile;

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

    @PostMapping(value = "/stop-ctf")
    public ResponseEntity<String> stopCTF(Authentication authentication)
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
            boolean flag = false;
            contestService.updateStart(flag);
            return ResponseEntity.ok().body("{}");
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping(value = "/challenges/stop-containers")
    public ResponseEntity<String> stopContestForTeam(Authentication authentication) throws NoSuchAlgorithmException {
        Team team = null;
        //try{
        Optional<Participant> user = userService.findByEmail(authentication.getName());
        if (user.isEmpty() || user.get().getRole().getName().equals("ROLE_USER") ) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        team = user.get().getTeam();
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");

        Map<String, String> elements =  new HashMap<>();
        elements.put("teamName", team.getName());
        String data = "";
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            data = objectMapper.writeValueAsString(elements);
        }catch (Exception ex){}

        try {
            String uri = linkStop;
            ObjectMapper objectMapper = new ObjectMapper();
            HttpEntity<String> entity = new HttpEntity<>(data, headers);
            HttpResponse answer =
                    restTemplate.postForObject(uri, entity, HttpResponse.class);
            //Dodać errory wrazie wyrzuci 400 albo cos innego
            return ResponseEntity.ok().body("{\"stop\":\"stopped\"}");
        }
        catch (Exception ex){
            return ResponseEntity.ok().body("{\"stop\":\"notStopped\"}");
        }
    }

    @GetMapping(value = "/challenges/start-containers")
    public ResponseEntity<String> startContestForTeam(Authentication authentication) throws NoSuchAlgorithmException {
        Team team = null;
        //try{
        Optional<Participant> user = userService.findByEmail(authentication.getName());

        if (user.isEmpty() || user.get().getRole().getName().equals("ROLE_USER")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        team = user.get().getTeam();

        List<Challenge> challanges = challengeService.getAllChallanges(true);
        List<ChallangeToStart> chall = new ArrayList<>();
        int i = 0;
        for (Challenge challange:challanges) {
            if(challange.getDockerfile() != null) {
                i++;
                chall.add(ChallangeToStart.builder()
                        .chall(challange.getName())
                        .challNum(i)
                        .containerPort(80)
                        .build());
            }
        }


        RestTemplate restTemplate = new RestTemplate();

        String uri = linkStart; // or any other uri

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");

        //String returnChall = "";
        //try {
        //    ObjectMapper objectMapper = new ObjectMapper();
        //    returnChall = objectMapper.writeValueAsString(chall);
        //}catch (Exception ex){}

        Map<String, Object> elements =  new HashMap<>();
        elements.put("teamName", team.getName());
        elements.put("teamHash", TeamEncoder.getSHA(team.getName()));
        elements.put("challenges", chall);

        String returnData = "";
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            returnData = objectMapper.writeValueAsString(elements);
        }catch (Exception ex){}
        System.out.println(returnData);

        StartChallengeRequest str = StartChallengeRequest.builder()
                .teamName("TEST")
                .build();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            HttpEntity<String> entity = new HttpEntity<>(returnData, headers);
            HttpResponse answer =
                    restTemplate.postForObject(uri, entity, HttpResponse.class);
            //Dodać errory wrazie wyrzuci 400 albo cos innego
            return ResponseEntity.ok().body("{\"containerState\":\"started\"}");
        }
        catch (Exception ex){
            return ResponseEntity.ok().body("{\"containerState\":\"notStarted\"}");
        }
    }

    @PutMapping(value = "/challenges/{id}/build")
    public ResponseEntity<String> challangeBuild(@PathVariable("id") int id,Authentication authentication)
    {
        try{
            Optional<Participant> user = userService.findByEmail(authentication.getName());

            if (user.isEmpty() || !user.get().getRole().getName().equals("ROLE_CTF_ADMIN")) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        RestTemplate restTemplate = new RestTemplate();
        String uri = "";
        HttpEntity<String> entity = null;
        try {
            Challenge challenge = challengeService.getChallange(id);
            Map<String, String> elements =  new HashMap<>();
            elements.put("outputImage", challenge.getName());
            elements.put("dockerfile", Base64.getEncoder().encodeToString(challenge.getDockerfile()));
            ObjectMapper objectMapper = new ObjectMapper();
            String returnData = objectMapper.writeValueAsString(elements);

            uri = linkSendDockerFile; // or any other uri

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
            entity = new HttpEntity<>(returnData, headers);
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        try{
            challengeService.updateBuild("started", id);
            String answer =
                    restTemplate.postForObject(uri, entity, String.class);


            return ResponseEntity.ok().body("{\"dockerfileBuildState\":\"started\"}");

        }catch (Exception ex){
            challengeService.updateBuild("notStarted", id);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"dockerfileBuildState\":\"notStarted\"}");
        }
    }

    @GetMapping(value = "/challenges/{id}/build-state")
    public ResponseEntity<String> getBuildState(@PathVariable("id") int id,Authentication authentication)
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

            //200
            //201
            //202

            challengeService.updateBuild("done", id);

            Challenge challenge = challengeService.getChallange(id);
            Map<String, String> elements =  new HashMap<>();
            elements.put("dockerfileBuildState", challenge.getDockerfileBuildState());
            ObjectMapper objectMapper = new ObjectMapper();
            String returnData = objectMapper.writeValueAsString(elements);

            return ResponseEntity.ok().body(returnData);
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}

