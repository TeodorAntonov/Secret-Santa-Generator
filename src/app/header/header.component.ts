import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentColor: string = '#fff';
  ngOnInit() {
    setInterval(() => {
      this.updateColor();
    }, 1000);
  }
  updateColor() {
    this.currentColor = this.getRandomColor();
  }

  getRandomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
}
