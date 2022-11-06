package com.ctf.CTFtastic.service;

import com.ctf.CTFtastic.model.entity.Submit;
import com.ctf.CTFtastic.repository.SubmitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubmitService {
    @Autowired
    SubmitRepository submitRepository;

    public void Add(Submit submit){
        submitRepository.save(submit);
    }
}
