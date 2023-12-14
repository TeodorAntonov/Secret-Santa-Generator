import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ParticipantsComponent } from './participants/participants.component';
import { ParticipantsService } from './services/participants.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { EmailService } from './services/email.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ParticipantsComponent,
    HeaderComponent,
  ],
  imports: [ 
    HttpClientModule,
    BrowserModule, 
    FormsModule
  ],
  providers: [ParticipantsService, EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
