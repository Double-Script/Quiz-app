package com.quizapp.dto;

public class QuizSubmissionDTO {
	
	private int questionId;
    private String selectedOption;
    
    
	public int getQuestionId() {
		return questionId;
	}
	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}
	public String getSelectedOption() {
		return selectedOption;
	}
	public void setSelectedOption(String selectedOption) {
		this.selectedOption = selectedOption;
	}

}
