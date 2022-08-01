package com.example.backend.Feedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
public class FeedbackController  {

    @Autowired
    private FeedbackServiceImpl feedbackService;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @GetMapping("/feedback")
    public List<Feedback> getAllFeedback() {
        return (List<Feedback>) feedbackRepository.findAll();
    }

    @PostMapping("/feedback")
    void saveFeedback(@RequestBody Feedback feedback) {
        feedbackService.saveFeedback(feedback);
    }

    @PostMapping("/deletefeedback")
    public void deleteFeedback(@RequestBody Feedback feedback){
        feedbackService.deleteFeedback(feedback);
    }

}
