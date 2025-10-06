package com.quizapp.controller;

import java.util.List;
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

import com.quizapp.entity.Quiz;
import com.quizapp.repo.QuizRepo;

@RestController
@RequestMapping("/quiz")
public class QuizController {
	
	@Autowired
	QuizRepo quizRepo;
	
/* ---------------------------------------------------------------------------------------------
                                            CREAT or INSERT
	 //post	
		
		http://localhost:8080/quiz/save
		{
			title:"quiz 1"
		}

 */
	
	@PostMapping("/save")
	public Quiz saveQuiz(@RequestBody Quiz quiz) {
		return quizRepo.save(quiz);
//		return "Quiz saved";
	}
/*	-------------------------------------------------------------------------------------------------
 											READ ALL
 											
	 Get http://localhost:8080/quiz/getallquiz
*/
	@GetMapping("/getallquiz")
	public List<Quiz> getallquiz(){
		return quizRepo.findAll();
	}

//	Get http://localhost:8080/quiz/getquizid/1
	@GetMapping("/getquizid/{pid}")
	public List<Quiz> getquizid(@PathVariable("pid") int pid) {
		return quizRepo.findBypid(pid);
	}
	
/* -----------------------------------------------------------------------------------------------------
 										UPDATE
 {
    "title":"Updated Quiz Title"
}

PUT http://localhost:8080/quiz/update/1

									
 */
	
	@PutMapping("/update/{pid}")
	public String updateQuiz(@RequestBody Quiz quiz, @PathVariable("pid") int pid) {
	    Optional<Quiz> opt = quizRepo.findById(pid);

	    if (opt.isPresent()) {
	        Quiz existing = opt.get();
	        existing.setTitle(quiz.getTitle()); // assuming only title is editable

	        quizRepo.save(existing);
	        return "Quiz Updated ........";
	    }
	    return "Quiz not found!";
	}

/* ---------------------------------------------------------------------------------------------------------
 											DELETE
 
 Delete  http://localhost:8080/quiz/delete/1
 
 */
	@DeleteMapping("/delete/{pid}")
	public String deletequiz(@PathVariable("pid") int pid) {
		quizRepo.deleteById(pid);
		return "quiz deleted..........";
	}
	
}
