package com.ctf.CTFtastic.controller;
import com.ctf.CTFtastic.model.PageableOfT;
import com.ctf.CTFtastic.model.entity.Contest;
import com.ctf.CTFtastic.model.projection.ContestForListVM;
import com.ctf.CTFtastic.model.projection.TeamDetailsVM;
import com.ctf.CTFtastic.model.projection.TeamForListVM;
import com.ctf.CTFtastic.service.ContestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ContestController {
    @Autowired
    private ContestService contestService;

    @RequestMapping(value = {"/contests",})
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
}

