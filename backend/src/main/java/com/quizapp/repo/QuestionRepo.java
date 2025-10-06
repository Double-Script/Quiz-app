package com.quizapp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizapp.entity.Question;

public interface QuestionRepo extends JpaRepository<Question, Integer>{
	 List<Question> findByQuizPid(int pid);
}
