import { Subject } from "rxjs";
import { Participant } from "../models/participant.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class ParticipantsService{

    private Participants: Participant[] = [];
    private recipients: Participant[] = [];

    participantSubject = new Subject<Participant[]>();
    recipientstSubject = new Subject<Participant[]>();


    getAllParticipants(){
        return this.Participants;
    }
    
    addParticipant(participant: Participant){
        this.Participants.push(participant);
        this.participantSubject.next(this.Participants);
    }

    shuffleParticipants(participants: Participant[]): Participant[] {
        if (!this.recipients) {
          this.recipients = [];
        }
      
        const shuffledParticipants = participants.slice();
        const usedRecipients: string[] = [];
      
        for (const participant of shuffledParticipants) {
          if (participant.recipient === '?') {
            let recipient = this.getRandomRecipient(usedRecipients, participant.name);
            participant.recipient = recipient;
            usedRecipients.push(recipient);
          }
        }
      
        this.recipients = shuffledParticipants.slice();
        this.recipientstSubject.next(this.recipients);
        console.log(this.recipients);
        
        return this.recipients;
      }
      
      getRandomRecipient(usedRecipients: string[], currentParticipantName: string): string {
        const availableRecipients = this.Participants
          .filter(participant => participant.name !== currentParticipantName && !usedRecipients.includes(participant.name))
          .map(participant => participant.name);
      
        if (availableRecipients.length === 0) {
          usedRecipients.length = 0;
        }
      
        const randomIndex = Math.floor(Math.random() * availableRecipients.length);
        return availableRecipients[randomIndex];
      }
      
}