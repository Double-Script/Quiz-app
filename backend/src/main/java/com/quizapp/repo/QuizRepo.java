package com.quizapp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizapp.entity.Quiz;

public interface QuizRepo extends JpaRepository<Quiz, Integer>{
	 List<Quiz> findBypid(int pid);
}
