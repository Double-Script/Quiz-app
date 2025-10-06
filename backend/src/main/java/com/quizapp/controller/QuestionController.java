package com.quizapp.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizapp.dto.QuizSubmissionDTO;
import com.quizapp.entity.Question;
import com.quizapp.entity.Quiz;
import com.quizapp.entity.QuizSession;
import com.quizapp.entity.UserAnswer;
import com.quizapp.repo.QuestionRepo;
import com.quizapp.repo.QuizRepo;
import com.quizapp.repo.QuizSessionRepo;
import com.quizapp.repo.UserAnswerRepo;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    QuestionRepo questionRepo;

    @Autowired
    QuizRepo quizRepo;
    
    @Autowired
    QuizSessionRepo quizSessionRepo;

    @Autowired
    UserAnswerRepo userAnswerRepo;

    // temporary memory store for scores: pid -> score
    private Map<Integer, Map<String, Integer>> quizResults = new HashMap<>();

    // ----------------------------------------------------------------------------------------------
    // CREATE (Insert Question)
    @PostMapping("/save/{pid}")
    public String savequestion(@RequestBody Question question, @PathVariable("pid") int pid) {
        Optional<Quiz> opt = quizRepo.findById(pid);
        if (opt.isPresent()) {
            question.setQuiz(opt.get());
            questionRepo.save(question); // this should save correctans
            return "Question saved successfully.";
        }
        return "Quiz not found!";
    }


    // ----------------------------------------------------------------------------------------------
    // READ ALL
    @GetMapping("/read")
    public List<Question> getallquestions() {
        return questionRepo.findAll();
    }

    // ----------------------------------------------------------------------------------------------
    // READ questions by quiz id
    @GetMapping("/quizquestions/{pid}")
    public List<Question> getQuizQuestions(@PathVariable("pid") int pid) {
        return questionRepo.findByQuizPid(pid);
    }

    // ----------------------------------------------------------------------------------------------
    // UPDATE
    @PutMapping("/update/{id}/{pid}")
    public String updateQuestion(@RequestBody Question question,
                                 @PathVariable("id") int id,
                                 @PathVariable("pid") int pid) {
        Optional<Question> qOpt = questionRepo.findById(id);
        Optional<Quiz> quizOpt = quizRepo.findById(pid);

        if (qOpt.isPresent() && quizOpt.isPresent()) {
            Question existing = qOpt.get();
            existing.setQuestion(question.getQuestion());
            existing.setOption1(question.getOption1());
            existing.setOption2(question.getOption2());
            existing.setOption3(question.getOption3());
            existing.setOption4(question.getOption4());
            existing.setCorrectans(question.getCorrectans());
            existing.setQuiz(quizOpt.get());

            questionRepo.save(existing);
            return "Question updated successfully.";
        }
        return "Question or Quiz not found!";
    }

    // ----------------------------------------------------------------------------------------------
    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deletequestion(@PathVariable("id") int id) {
        questionRepo.deleteById(id);
        return "Question deleted successfully.";
    }

    // ----------------------------------------------------------------------------------------------
    // SUBMIT QUIZ
    @PostMapping("/submit/{pid}")
    public Long submitQuiz(@PathVariable("pid") int pid,
                           @RequestBody List<QuizSubmissionDTO> submissions) {
        Optional<Quiz> quizOpt = quizRepo.findById(pid);
        if (!quizOpt.isPresent()) {
            throw new RuntimeException("Quiz not found!");
        }

        QuizSession session = new QuizSession();
        session.setQuiz(quizOpt.get());
        session.setStartedAt(LocalDateTime.now());
        quizSessionRepo.save(session);

        System.out.println("✅ Saved QuizSession with ID: " + session.getSessionId());

        for (QuizSubmissionDTO sub : submissions) {
            UserAnswer answer = new UserAnswer();
            answer.setSession(session);
            answer.setQuestionId(sub.getQuestionId());
            answer.setSelectedOption(sub.getSelectedOption());
            userAnswerRepo.save(answer);
            System.out.println("💾 Saved UserAnswer for Question ID: " + sub.getQuestionId() + " | Selected: " + sub.getSelectedOption());
        }

        return session.getSessionId(); // return session id to user
    }

    // ----------------------------------------------------------------------------------------------
    // GET SCORE
    @GetMapping("/score/{sessionId}")
    public Map<String, Integer> getScore(@PathVariable Long sessionId) {
        System.out.println("🔍 Calculating score for sessionId: " + sessionId);
        List<UserAnswer> answers = userAnswerRepo.findBySessionSessionId(sessionId);
        System.out.println("📝 Found answers count: " + answers.size());

        int score = 0;
        for (UserAnswer ans : answers) {
            Optional<Question> qOpt = questionRepo.findById(ans.getQuestionId());
            if (qOpt.isPresent()) {
                String correct = qOpt.get().getCorrectans();
                String selected = ans.getSelectedOption();

                System.out.println("➡️ Question ID: " + ans.getQuestionId() + " | Correct: " + correct + " | Selected: " + selected);

                if (correct != null && selected != null && correct.equalsIgnoreCase(selected)) {
                    score++;
                }
            } else {
                System.out.println("⚠️ Question not found for ID: " + ans.getQuestionId());
            }
        }

        int total = answers.size();
        System.out.println("✅ Final Score: " + score + "/" + total);
        return Map.of("score", score, "total", total);
    }
}
