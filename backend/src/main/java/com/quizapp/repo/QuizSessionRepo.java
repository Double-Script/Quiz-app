package com.quizapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.quizapp.entity.QuizSession;

public interface QuizSessionRepo extends JpaRepository<QuizSession, Long> {
    
}