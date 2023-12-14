import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = ''; // Replace with your Node.js server URL

  constructor(private http: HttpClient) { }

  sendEmail(emailData: any) {
    return this.http.post(`${this.apiUrl}/send-email`, emailData);
  }
}
