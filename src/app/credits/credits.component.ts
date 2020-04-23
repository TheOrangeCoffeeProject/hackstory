import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  goToSplashScreen() {
    const audio = new Audio('./assets/media/BGM/pull-back.mp3');
    audio.play();
    this.router.navigate(['']);
  }

}
