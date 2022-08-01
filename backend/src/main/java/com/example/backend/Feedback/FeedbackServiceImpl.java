package com.example.backend.Feedback;

import com.example.backend.User.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserServiceImpl userService;

    @Override
    public void saveFeedback(Feedback feedback) {
          feedback.setUserId(userService.getLoggedUser().getId());
          feedback.setUserName(userService.getLoggedUser().getUserName());
          feedback.setEmail(userService.getLoggedUser().getEmail());
          feedbackRepository.save(feedback);

    }

    @Override
    public void deleteFeedback(Feedback feedback)
    {
        feedbackRepository.delete(feedback);
    }


}

