import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.playBGMusic();
  }

  playBGMusic() {
    const bgAudio = document.getElementById('bgAudio') as HTMLAudioElement;
    bgAudio.loop = true;
  }

  toggleBGMAudio() {
    const bgAudio = document.getElementById('bgAudio') as HTMLAudioElement;
    return bgAudio.paused ? this.playAudio() : this.pauseAudio();
  }

  pauseAudio() {
    const bgAudio = document.getElementById('bgAudio') as HTMLAudioElement;
    const play_pause_button = document.getElementById('play_pause_button') as HTMLButtonElement;
    bgAudio.pause();
    play_pause_button.innerHTML = `<span class="ion ion-ios-volume-off"></span>`
  }

  playAudio() {
    const bgAudio = document.getElementById('bgAudio') as HTMLAudioElement;
    const play_pause_button = document.getElementById('play_pause_button') as HTMLButtonElement;
    bgAudio.play();
    play_pause_button.innerHTML = `<span class="ion ion-ios-volume-high"></span>`
  }

  creditsDisplay() {
    const audio = new Audio('../../assets/media/BGM/pull-back.mp3');
    audio.play();
    this.router.navigate(['credits']);
  }

}
