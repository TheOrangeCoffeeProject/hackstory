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

  closeAlert() {
    const audio = new Audio('./assets/media/BGM/pull-back.mp3');
    audio.play();
    $('#alertBox').hide();
  }

  startNewGame() {
    const username = $('#username').val();
    const password = $('#password').val();
    if (username === '' && password === '') {
      $('#messageAlert').text('Please enter username and password to start a new game.')
      const audio = new Audio('./assets/media/BGM/nasty-error-long.mp3');
      audio.play();
      $('#alertBox').show();
    } else if (username === '' && password !== '') {
      $('#messageAlert').text('Please enter username to start a new game.')
      const audio = new Audio('./assets/media/BGM/nasty-error-long.mp3');
      audio.play();
      $('#alertBox').show();
    } else if (username !== '' && password === '') {
      $('#messageAlert').text('Please enter password to start a new game.')
      const audio = new Audio('./assets/media/BGM/nasty-error-long.mp3');
      audio.play();
      $('#alertBox').show();
    } else {
      const savegameDB = db('./savegames.db');
      savegameDB.findOne({ username: username }).then((data) => {
        if (data) {
          $('#messageAlert').text(`User with username: ${username} already exists. Please choose a different username.`)
          const audio = new Audio('./assets/media/BGM/nasty-error-long.mp3');
          audio.play();
          $('#alertBox').show();
        } else {
          const secret = process.env.ENCRYPTION_KEY;
          const cryptr = new Cryptr(secret);
          const currentdate = new Date();
          const datetime = currentdate.getDate() + "/"
          + (currentdate.getMonth() + 1) + "/"
          + currentdate.getFullYear() + " @ "
          + currentdate.getHours() + ":"
          + currentdate.getMinutes() + ":"
          + currentdate.getSeconds();
          savegameDB.count({}).then(count => {
            if (count < 5) {
              const audio = new Audio('./assets/media/BGM/pull-back.mp3');
              audio.play();
              const saveGameData = {
                username,
                password,
                level: 1,
                money: 500,
                skillslevel: 0,
                software: [],
                courseTaken: [],
                courseAvailable: [],
                knownWifiNetworks: [],
                wifiNetworksAvailable: [],
                purchasedItems: {
                  CPU: [0],
                  RAM: [0],
                  WifiCard: [0],
                  Bluetooth: [],
                  Storage: [0]
                },
                installedItems: {
                  CPU: [0],
                  RAM: [0],
                  WifiCard: [0],
                  Bluetooth: [],
                  Storage: [0]
                },
                availableForPurchase: {
                  CPU: [],
                  RAM: [],
                  WifiCard: [],
                  Bluetooth: [],
                  Storage: []
                },
                files: [],
                gameIat: datetime
              }
              const encryptedData = cryptr.encrypt(JSON.stringify(saveGameData));
              // const decryptedString = cryptr.decrypt(encryptedData);
              savegameDB
                .insert({ username, encryptedData })
                .then((data) => {
                  console.log(data)
                });
            } else {
              $('#messageAlert').text(`This game can store upto 5 save games. You already have 5 save games. Please delete a save game before creating a new game.`)
              const audio = new Audio('./assets/media/BGM/nasty-error-long.mp3');
              audio.play();
              $('#alertBox').show();
            }
          })
        }
      });
    }
  }

}
