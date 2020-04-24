import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ipcRenderer } from 'electron'
import { Howl } from 'howler';
import * as $ from 'jquery';
import * as db from 'node-localdb-modern';
const Cryptr = require('cryptr');
require('dotenv').config();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.playBGMusic();
    this.ifSaveGamesPresent();
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
    const audio = new Howl({
      src: ['./assets/media/BGM/pull-back.mp3']
    });
    // const audio = new Audio('../../assets/media/BGM/pull-back.mp3');
    audio.play();
    this.router.navigate(['credits']);
  }

  quitApp() {
    const audio = new Audio('./assets/media/BGM/pull-back.mp3');
    audio.play();
    ipcRenderer.send('quitGame')
  }

  ifSaveGamesPresent() {
    const savegameDB = db('./savegames.db');
    savegameDB.count({}).then(count => {
      if (count === 0) {
        $('#loadSavedGames').hide();
        // const secret = process.env.ENCRYPTION_KEY;
      }
    })
  }

  newGame() {
    const audio = new Audio('./assets/media/BGM/pull-back.mp3');
    audio.play();
    $('#nav_buttons').addClass('slideOut');
    $('#title_container').addClass('toTheRight');
    $('#cancelNewGame').addClass('slideInFromLeft');
    $('#newGameCreator').addClass('slideInFromRight');
  }

  cancelNewGame() {
    const audio = new Audio('./assets/media/BGM/pull-back.mp3');
    audio.play();
    $('#nav_buttons').removeClass('slideOut');
    $('#title_container').removeClass('toTheRight');
    $('#cancelNewGame').removeClass('slideInFromLeft');
    $('#newGameCreator').removeClass('slideInFromRight');
  }

}
