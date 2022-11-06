package com.ctf.CTFtastic.service;

import com.ctf.CTFtastic.model.entity.Solution;
import com.ctf.CTFtastic.model.entity.Team;
import com.ctf.CTFtastic.repository.SolutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolutionService {
    @Autowired
    private SolutionRepository solutionRepository;

    public void AddNewSolutionByTeam(List<Solution> solutions)
    {
        solutionRepository.saveAll(solutions);
    }

    public void deleteAllSolutionTeam(int id) {
        solutionRepository.deleteByTeamId(id);
    }

    public Solution findByTeamAndId(int id, int team) {
        return solutionRepository.findByTeamAndId(id,team);
    }
}
