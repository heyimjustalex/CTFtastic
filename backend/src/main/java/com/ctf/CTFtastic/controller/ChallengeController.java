package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.model.PageableOfT;
import com.ctf.CTFtastic.model.projection.ChallengeDetailsVM;
import com.ctf.CTFtastic.model.projection.ChallengeForListVM;
import com.ctf.CTFtastic.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class ChallengeController {
    @Autowired
    private ChallengeService challengeService;

    @RequestMapping(value = {"/challenges/{page}/{size}"})
    public PageableOfT<ChallengeForListVM> getAll(@PathVariable("page") int page, @PathVariable("size") int size) {
        Pageable pageable = PageRequest.of(page,size);
        Page<ChallengeForListVM> pageChallenges = challengeService.getAllForListView(pageable);

        List<ChallengeForListVM> challanges = pageChallenges.getContent();

        PageableOfT<ChallengeForListVM> challangeToView = PageableOfT.<ChallengeForListVM>builder()
                .elements(challanges)
                .currentPage(pageChallenges.getNumber())
                .totalElements(pageChallenges.getTotalElements())
                .totalPages(pageChallenges.getTotalPages())
                .build();

        return challangeToView;
    }

    @RequestMapping(value = {"challenges/{id}"})
    public ChallengeDetailsVM getById(@PathVariable("id") int id){
        return challengeService.getById(id);
    }
}
