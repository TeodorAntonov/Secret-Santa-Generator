import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from '../services/participants.service';
import { Participant } from '../models/participant.model';
import { Subscription } from 'rxjs';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

    participants: Participant[];
    recipients: Participant[];
    isShuffled: boolean = true;

    participantName: string = '';
    participantEmail: string = '';
    private participantSub: Subscription;

    constructor(private participantService: ParticipantsService, private emailService: EmailService){
    }

    ngOnInit(){
      this.participants = this.participantService.getAllParticipants();
      this.participantSub = this.participantService.participantSubject.subscribe((participants: Participant[]) =>{
        this.participants = participants;
      });
    }

    onAddParticipant(){
      if(this.participantName === ''){
        alert('Please add a Participant!');
        return;
      }
      if(this.participantName.length > 20){
        alert('The Participant name is too long!');
        return;
      }
      if(this.participantEmail === ''){
        alert('Please add a valid Mail!');
        return;
      }
      if(!this.participantEmail.includes('@')){
        alert('Please add a valid Mail!');
        return;
      }
      
      var participant = new Participant(this.participantName, '?', this.participantEmail);
      this.participantService.addParticipant(participant);
      this.participantName = '';
      this.participantEmail = '';
    }
    

    onShufflePaticipants(){
      if(this.participants.length < 3){
        alert('You need at least 3 participants to play Secret Santa!')
        return;
      }
      this.recipients = this.participantService.shuffleParticipants(this.participants);
      if(this.recipients.length > 2){
        this.isShuffled = false;
      }
    }

    onSendEmail(participant: string, recipient: string, participantEmail: string){
      const emailData = {
        to: participantEmail,
        subject: 'Hello from Secret Santa!',
        body: `${participant.toUpperCase()}, You are taking the role of Secret Santa and You shall give a gift to your dear friend: ${recipient.toUpperCase()}!
                \nYours, Santa Claus!`,
      };

        this.emailService.sendEmail(emailData).subscribe({
      next: (response) => {
        console.log('Email sent successfully:', response);
      },
      error: (error) => {
        console.error('Error sending email:', error);
      },
      complete: () => {
        console.log('Christmas Test');
      }});
    }
}
