package com.quizapp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.quizapp.entity.UserAnswer;

public interface UserAnswerRepo extends JpaRepository<UserAnswer, Long> {
    List<UserAnswer> findBySessionSessionId(Long sessionId);
}