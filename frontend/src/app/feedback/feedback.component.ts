import { Component, OnInit } from '@angular/core';
import {Feedback} from "../feedback";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../services/userService";
import {MainService} from "../services/mainService";
import {AuthService} from "../security/authService";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  showFeedback: Feedback[];
  feedback: Feedback;
  feedbackForm: FormGroup;
  success: boolean = false;

  constructor(
    private mainService: MainService,
    private authService: UserService,
    private authServiceSecurtiy: AuthService
  ) {
    this.feedback = new Feedback();
  }

  ngOnInit(): void {
    this.mainService.getFeedback().subscribe(data => this.showFeedback = data);
    this.feedbackForm = new FormGroup({
      nameOfSuggestion: new FormControl(''),
      description: new FormControl(''),
    });
  }

  completeLogin() {
    this.mainService.postFeedback(this.feedback).subscribe();
    this.feedbackForm.reset();
    this.success = true;
  }

  isAdmin(): boolean{
   if(this.authServiceSecurtiy.getAuthority())
   {return true;}
  }

  deleteFeedback(feedback: Feedback) {
    if (confirm('Určite chcete vymazať návrh '+feedback.nameOfSuggestion +'?'))  {
      this.mainService.deleteFeedback(feedback).subscribe(() => {
        this.mainService.getFeedback().subscribe(data => {
          this.showFeedback = data;
        });
      });
    }
  }
}
