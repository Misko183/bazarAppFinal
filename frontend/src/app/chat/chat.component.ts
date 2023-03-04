import { Component, OnInit } from '@angular/core';
import {Chat} from "../chat";
import {MainService} from "../services/mainService";
import {ChatContact} from "../chatContact";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  // currentUser: CurrentUser;
  chatList: Chat[] = [];
  chatInput: string;
  receiver: string;
  chatContactList: ChatContact[] = [];
  chatContactListAccepted: ChatContact[] = [];
  success: boolean = false;
  currentUser: string;
  user2: string;
  user1: string;

  constructor(private mainService: MainService) {}

  ngOnInit() {


    this.mainService.getChatContacts().subscribe(
      (chatList: ChatContact[]) => {
        this.chatContactList = chatList;
      }
    );

    this.mainService.getChatContactsAccepted().subscribe(
      (chatList: ChatContact[]) => {
        this.chatContactListAccepted = chatList;
      }
    );

    this.mainService.getWhoIam().subscribe(
      (user) => {
        this.currentUser = user.username;
      }
    );
    setInterval(() => {
      this.startChat(this.user1, this.user2);
    }, 10000);
  }


  sendChat(message: string) {
    if(this.user1 === this.currentUser){
    this.mainService.postChat(message, this.user2).subscribe(() => {
      this.chatInput = "";
      this.startChat(this.user1, this.user2);
    });
  }
    else {
      this.mainService.postChat(message, this.user1).subscribe(() => {
        this.chatInput = "";
        this.startChat(this.user1, this.user2);
      });
    }
  }

  addChatContact(chatData: { user2: string }) {
    this.mainService.postAddChatContact(chatData.user2).subscribe(() => {
      this.ngOnInit();
      this.success = true;
    });
  }

  acceptChatContact( id: number) {
    this.mainService.postAcceptChatContact(id).subscribe(() => {
     console.log("accepted");
      this.ngOnInit();
    });
  }

  startChat(user1: string, user2: string){
    this.mainService.getChat(user1, user2).subscribe(
    (chatList) => {
      this.user1 = user1;
      this.user2 = user2;
      this.chatList = chatList;

    }
    );
  }



}
